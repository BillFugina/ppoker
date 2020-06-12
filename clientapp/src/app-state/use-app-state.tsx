import * as React from 'react'
import { AppState, defaultAppState } from 'app-state/definitions'
import { AppStateAction, BroadcastActionTypes } from 'app-state/actions'
import { assertNever } from 'system/assert-never'
import { useChannel } from 'channel'
import { newGuid } from 'system/guid'

const appStateReducer = (state: AppState, action: AppStateAction): AppState => {
  let result = state

  if (action.type === 'addUser') {
    if (!state.users.includes(action.user)) {
      const users = [...state.users, action.user]
      result = { ...state, users }
    }
  } else if (action.type === 'removeUser') {
    if (state.users.includes(action.user)) {
      const users = state.users.filter(u => u !== action.user)
      result = { ...state, users }
    }
  } else if (action.type === 'setChannelName') {
    result = { ...state, channelName: action.channelName }
  } else if (action.type === 'setUserName') {
    result = { ...state, userName: action.userName }
  } else {
    assertNever(action)
  }

  console.log(`app state action: %c${action.type}`, 'background: green; color: white; display: block;', {
    previousState: state,
    action,
    newState: result,
  })

  return result
}

type ChannelMessage = {
  action: AppStateAction
  channel: string
  fromUser: string
  id: string
  stamp: Date
  toUser?: string
}

const AppStateHook = (): [AppState, React.Dispatch<AppStateAction>] => {
  const [state, _dispatch] = React.useReducer(appStateReducer, defaultAppState())
  const [message, send] = useChannel<ChannelMessage>(state.channelName ?? 'none')
  const [handledMessages, setHandledMessages] = React.useState<string[]>([])

  const dispatch: React.Dispatch<AppStateAction> = React.useCallback(
    (action: AppStateAction) => {
      _dispatch(action)

      if (state.channelName && state.userName && BroadcastActionTypes.includes(action.type)) {
        const message: ChannelMessage = {
          action,
          channel: state.channelName,
          fromUser: state.userName,
          id: newGuid(),
          stamp: new Date(),
        }

        console.log(`channel send: %c${action.type}`, 'background: blue; color: white; display: block;', message)

        send(message)
      }
    },
    [send, state.channelName, state.userName],
  )

  React.useEffect(() => {
    if (message) {
      const handled = handledMessages.includes(message.id)

      if (!handled) {
        setHandledMessages([...handledMessages, message.id])

        if (message.fromUser !== state.userName && (!message?.toUser || message.toUser === state.userName)) {
          console.log(
            `channel receive: %c${message.action.type}`,
            'background: white; color: blue; display: block;',
            message,
          )
          _dispatch(message.action)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return [state, dispatch]
}
export const AppStateContext = React.createContext<ReturnType<typeof AppStateHook>>(null as any)

interface AppStateProviderProps {
  initialState?: AppState
  children: React.ReactElement
}

export const AppStateProvider: React.FunctionComponent<AppStateProviderProps> = props => {
  const appStateHook = AppStateHook()
  return <AppStateContext.Provider value={appStateHook}>{props.children}</AppStateContext.Provider>
}

export const useAppState = () => React.useContext(AppStateContext)
