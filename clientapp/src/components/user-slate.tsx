import { Avatar, makeStyles, Typography } from '@material-ui/core'
import * as React from 'react'
import { Row, Item } from '@mui-treasury/components/flex'
import { NamedColor } from 'csstype'

interface UserSlateProps {
  name: string
  color?: NamedColor
}

const useUserSlateStyles = makeStyles(() => ({
  avatar: {
    borderRadius: 8,
    marginRight: '0.5em',
  },
  overline: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#8D9CAD',
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    color: '#495869',
  },
}))

const UserSlate: React.FunctionComponent<UserSlateProps> = props => {
  const styles = useUserSlateStyles()
  return (
    <Row {...props}>
      <Item>
        <Avatar className={styles.avatar} style={{ backgroundColor: props.color }}>
          {props.name[0]}
        </Avatar>
      </Item>
      <Item position={'middle'} pl={{ sm: 0.5, lg: 0.5 }}>
        <Typography className={styles.name}>{props.name}</Typography>
      </Item>
    </Row>
  )
}

UserSlate.defaultProps = {
  color: 'darkgray',
}

export { UserSlate }
