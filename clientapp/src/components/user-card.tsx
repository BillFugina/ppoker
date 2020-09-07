import { Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { RoundState, Value, valueLabels } from 'app-state/definitions'
import { PlayingCard } from 'components/playing-card'
import { UserSlate } from 'components/user-slate'
import * as React from 'react'
import { useStyles } from 'styles/styles'
import { assertNever } from 'system/assert-never'

interface UserCardProps {
  mode?: RoundState
  name: string
  value?: Value
}

type ViewMode = 'blank' | 'skeleton' | 'card'

const UserCard: React.FunctionComponent<UserCardProps> = props => {
  const styles = useStyles()

  const viewMode: ViewMode =
    props.mode === 'open' && !props.value
      ? 'skeleton'
      : props.value && (props.mode === 'open' || props.mode === 'closed')
      ? 'card'
      : 'blank'

  return (
    <Card className={styles.userCard} variant='elevation'>
      <CardContent className={styles.userCardContent}>
        {viewMode === 'skeleton' ? (
          <Skeleton variant='rect' animation='wave'>
            <PlayingCard />
          </Skeleton>
        ) : viewMode === 'card' ? (
          <PlayingCard side={props.mode === 'open' ? 'back' : 'front'} colorFront='white'>
            <Typography variant='h2'>{props.value ? valueLabels[props.value] : ''}</Typography>
          </PlayingCard>
        ) : viewMode === 'blank' ? (
          <PlayingCard color='black' />
        ) : (
          assertNever(viewMode)
        )}
      </CardContent>
      <CardActions>
        <UserSlate name={props.name} color='forestgreen' />
      </CardActions>
    </Card>
  )
}

export { UserCard }
