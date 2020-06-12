export type SharedState = {
  channelName?: string
  userName?: string
  users: string[]
}

export const defaultSharedState = (): SharedState => ({
  users: [],
})
