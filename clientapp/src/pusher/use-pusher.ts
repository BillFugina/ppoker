import * as React from 'react'
import { Channel } from 'pusher-js'
import { useCallback, useContext, useEffect, useState } from 'react'
import { PusherSendMessage } from 'pusher/definitions'
import { pusherContext } from 'pusher/pusher-context'
import { useWhyDidYouUpdate } from 'hooks/use-why-did-you-update'

const usePusher = <TMessageFormat>(channelName: string, eventName: string, privateChannel: boolean) => {
  const [channel, setChannel] = useState<Channel | undefined>()
  const [message, setMessage] = useState<TMessageFormat | undefined>()

  const pusher = useContext(pusherContext)

  const clientEventName = React.useMemo(() => `client-${eventName}`, [eventName])

  const messageHandler = useCallback((message: TMessageFormat) => {
    setMessage(message)
  }, [])

  useWhyDidYouUpdate('usePusher', { channelName, eventName, clientEventName, messageHandler })

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
  }, [channel, channelName, privateChannel, pusher])

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
  }, [channel, clientEventName, eventName, messageHandler])

  const sendMessage: PusherSendMessage<TMessageFormat> = React.useCallback(
    (message: TMessageFormat, selfProcess?: boolean) => {
      if (!privateChannel) {
        throw new Error(`Can only send messages over a private channel. This channel is not private.`)
      } else if (channel && eventName) {
        channel.trigger(clientEventName, message)
        if (selfProcess) {
          setMessage(message)
        }
      }
    },
    [channel, clientEventName, eventName, privateChannel],
  )

  return [message, sendMessage]
}

export { usePusher }
