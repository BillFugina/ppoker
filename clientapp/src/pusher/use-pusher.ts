import * as React from 'react'
import { Channel } from 'pusher-js'
import { useCallback, useContext, useEffect, useState } from 'react'
import { PusherSendMessage } from 'pusher/definitions'
import { pusherContext } from 'pusher/pusher-context'

const usePusher = <TMessageFormat>(channelName: string, eventName: string, privateChannel: boolean) => {
  const [channel, setChannel] = useState<Channel | undefined>()
  const [message, setMessage] = useState<TMessageFormat | undefined>()

  const pusher = useContext(pusherContext)

  const messageHandler = useCallback((message: TMessageFormat) => {
    setMessage(message)
  }, [])

  const clientEventName = `client-${eventName}`

  useEffect(() => {
    const finalChannelName = `${privateChannel ? 'private-' : ''}${channelName}`

    if (channelName) {
      if (channel) {
        channel.unbind_all()
      }

      const newChannel = pusher.subscribe(finalChannelName)
      setChannel(newChannel)
    }

    return () => {
      if (channel) {
        pusher.unsubscribe(finalChannelName)
        setChannel(undefined)
      }
    }
  }, [channelName])

  useEffect(() => {
    if (channel && eventName) {
      channel.bind(eventName, messageHandler)
      channel.bind(clientEventName, messageHandler)
    }

    return () => {
      if (channel) {
        channel.unbind_all()
      }
    }
  }, [channel, eventName])

  const sendMessage: PusherSendMessage<TMessageFormat> = React.useCallback(
    (message: TMessageFormat, selfProcess?: boolean) => {
      if (!privateChannel) {
        throw `Can only send messages over a private channel. This channel is not private.`
      } else if (channel && eventName) {
        channel.trigger(clientEventName, message)
        if (selfProcess) {
          setMessage(message)
        }
      }
    },
    [channel, eventName],
  )

  return [message, sendMessage]
}

export { usePusher }
