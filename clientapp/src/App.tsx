import React from 'react'
import { Main } from 'components/main'
import { AppStateProvider } from 'app-state/use-app-state'

import 'fontsource-roboto'

// const initialState: AppState = {
//   channelName: 'test',
//   channelOwner: 'bill',
//   gameState: 'ownerView',
//   roundState: 'waiting',
//   roundValues: {},
//   userName: 'bill',
//   users: ['bill', 'jack', 'fred'],
// }

function App() {
  return (
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  )
}

export default App
