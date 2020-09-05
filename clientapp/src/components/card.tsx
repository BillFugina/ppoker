import * as React from 'react'
import { Flippy, FrontSide, BackSide } from 'react-flippy'
import { useStyles } from 'styles/styles'
import { NamedColor } from 'csstype'
import classNames from 'classnames'
// import { Card as MaterialCard } from '@material-ui/core'

export const cardSides = ['front', 'back'] as const
export type CardSide = typeof cardSides[number]

interface CardProps {
  color?: NamedColor
  colorBack?: NamedColor
  colorFront?: NamedColor
  key?: React.Key
  onClick?: () => void
  side?: CardSide
}

const Card: React.FunctionComponent<CardProps> = props => {
  const classes = useStyles()

  return (
    <Flippy flipDirection='horizontal' isFlipped={props.side === 'back'}>
      <FrontSide
        className={classNames(classes.cardSide, { blank: props.children == null })}
        onClick={props.onClick}
        style={{ backgroundColor: props.colorFront ?? props.color }}
      >
        <div className={classes.cardDisplay}>{props.children}</div>
      </FrontSide>
      <BackSide
        className={classNames(classes.cardSide, { blank: props.children == null })}
        onClick={props.onClick}
        style={{ backgroundColor: props.colorBack ?? props.color }}
      >
        <div className={classes.cardDisplay}>{props.children}</div>
      </BackSide>
    </Flippy>
  )
}

Card.defaultProps = {
  color: 'steelblue',
  side: 'back',
}

export { Card }
