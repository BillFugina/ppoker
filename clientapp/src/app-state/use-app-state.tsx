import * as React from 'react'
import { AppState, defaultAppState, ChannelMessage } from 'app-state/definitions'
import { AppStateAction, BroadcastActionTypes, updateSendFunction } from 'app-state/actions'
import { useChannel } from 'channel'
import { newGuid } from 'system/guid'
import { useReducerWithEffects, Update, TStateWithEffects } from 'hooks/use-reducer-with-side-effects'

const appStateReducer = (state: AppState, action: AppStateAction): TStateWithEffects<AppState, AppStateAction> => {
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
  } else if (action.type === 'updateSendFunction') {
    result = { ...state, send: action.sendFunction }
  }
  //  else {
  //     assertNever(action)
  //   }

  if (result.channelName && result.userName && result.send && BroadcastActionTypes.includes(action.type)) {
    const message: ChannelMessage = {
      action,
      channel: result.channelName,
      fromUser: result.userName,
      id: newGuid(),
      stamp: new Date(),
    }

    console.log(`channel send: %c${action.type}`, 'background: blue; color: white; display: block;', message)

    result.send(message)
  }

  console.log(`app state action: %c${action.type}`, 'background: green; color: white; display: block;', {
    previousState: state,
    action,
    newState: result,
  })

  return Update(result)
}

const AppStateHook = (): [AppState, React.Dispatch<AppStateAction>] => {
  const [state, dispatch] = useReducerWithEffects(appStateReducer, defaultAppState())
  const [message, send] = useChannel<ChannelMessage>(state.channelName || 'none')
  const [handledMessages, setHandledMessages] = React.useState<string[]>([])

  React.useEffect(() => {
    dispatch(updateSendFunction(send))
  }, [dispatch, send])

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
          dispatch(message.action)
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
