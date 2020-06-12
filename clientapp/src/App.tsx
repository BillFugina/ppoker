import React from 'react'
import { Main } from 'components/main'
import { AppStateProvider } from 'app-state/use-app-state'

function App() {
  return (
    <AppStateProvider>
      <Main />
    </AppStateProvider>
  )
}

export default App
