import * as React from 'react'
import { SharedState, defaultSharedState } from 'shared-state/definitions'
import { SharedStateAction, BroadcastActionTypes } from 'shared-state/actions'
import { assertNever } from 'system/assert-never'
import { useChannel } from 'channel'
import { newGuid } from 'system/guid'

const sharedStateReducer = (state: SharedState, action: SharedStateAction): SharedState => {
  let result = state

  if (action.type === 'addUser') {
    const users = [...state.users, action.user]
    result = { ...state, users }
  } else if (action.type === 'removeUser') {
    const users = state.users.filter(u => u !== action.user)
    result = { ...state, users }
  } else if (action.type === 'setChannelName') {
    result = { ...state, channelName: action.channelName }
  } else if (action.type === 'setUserName') {
    result = { ...state, userName: action.userName }
  } else {
    assertNever(action)
  }

  console.log(`shared action: %c${action.type}`, 'background: green; color: white; display: block;', {
    previousState: state,
    action,
    newState: result,
  })

  return result
}

type SharedMessage = {
  action: SharedStateAction
  channel: string
  fromUser: string
  id: string
  stamp: Date
  toUser?: string
}

const SharedStateHook = (): [SharedState, React.Dispatch<SharedStateAction>] => {
  const [state, _dispatch] = React.useReducer(sharedStateReducer, defaultSharedState())
  const [message, send] = useChannel<SharedMessage>(state.channelName ?? 'none')
  const [handledMessages, setHandledMessages] = React.useState<string[]>([])

  const dispatch: React.Dispatch<SharedStateAction> = React.useCallback(
    (action: SharedStateAction) => {
      _dispatch(action)

      if (state.channelName && state.userName && BroadcastActionTypes.includes(action.type)) {
        const message: SharedMessage = {
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

        if ((!message?.toUser || message.toUser === state.userName) && message.fromUser !== state.userName) {
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
export const SharedStateContext = React.createContext<ReturnType<typeof SharedStateHook>>(null as any)

interface SharedStateProviderProps {
  initialState?: SharedState
  children: React.ReactElement
}

export const SharedStateProvider: React.FunctionComponent<SharedStateProviderProps> = props => {
  const sharedStateHook = SharedStateHook()
  return <SharedStateContext.Provider value={sharedStateHook}>{props.children}</SharedStateContext.Provider>
}

export const useSharedState = () => React.useContext(SharedStateContext)
