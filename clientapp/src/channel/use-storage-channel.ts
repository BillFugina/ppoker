import { useStorage } from 'storage/use-storage'

export function useStorageChannel<TMessageFormat>(
  channelName: string,
): [TMessageFormat | undefined, (message: TMessageFormat) => any] {
  const { data, setData } = useStorage<TMessageFormat | undefined>(channelName, undefined)

  function send(message: TMessageFormat) {
    setData(message)
  }

  const message = data

  return [message, send]
}
