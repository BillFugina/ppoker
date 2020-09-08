import Pusher from 'pusher-js'
import React from 'react'

const pusherApiKey: string = process.env.REACT_APP_PUSHER_KEY || ''
const pusherCluster: string = process.env.REACT_APP_PUSHER_CLUSTER || ''
const pusherAuthEndpoint: string = process.env.REACT_APP_PUSHER_AUTH_ENDPOINT || ''

console.log(`initializing Pusher context`, { pusherApiKey, pusherCluster, pusherAuthEndpoint })

const pusher = new Pusher(pusherApiKey, { cluster: pusherCluster, authEndpoint: pusherAuthEndpoint })
const pusherContext = React.createContext(pusher)

export { pusherContext }
