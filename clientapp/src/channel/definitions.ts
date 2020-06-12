export type ChannelHook<TMessageFormat> = (
  channelName: string,
) => [string | undefined, (message: TMessageFormat) => any]
export type ChannelAPI<TMessageFormat> = ReturnType<ChannelHook<TMessageFormat>>
