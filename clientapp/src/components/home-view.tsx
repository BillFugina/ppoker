import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField, Grid, Button, Theme, createStyles, makeStyles, Typography } from '@material-ui/core'
import { isNilOrEmpty } from 'utility/string-functions'

interface HomeViewProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginRight: theme.spacing(1),
    },
    chip: {
      margin: theme.spacing(0.5),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'start',
      color: theme.palette.text.secondary,
    },
  }),
)

const HomeView: React.FunctionComponent<HomeViewProps> = () => {
  const [didClick, setDidClick] = React.useState(false)
  const [state, dispatch] = useAppState()

  const [channelName, setChannelName] = React.useState(state.userName)
  const [userName, setUserName] = React.useState(state.userName)

  const isChannelNameError = isNilOrEmpty(channelName)
  const isUserNameError = isNilOrEmpty(userName)

  const hasErrors = (channelName: string, userName: string): boolean =>
    isNilOrEmpty(channelName) || isNilOrEmpty(userName)

  const channelNameHelperText = didClick && isChannelNameError ? 'Channel Name is required' : undefined
  const userNameHelperText = didClick && isUserNameError ? 'User Name is required' : undefined

  const handleHostClick = () => {
    setDidClick(true)
    if (!isChannelNameError && !isUserNameError) {
      dispatch(Action.claimChannel(channelName, userName))
    }
  }

  const handleJoinClick = () => {
    setDidClick(true)
    if (!isChannelNameError && !isUserNameError) {
      dispatch(Action.joinChannel(state.channelName, state.userName))
    }
  }

  const handleChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChannelName = event.target.value
    setChannelName(newChannelName)
    if (!hasErrors(newChannelName, userName)) {
      setDidClick(false)
    }
  }

  const handleChannelNameBlur = () => {
    if (channelName) {
      dispatch(Action.setChannelName(channelName))
    }
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value
    setUserName(newUserName)
    if (!hasErrors(channelName, newUserName)) {
      setDidClick(false)
    }
  }

  const handleUserNameBlur = () => {
    if (userName) {
      dispatch(Action.setUserName(userName))
    }
  }

  const classes = useStyles()

  const isPlaying = state.gameState === 'ownerView' || state.gameState === 'playerView'

  return (
    <>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth='sm'>
          <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
            Planning Poker
          </Typography>
          <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Choose a unique game name and user name to start.
          </Typography>
          <TextField
            disabled={isPlaying}
            error={didClick && isChannelNameError}
            fullWidth
            helperText={channelNameHelperText}
            id='channel-input'
            label='Game Name'
            onBlur={handleChannelNameBlur}
            onChange={handleChannelNameChange}
            required
            value={channelName}
          />
          <TextField
            disabled={isPlaying}
            error={didClick && isUserNameError}
            fullWidth
            helperText={userNameHelperText}
            id='user-input'
            label='User Name'
            onBlur={handleUserNameBlur}
            onChange={handleUserNameChange}
            required
            value={userName}
          />

          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                <Button variant='contained' color='primary' onClick={handleHostClick}>
                  Host Game
                </Button>
              </Grid>
              <Grid item>
                <Button variant='outlined' color='primary' onClick={handleJoinClick}>
                  Join Game
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>

      {/* <Container maxWidth='md'>
        <Grid container justify='center' alignItems='baseline' spacing={3}>
          <Grid item xs={12}>
            <TextField
              disabled={isPlaying}
              error={didClick && isChannelNameError}
              fullWidth
              helperText={channelNameHelperText}
              id='channel-input'
              label='Channel'
              onBlur={handleChannelNameBlur}
              onChange={handleChannelNameChange}
              required
              value={channelName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              disabled={isPlaying}
              error={didClick && isUserNameError}
              fullWidth
              helperText={userNameHelperText}
              id='user-input'
              label='User Name'
              onBlur={handleUserNameBlur}
              onChange={handleUserNameChange}
              required
              value={userName}
            />
          </Grid>

          {isSettingUp ? (
            <Grid item xs={12}>
              <div>
                <Button className={classes.button} variant='outlined' onClick={handleHostClick}>
                  Host
                </Button>
                <Button className={classes.button} variant='outlined' onClick={handleJoinClick}>
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
      </Container> */}
    </>
  )
}

export { HomeView }
