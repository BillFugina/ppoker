import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { TextField, Grid, Button, Paper, Chip } from '@material-ui/core'
import { valueLabels } from 'app-state/definitions'
import { useStyles } from 'styles/styles'

interface HostViewProps {}

const HostView: React.FunctionComponent<HostViewProps> = () => {
  const [state, dispatch] = useAppState()

  const handleOpenRoundClick = () => dispatch(Action.openRound())
  const handleCloseRoundClick = () => dispatch(Action.closeRound())
  const handleStartNewRoundClick = () => dispatch(Action.startNewRound())

  const canJoin = state.userName !== '' && state.channelName !== ''

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
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

          <Grid item xs={12}>
            <Paper className={classes.button}>
              {state.users.map(user => {
                const value = state.roundValues[user]
                const label = value !== undefined ? `${user}: ${valueLabels[value]}` : user
                const result = (
                  <Chip
                    className={classes.chip}
                    key={user}
                    label={label}
                    color={user === state.channelOwner ? 'primary' : 'default'}
                  />
                )

                return result
              })}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Chip label={`Game State: ${state.gameState}`} />
            {state.gameState === 'ownerView' || state.gameState === 'playerView' ? (
              <Chip label={`Round State: ${state.roundState}`} />
            ) : null}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export { HostView }
