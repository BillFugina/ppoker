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

const PlayingCard: React.FunctionComponent<CardProps> = props => {
  const classes = useStyles()

  const contents = React.Children.toArray(props.children)
  const frontContents = contents[0]
  const backContents = contents[1]

  return (
    <Flippy flipDirection='horizontal' isFlipped={props.side === 'back'}>
      <FrontSide
        className={classNames(classes.cardSide, { blank: frontContents == null })}
        onClick={props.onClick}
        style={{ backgroundColor: props.colorFront ?? props.color }}
      >
        {frontContents ? <div className={classes.cardDisplay}>{frontContents}</div> : null}
      </FrontSide>
      <BackSide
        className={classNames(classes.cardSide, { blank: backContents == null })}
        onClick={props.onClick}
        style={{ backgroundColor: props.colorBack ?? props.color }}
      >
        {backContents ? <div className={classes.cardDisplay}>{backContents}</div> : null}
      </BackSide>
    </Flippy>
  )
}

PlayingCard.defaultProps = {
  color: 'steelblue',
  side: 'back',
}

export { PlayingCard }
