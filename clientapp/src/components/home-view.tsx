import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField, Grid, Button, Typography } from '@material-ui/core'
import { isNilOrEmpty } from 'utility/string-functions'
import { useStyles } from 'styles/styles'

interface HomeViewProps {}

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
          {/* <div className={classes.cards}>
            {allValues.map(v => (
              <div key={v} className={classes.card}>
                <Flippy flipDirection='horizontal'>
                  <FrontSide className={`${classes.cardSide}`}>
                    <div className={classes.cardDisplay}>{valueLabels[v]}</div>
                  </FrontSide>
                  <BackSide>X</BackSide>
                </Flippy>
              </div>
            ))}
          </div> */}
        </Container>
      </div>
    </>
  )
}

export { HomeView }
