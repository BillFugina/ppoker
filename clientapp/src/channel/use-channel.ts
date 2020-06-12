export function useChannel<TMessageFormat>(
  channelName: string,
  messageHandler: (message: TMessageFormat) => void,
) {}
