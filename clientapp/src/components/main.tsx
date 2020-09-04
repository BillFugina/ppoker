import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import { HomeView } from 'components/home-view'
import { assertNever } from 'system/assert-never'
import { ClaimingChannelView } from 'components/claiming-channel-view'
import { JoiningChannelView } from 'components/joining-channel-view'
import { HostView } from 'components/host-view'
import { PlayerView } from 'components/player-view'

interface MainProps {}

const Main: React.FunctionComponent<MainProps> = () => {
  const [state] = useAppState()
  return state.gameState === 'start' ? (
    <HomeView />
  ) : state.gameState === 'claimingChannel' ? (
    <ClaimingChannelView />
  ) : state.gameState === 'joiningChannel' ? (
    <JoiningChannelView />
  ) : state.gameState === 'ownerView' ? (
    <HostView />
  ) : state.gameState === 'ownershipRejected' ? (
    <ClaimingChannelView />
  ) : state.gameState === 'playerView' ? (
    <PlayerView />
  ) : (
    assertNever(state.gameState)
  )
}

export { Main }
