/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import * as React from 'react'

/**
 * Logs a message to the console every time a component renderes.
 * The message includes a list of props that changed since the last render.
 * This information is helpful in determining when and why a component is updating.
 *
 * IMPORTANT: Only use this hook when debugging. Do not leave references to this hook in production code.
 */
// @ts-ignore
export const whyDidYouUpdate = <T extends {}>(name: string, props: T) => {
  const previousProps = React.useRef<T | null>(null)
  const counter = React.useRef<number>(0)

  React.useEffect(() => {
    const count = counter.current
    const changesObj = getChanges(previousProps.current ?? {}, props)

    if (Object.keys(changesObj).length > 0) {
      if (previousProps.current) {
        // eslint-disable-next-line no-console
        console.debug('%c[why-did-you-update]', 'background: yellow; color: black; display: block;', name, {
          count,
          ...changesObj,
        })
      } else {
        // eslint-disable-next-line no-console
        console.debug(
          '%c[why-did-you-update]%c[MOUNT]',
          'background: yellow; color: black; display: block;',
          'background: blue; color: white; display: block;',
          name,
          props,
        )
      }
    }
    counter.current = count + 1
    previousProps.current = props
  })
}

export const getChanges = <T extends {}>(previousProps: T, props: T): Partial<T> => {
  type KEY = keyof T

  const allKeys: KEY[] = Object.keys({ ...previousProps, ...props }) as KEY[]
  const changesObj: any = {}
  allKeys.forEach(key => {
    if (previousProps?.[key] !== props[key]) {
      changesObj[key] = {
        from: previousProps?.[key],
        to: props[key],
      }
    }
  })
  return changesObj
}
