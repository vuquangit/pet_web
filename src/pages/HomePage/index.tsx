import React from 'react'

import LogoIcon from '@/assets/icons/logo.svg'

import './HomePage.scss'
import { useLazyTestUnauthenticatedQuery } from '@/services/test-service'

export function HomePage() {
  const [testUnauthenticated] = useLazyTestUnauthenticatedQuery()

  const handleTestUnauthenticated = async () => {
    await testUnauthenticated()
  }

  return (
    <div
      className="App"
      data-cy="home-page"
    >
      <div className="App-header">
        <LogoIcon className="App-logo mb-10 fill-gray-800 dark:fill-white" />
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
