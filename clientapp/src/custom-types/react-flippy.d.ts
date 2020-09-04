declare module 'react-flippy' {
  import * as React from 'react'

  interface FlippyProps extends React.HTMLAttributes<T> {
    showNavigation?: boolean
    flipDirection?: 'horizontal' | 'vertical'
    flipOnHover?: boolean
    flipOnClick?: boolean
    isFlipped?: boolean
    usePrettyStyle?: boolean
    onMouseEnter?: () => void
    onMouseLeave?: () => void
    onTouchStart?: () => void
    onTouchEnd?: () => void
    onClick?: () => void
  }

  export class Flippy extends React.Component<FlippyProps, any> {}

  interface FlippySideProps extends React.HTMLAttributes<T> {
    animationDuration?: number
    elementType?: keyof React.ReactHTML
  }

  export class FrontSide extends React.Component<FlippySideProps> {}
  export class BackSide extends React.Component<FlippySideProps> {}
}
