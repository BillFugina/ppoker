import { useStorage } from 'storage/use-storage'
import * as React from 'react'

export function useStorageChannel<TMessageFormat>(
  channelName: string,
): [TMessageFormat | undefined, (message: TMessageFormat) => any] {
  const { data, setData } = useStorage<TMessageFormat | undefined>(channelName, undefined)

  const send = React.useCallback((message: TMessageFormat) => setData(message), [setData])

  const message = data

  return [message, send]
}
