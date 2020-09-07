import * as React from 'react'
import { PlayingCard } from 'components/playing-card'
import { useStyles } from 'styles/styles'
import { NamedColor } from 'csstype'

interface CardChooserProps<T extends string | number | symbol> {
  readOnly?: boolean
  values: Record<T, string>
  value?: T
  onValueChange?: (value: T | undefined) => void
}

function CardChooser<T extends string | number | symbol>(props: React.PropsWithChildren<CardChooserProps<T>>) {
  const classes = useStyles()

  const allValues: T[] = Object.keys(props.values) as T[]

  const handleCardClick = (v: T) => () => {
    if (!props.readOnly && props.onValueChange) {
      props.onValueChange(v !== props.value ? v : undefined)
    }
  }

  return (
    <div className={classes.cards}>
      {allValues.map(v => {
        const selected = v === props.value
        const color: NamedColor = props.readOnly
          ? selected
            ? 'olivedrab'
            : 'cadetblue'
          : selected
          ? 'green'
          : 'steelblue'
        return (
          <PlayingCard key={v.toString()} onClick={handleCardClick(v)} color={color} side={selected ? 'back' : 'front'}>
            <span>{props.values[v]}</span>
            <span>{props.values[v]}</span>
          </PlayingCard>
        )
      })}
    </div>
  )
}

export { CardChooser }
