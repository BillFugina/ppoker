import * as React from 'react'
import logo from 'logo.svg'
import 'App.css'
import { useAppState } from 'app-state/use-app-state'
import * as Action from 'app-state/actions'

interface MainProps {}

const Main: React.FunctionComponent<MainProps> = props => {
  const [state, dispatch] = useAppState()

  const [channelName, setChannelName] = React.useState(state.userName)
  const [userName, setUserName] = React.useState(state.userName)

  const handleClick = () => {
    dispatch(Action.addUser(state.userName))
  }

  const handleChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChannelName(event.target.value)
  }

  const handleChannelNameClick = () => {
    if (channelName) {
      dispatch(Action.setChannelName(channelName))
    }
  }

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value)
  }

  const handleUserNameClick = () => {
    if (userName) {
      dispatch(Action.setUserName(userName))
    }
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          <input type='text' value={userName} onChange={handleUserNameChange} />
          <button onClick={handleUserNameClick}>Set User Name</button>
        </p>
        <p>
          <input type='text' value={channelName} onChange={handleChannelNameChange} />
          <button onClick={handleChannelNameClick}>Set Channel Name</button>
        </p>
        <button onClick={handleClick}>Click Me</button>
        <ul>
          {state.users.map(u => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export { Main }
