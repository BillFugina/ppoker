import * as React from 'react'
import { Container, Typography, makeStyles } from '@material-ui/core'
import { useAppState } from 'app-state/use-app-state'

interface MainProps {}

const ClaimingChannelView: React.FunctionComponent<MainProps> = () => {
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
          Failed
        </Typography>
        <Typography variant='h5' align='center' color='textSecondary' paragraph>
          The game "{state.channelName}" is already being hosted by someone else.
        </Typography>
      </Container>
    </div>
  )
}

export { ClaimingChannelView }
