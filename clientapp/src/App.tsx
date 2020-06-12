import React from 'react'
import logo from './logo.svg'
import './App.css'
import { useStorage } from 'storage/use-storage'

function App() {
  const { data, setData } = useStorage('channel', 'initialValue')

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setData(event.target.value)
    },
    [setData],
  )

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          {data}
        </a>
        <input type='text' value={data} onChange={handleChange} />
      </header>
    </div>
  )
}

export default App
