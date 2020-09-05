import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Grid, Paper, Chip } from '@material-ui/core'
import { valueLabels, Value } from 'app-state/definitions'
import { useStyles } from 'styles/styles'
import { CardChooser } from 'components/card-chooser'
import { submitVote } from 'app-state/actions'

interface PlayerViewProps {}

const PlayerView: React.FunctionComponent<PlayerViewProps> = () => {
  const [state, dispatch] = useAppState()

  const classes = useStyles()

  const selected = state.roundValues[state.userName]

  const handleCardChooserValueChange = (v?: Value) => {
    if (state.roundState === 'open') {
      dispatch(submitVote(state.userName, v))
    }
  }

  const showChooser = state.roundState === 'open' || state.roundState === 'closed'

  return (
    <>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Grid container justify='center' alignItems='baseline' spacing={3}>
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
          {showChooser && (
            <CardChooser<Value>
              readOnly={state.roundState === 'closed'}
              values={valueLabels}
              value={selected}
              onValueChange={handleCardChooserValueChange}
            />
          )}
        </Container>
      </div>
    </>
  )
}

export { PlayerView }
