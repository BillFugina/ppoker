import * as React from 'react'
import { AppState, defaultAppState, ChannelMessage } from 'app-state/definitions'
import {
  AppStateAction,
  updateSendFunction,
  broadcastState,
  broadcastAction,
  removeUser,
  restart,
  addUser,
  welcome,
  claimChannel,
  joinChannel,
} from 'app-state/actions'
import { useChannel } from 'channel'
import { newGuid } from 'system/guid'
import {
  useReducerWithEffects,
  Update,
  TStateWithEffects,
  TSideEffect,
  UpdateWithSideEffect,
} from 'hooks/use-reducer-with-side-effects'
import { assertNever } from 'system/assert-never'

const appStateReducer = (state: AppState, action: AppStateAction): TStateWithEffects<AppState, AppStateAction> => {
  const isOwner = state.channelOwner === state.userName

  let result: AppState = state
  let sideEffects: TSideEffect<AppState, AppStateAction>[] = []

  if (action.type === 'addUser') {
    if (!state.users.includes(action.user)) {
      const users = [...state.users, action.user]
      result = { ...state, users }
    }

    sideEffects.push((state, dispatch) => {
      const { channelOwner, users, roundState, roundValues } = state
      dispatch(broadcastAction(broadcastState({ channelOwner, users, roundState, roundValues })))
    })
  } else if (action.type === 'removeUser') {
    if (state.users.includes(action.user)) {
      const users = state.users.filter(u => u !== action.user)
      result = { ...state, users }
    }

    sideEffects.push((state, dispatch) => {
      const { channelOwner, users } = state
      dispatch(broadcastAction(broadcastState({ channelOwner, users })))
    })
  } else if (action.type === 'setChannelName') {
    result = { ...state, channelName: action.channelName }
  } else if (action.type === 'setUserName') {
    result = { ...state, userName: action.userName }
  } else if (action.type === 'updateSendFunction') {
    result = { ...state, send: action.sendFunction }
  } else if (action.type === 'broadcastState') {
    result = { ...state, ...action.state }
  } else if (action.type === 'broadcastAction') {
    if (result.channelName && result.userName && result.send) {
      const message: ChannelMessage = {
        action: action.action,
        channel: result.channelName,
        fromUser: result.userName,
        id: newGuid(),
        stamp: new Date(),
        toUser: action.recipient,
      }

      console.log(`channel send: %c${action.action.type}`, 'background: blue; color: white; display: block;', message)

      state.send && state.send(message)
    }
  } else if (action.type === 'claimChannel') {
    if (action.userName === state.userName && state.gameState === 'start') {
      result = { ...state, gameState: 'claimingChannel' }
      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action))
      })
    } else if (action.userName !== state.userName) {
      if (state.gameState === 'claimingChannel') {
        sideEffects.push((state, dispatch) => {
          dispatch(broadcastAction(claimChannel(state.channelName)))
        })
        result = { ...state, gameState: 'ownershipRejected' }
      } else if (state.gameState === 'ownerView') {
        sideEffects.push((state, dispatch) => {
          dispatch(broadcastAction(claimChannel(state.channelName, state.userName)))
        })
      } else if (state.gameState === 'joiningChannel') {
        sideEffects.push((state, dispatch) => {
          dispatch(joinChannel(state.channelName, state.userName))
        })
      }
    }
  } else if (action.type === 'joinChannel') {
    if (action.userName !== state.userName) {
      if (state.gameState === 'claimingChannel' || state.gameState === 'ownerView') {
        if (state.gameState === 'claimingChannel') {
          result = { ...state, gameState: 'ownerView', channelOwner: state.userName }

          sideEffects.push((state, dispatch) => {
            dispatch(addUser(state.userName))
          })
        }
        sideEffects.push((state, dispatch) => {
          dispatch(addUser(action.userName))
        })
        sideEffects.push((state, dispatch) => {
          dispatch(broadcastAction(welcome(action.userName), action.userName))
        })
      }
    } else {
      result = { ...state, gameState: 'joiningChannel' }

      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action))
      })
    }
  } else if (action.type === 'leave') {
    if (isOwner && action.userName !== state.userName) {
      sideEffects.push((state, dispatch) => {
        dispatch(removeUser(action.userName))
      })
    } else {
      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action))
      })
      sideEffects.push((state, dispatch) => {
        dispatch(restart())
      })
    }
  } else if (action.type === 'restart') {
    result = defaultAppState()
  } else if (action.type === 'welcome') {
    if (state.gameState === 'joiningChannel') {
      result = { ...state, gameState: 'playerView' }
    }
  } else if (action.type === 'openRound') {
    if (isOwner && state.gameState === 'ownerView') {
      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action))
      })
    }
    result = { ...state, roundState: 'open', roundValues: {} }
  } else if (action.type === 'closeRound') {
    if (isOwner && state.gameState === 'ownerView') {
      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action))
      })
    }
    result = { ...state, roundState: 'closed' }
  } else if (action.type === 'startNewRound') {
    if (isOwner && state.gameState === 'ownerView') {
      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action))
      })
    }
    result = { ...state, roundState: 'waiting', roundValues: {} }
  } else if (action.type === 'submitVote') {
    if (isOwner && state.gameState === 'ownerView' && state.roundState === 'open') {
      const roundValues = { ...state.roundValues, [action.userName]: action.value }
      result = { ...state, roundValues }

      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(broadcastState({ roundValues: result.roundValues })))
      })
    } else if (state.gameState === 'playerView' && state.roundState === 'open') {
      sideEffects.push((state, dispatch) => {
        dispatch(broadcastAction(action, state.channelOwner))
      })
      result = { ...state, roundValues: { [state.userName]: action.value } }
    }
  }

  //
  else {
    assertNever(action)
  }

  console.log(`app state action: %c${action.type}`, 'background: green; color: white; display: block;', {
    previousState: state,
    action,
    newState: result,
  })

  return sideEffects.length > 0 ? UpdateWithSideEffect(result, sideEffects) : Update(result)
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

        if (
          message.fromUser !== state.userName &&
          state.userName !== '' &&
          (!message?.toUser || message.toUser === state.userName)
        ) {
          console.log(
            `channel receive: %c${message.action.type}`,
            'background: white; color: blue; display: block;',
            message,
          )
          dispatch(message.action)
        } else {
          console.log(
            `channel receive: %c${message.action.type} %cIgnored`,
            'background: yellow; color: blue; display: block;',
            'background: orange; color: black; display: block;',
            message,
          )
        }
      } else {
        console.log(
          `channel receive: %c${message.action.type} %cDuplicate Message`,
          'background: yellow; color: blue; display: block;',
          'background: red; color: black; display: block;',
          message,
        )
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
