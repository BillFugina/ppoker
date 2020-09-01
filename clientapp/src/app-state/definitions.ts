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

export const roundStates = ['waiting', 'open', 'closed'] as const

export type RoundState = typeof roundStates[number]

export type RoundValues = { [name: string]: Value | undefined }

export type AppState = {
  channelName: string
  channelOwner: string
  gameState: GameState
  roundState: RoundState
  roundValues: RoundValues
  send?: (message: ChannelMessage) => any
  userName: string
  users: string[]
}

export const defaultAppState = (): AppState => ({
  channelName: '',
  channelOwner: '',
  gameState: 'start',
  roundState: 'waiting',
  roundValues: {},
  userName: '',
  users: [],
})

export type ChannelMessage = {
  action: AppStateAction
  channel: string
  fromUser: string
  id: string
  stamp: Date
  toUser?: string
}

export const values = [0, 1, 2, 3, 5, 8, 13, 100, 101, 102] as const
export const allValues = [...values]
export type Value = typeof values[number]

export const valueLabels: Record<Value, string> = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  5: '5',
  8: '8',
  13: '13',
  100: '🙄',
  101: '😫',
  102: '🤣',
}
