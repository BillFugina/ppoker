import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Grid, Paper, Theme, createStyles, makeStyles, Chip } from '@material-ui/core'
import { valueLabels } from 'app-state/definitions'

interface PlayerViewProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'start',
      color: theme.palette.text.secondary,
    },
  }),
)

const PlayerView: React.FunctionComponent<PlayerViewProps> = () => {
  const [state] = useAppState()

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
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
      </Container>
    </>
  )
}

export { PlayerView }
