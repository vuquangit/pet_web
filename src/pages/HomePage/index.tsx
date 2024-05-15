import React from 'react'

import logoIcon from '@/assets/icons/logo.svg?url'
import LogoIcon from '@/assets/icons/logo.svg'
import './HomePage.scss'
import { useLazyTestUnauthenticatedQuery } from '@/services/test'

export function HomePage() {
  const [testUnauthenticated] = useLazyTestUnauthenticatedQuery()

  const handleTestUnauthenticated = async () => {
    await testUnauthenticated()
  }

  return (
    <div className="App">
      <div className="App-header">
        <img
          src={logoIcon}
          className="App-logo"
          alt="logo"
        />
        <LogoIcon className="App-logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button
          className="btn-default"
          onClick={handleTestUnauthenticated}
        >
          Test Unauthenticated
        </button>
      </div>
    </div>
  )
}
