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

export type SharedStateAction =
  | ReturnType<typeof addUser>
  | ReturnType<typeof removeUser>
  | ReturnType<typeof setChannelName>
  | ReturnType<typeof setUserName>

type SharedStateActionType = SharedStateAction['type']

export const BroadcastActionTypes: SharedStateActionType[] = ['addUser', 'removeUser']
