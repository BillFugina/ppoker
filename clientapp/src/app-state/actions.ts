import { ChannelMessage, AppState } from 'app-state/definitions'

export const addUser = (user: string) => ({
  type: 'addUser' as const,
  user,
})

export const removeUser = (user: string) => ({
  type: 'removeUser' as const,
  user,
})

export const setChannelName = (channelName: string) => ({
  type: 'setChannelName' as const,
  channelName,
})

export const setUserName = (userName: string) => {
  const result = {
    type: 'setUserName' as const,
    userName,
  }
  return result
}

export const claimChannel = (channelName: string, userName?: string) => ({
  type: 'claimChannel' as const,
  channelName,
  userName,
})

export const joinChannel = (channelName: string, userName: string) => ({
  type: 'joinChannel' as const,
  channelName,
  userName,
})

export const restart = () => ({
  type: 'restart' as const,
})

export const welcome = (userName: string) => ({
  type: 'welcome' as const,
  userName,
})

export const broadcastState = (state: Partial<AppState>) => ({
  type: 'broadcastState' as const,
  state,
})

export const leaveChannel = (userName: string) => ({
  type: 'leave' as const,
  userName,
})

export const updateSendFunction = (sendFunction: (message: ChannelMessage) => void) => ({
  type: 'updateSendFunction' as const,
  sendFunction,
})

export const broadcastAction = (action: BroadcastableAction, recipient?: string) => ({
  type: 'broadcastAction' as const,
  action,
  recipient,
})

export type BroadcastableAction =
  | ReturnType<typeof addUser>
  | ReturnType<typeof removeUser>
  | ReturnType<typeof setChannelName>
  | ReturnType<typeof setUserName>
  | ReturnType<typeof claimChannel>
  | ReturnType<typeof joinChannel>
  | ReturnType<typeof restart>
  | ReturnType<typeof welcome>
  | ReturnType<typeof broadcastState>
  | ReturnType<typeof leaveChannel>
  | ReturnType<typeof updateSendFunction>

export type AppStateAction = BroadcastableAction | ReturnType<typeof broadcastAction>

type AppStateActionType = AppStateAction['type']

export const BroadcastActionTypes: AppStateActionType[] = [
  'addUser',
  'removeUser',
  'claimChannel',
  'joinChannel',
  'welcome',
  'broadcastState',
  'leave',
]
