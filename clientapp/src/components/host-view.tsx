import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'
import Container from '@material-ui/core/Container'
import { TextField, Grid, Button, Chip } from '@material-ui/core'
import { useStyles } from 'styles/styles'
import { UserCards } from 'components/user-cards'

interface HostViewProps {}

const HostView: React.FunctionComponent<HostViewProps> = () => {
  const [state, dispatch] = useAppState()

  const handleOpenRoundClick = () => dispatch(Action.openRound())
  const handleCloseRoundClick = () => dispatch(Action.closeRound())
  const handleStartNewRoundClick = () => dispatch(Action.startNewRound())

  const canJoin = state.userName !== '' && state.channelName !== ''

  const classes = useStyles()

  return (
    <Container maxWidth='xl'>
      <Grid container justify='center' alignItems='baseline' spacing={3}>
        <Grid item xs={12}>
          <TextField disabled fullWidth={true} id='channel-input' label='Game Name' value={state.channelName} />
        </Grid>
        {state.gameState === 'ownerView' ? (
          <Grid item xs={12}>
            <div>
              {state.roundState === 'waiting' ? (
                <Button
                  className={classes.button}
                  disabled={!canJoin}
                  variant='outlined'
                  onClick={handleOpenRoundClick}
                >
                  Open Round
                </Button>
              ) : null}

              {state.roundState === 'open' ? (
                <Button
                  className={classes.button}
                  disabled={!canJoin}
                  variant='outlined'
                  onClick={handleCloseRoundClick}
                >
                  End Round
                </Button>
              ) : null}

              {state.roundState === 'closed' ? (
                <Button
                  className={classes.button}
                  disabled={!canJoin}
                  variant='outlined'
                  onClick={handleStartNewRoundClick}
                >
                  Start New Round
                </Button>
              ) : null}
            </div>
          </Grid>
        ) : null}

        <UserCards />

        <Grid item xs={12}>
          <Chip label={`Game State: ${state.gameState}`} />
          {state.gameState === 'ownerView' || state.gameState === 'playerView' ? (
            <Chip label={`Round State: ${state.roundState}`} />
          ) : null}
        </Grid>
      </Grid>
    </Container>
  )
}

export { HostView }
