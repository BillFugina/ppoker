import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField, Grid, Button, Paper, Theme, createStyles, makeStyles, Chip } from '@material-ui/core'
import { allValues, valueLabels, Value } from 'app-state/definitions'

interface MainProps {}

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

const Main: React.FunctionComponent<MainProps> = props => {
  const [state, dispatch] = useAppState()

  const [channelName, setChannelName] = React.useState(state.userName)
  const [userName, setUserName] = React.useState(state.userName)

  const handleHostClick = () => {
    dispatch(Action.claimChannel(channelName, userName))
  }

  const handleJoinClick = () => {
    dispatch(Action.joinChannel(state.channelName, state.userName))
  }

  const handleChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value)
  }

  const handleChannelNameBlur = () => {
    if (channelName) {
      dispatch(Action.setChannelName(channelName))
    }
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleUserNameBlur = () => {
    if (userName) {
      dispatch(Action.setUserName(userName))
    }
  }

  const handleOpenRoundClick = () => dispatch(Action.openRound())
  const handleCloseRoundClick = () => dispatch(Action.closeRound())
  const handleStartNewRoundClick = () => dispatch(Action.startNewRound())

  const canJoin = state.userName !== '' && state.channelName !== ''

  const classes = useStyles()

  const isPlaying = state.gameState === 'ownerView' || state.gameState === 'playerView'
  const isSettingUp = !isPlaying && state.gameState !== 'claimingChannel' && state.gameState !== 'joiningChannel'

  const userValue = state.roundValues[state.userName]

  const handleValueButtonClick = (value: Value) => () => {
    const valueToSubmit = value === userValue ? undefined : value
    dispatch(Action.submitVote(state.userName, valueToSubmit))
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Grid container justify='center' alignItems='baseline' spacing={3}>
          <Grid item xs={12}>
            <TextField
              disabled={isPlaying}
              fullWidth={true}
              id='channel-input'
              label='Channel'
              onBlur={handleChannelNameBlur}
              onChange={handleChannelNameChange}
              value={channelName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={isPlaying}
              fullWidth
              id='user-input'
              label='User Name'
              onBlur={handleUserNameBlur}
              onChange={handleUserNameChange}
              value={userName}
            />
          </Grid>

          {isSettingUp ? (
            <Grid item xs={12}>
              <div>
                <Button className={classes.button} disabled={!canJoin} variant='outlined' onClick={handleHostClick}>
                  Host
                </Button>
                <Button className={classes.button} disabled={!canJoin} variant='outlined' onClick={handleJoinClick}>
                  Join
                </Button>
              </div>
            </Grid>
          ) : null}

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

          {state.gameState === 'playerView' && state.roundState === 'open' ? (
            <Grid item xs={12}>
              {allValues.map(v => (
                <Button
                  className={classes.button}
                  key={v}
                  onClick={handleValueButtonClick(v)}
                  variant={userValue === v ? 'contained' : 'outlined'}
                  size='large'
                >
                  {valueLabels[v]}
                </Button>
              ))}
            </Grid>
          ) : null}
        </Grid>
      </Container>
    </>
  )
}

export { Main }
