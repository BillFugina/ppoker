import { AppStateAction } from 'app-state/actions'

export const gameStates = [
  'start',
  'claimingChannel',
  'ownerView',
  'ownershipRejected',
  'joiningChannel',
  'playerView',
] as const
export type GameState = typeof gameStates[number]

export type ChannelMessage = {
  action: AppStateAction
  channel: string
  fromUser: string
  id: string
  stamp: Date
  toUser?: string
}

export type AppState = {
  channelName: string
  channelOwner: string
  gameState: GameState
  send?: (message: ChannelMessage) => any
  userName: string
  users: string[]
}

export const defaultAppState = (): AppState => ({
  channelName: '',
  channelOwner: '',
  gameState: 'start',
  userName: '',
  users: [],
})
