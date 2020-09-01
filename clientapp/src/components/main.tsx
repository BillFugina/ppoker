import * as React from 'react'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'
import CssBaseline from '@material-ui/core/CssBaseline'
// import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { TextField, Grid, Button, Paper, Theme, createStyles, makeStyles, Chip } from '@material-ui/core'

interface MainProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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

  const canJoin = state.userName !== '' && state.channelName !== ''

  const classes = useStyles()

  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Grid container justify='center' alignItems='baseline' spacing={3}>
          <Grid item xs={12}>
            <TextField
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
              fullWidth
              id='user-input'
              label='User Name'
              onBlur={handleUserNameBlur}
              onChange={handleUserNameChange}
              value={userName}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item>
                <Button disabled={!canJoin} variant='outlined' onClick={handleHostClick}>
                  Host
                </Button>
              </Grid>
              <Grid item>
                <Button disabled={!canJoin} variant='outlined' onClick={handleJoinClick}>
                  Join
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {state.users.map(user => (
                <Chip
                  className={classes.chip}
                  key={user}
                  label={user}
                  color={user === state.channelOwner ? 'primary' : 'default'}
                />
              ))}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Chip label={state.gameState} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export { Main }
