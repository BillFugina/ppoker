import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import { Grid, Paper, Chip } from '@material-ui/core'
import { valueLabels, allValues, Value } from 'app-state/definitions'
import { Flippy, FrontSide, BackSide } from 'react-flippy'
import { useStyles } from 'styles/styles'

interface PlayerViewProps {}

const PlayerView: React.FunctionComponent<PlayerViewProps> = () => {
  const [state] = useAppState()
  const [selected, setSelected] = React.useState<Value | undefined>()

  const classes = useStyles()

  const handleCardClick = (v: Value) => () => {
    setSelected(currentValue => {
      const result = currentValue !== v ? v : undefined
      return result
    })
  }

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
          <div className={classes.cards}>
            {allValues.map(v => (
              <div key={v} className={classes.card}>
                <Flippy flipDirection='horizontal' isFlipped={selected === v}>
                  <FrontSide className={classes.cardSide} onClick={handleCardClick(v)}>
                    <div className={classes.cardDisplay}>{valueLabels[v]}</div>
                  </FrontSide>
                  <BackSide className={`${classes.cardSide} blank`} onClick={handleCardClick(v)}></BackSide>
                </Flippy>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  )
}

export { PlayerView }
