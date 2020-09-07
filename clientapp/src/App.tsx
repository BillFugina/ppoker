import React from 'react'
import { Main } from 'components/main'
import { AppStateProvider } from 'app-state/use-app-state'

import 'fontsource-roboto'
import { ThemeProvider, createMuiTheme, responsiveFontSizes, CssBaseline } from '@material-ui/core'

// const initialState: AppState = {
//   channelName: 'test',
//   channelOwner: 'bill',
//   gameState: 'ownerView',
//   roundState: 'waiting',
//   roundValues: {},
//   userName: 'bill',
//   users: ['bill', 'jack', 'fred'],
// }

const theme = responsiveFontSizes(
  createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 350,
        md: 600,
        lg: 960,
        xl: 1280,
      },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          html: {
            backgroundColor: 'white',
          },
        },
      },
    },
  }),
)

function App() {
  return (
    <AppStateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Main />
      </ThemeProvider>
    </AppStateProvider>
  )
}

export default App
