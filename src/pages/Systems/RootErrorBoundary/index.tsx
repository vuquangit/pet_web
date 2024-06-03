import React from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function RootErrorBoundary() {
  const error = useRouteError() as Error

  console.log('RootErrorBoundary:', error)

  // We only care to handle 401's at this level, so if this is not a 401
  // ErrorResponse, re-throw to let the RootErrorBoundary handle it
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    return (
      <>
        <h1>You do not have access to this project</h1>
      </>
    )
  }

  return (
    <div>
      <h1>Uh oh, something went terribly wrong 😩</h1>

      <pre>{error.message || JSON.stringify(error)}</pre>
      <button onClick={() => (window.location.href = '/')}>Click here to reload the app</button>
    </div>
  )
}
