/// <reference types="cypress" />

// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import '@cypress/code-coverage/support'

// Ensure global styles are loaded
import '@/styles/index.scss'

import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
// import type { RenderOptions } from '@testing-library/react'

// import type { AppStore, RootState } from '@/store'
import { setupStore } from '@/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: Partial<RootState>
//   store?: AppStore
//   route?: string
// }

Cypress.Commands.add(
  'mount',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (component: React.ReactElement, { preloadedState = {}, route = '/', ...renderOptions } = {}) => {
    // window.history.pushState({}, 'Test page', route)
    const store = setupStore(preloadedState)

    function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
      return (
        <Provider store={store}>
          <BrowserRouter>{children}</BrowserRouter>
        </Provider>
      )
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) }
  },
)
