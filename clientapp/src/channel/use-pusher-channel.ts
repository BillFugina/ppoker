import { usePusher } from 'pusher/use-pusher'

export function usePusherChannel<TMessageFormat>(
  channelName: string,
): [TMessageFormat | undefined, (message: TMessageFormat) => any] {
  const [message, sendMessage] = usePusher(channelName, 'message', true)
  return [message, sendMessage]
}
