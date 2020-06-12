export type AppState = {
  channelName: string
  userName: string
  users: string[]
}

export const defaultAppState = (): AppState => ({
  channelName: '',
  userName: '',
  users: [],
})
