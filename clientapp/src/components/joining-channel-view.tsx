import * as React from 'react'
import { Container, Typography, makeStyles, CircularProgress, Grid } from '@material-ui/core'
import { useAppState } from 'app-state/use-app-state'

interface MainProps {}

const JoiningChannelView: React.FunctionComponent<MainProps> = () => {
  const [state] = useAppState()
  const useStyles = makeStyles(theme => ({
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
  }))

  const classes = useStyles()

  return (
    <div className={classes.heroContent}>
      <Container maxWidth='sm'>
        <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
          Joining Game "{state.channelName}"
        </Typography>
        <Typography variant='h5' align='center' color='textSecondary' paragraph>
          Waiting for the host to add you to the game.
        </Typography>
        <Grid container justify='center'>
          <CircularProgress />
        </Grid>
      </Container>
    </div>
  )
}

export { JoiningChannelView }
