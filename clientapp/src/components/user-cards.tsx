import { Container } from '@material-ui/core'
import { Value } from 'app-state/definitions'
import { useAppState } from 'app-state/use-app-state'
import { UserCard } from 'components/user-card'
import * as React from 'react'
import { useStyles } from 'styles/styles'

interface UserCardsProps {
  value?: Value
}

const UserCards: React.FunctionComponent<UserCardsProps> = () => {
  const styles = useStyles()
  const [state] = useAppState()

  const users = state.users.filter(u => u !== state.channelOwner)

  return (
    <Container maxWidth='md'>
      <div className={styles.userCards}>
        {users.map(user => (
          <UserCard mode={state.roundState} name={user} value={state.roundValues[user]} />
        ))}
      </div>
    </Container>
  )
}

export { UserCards }
