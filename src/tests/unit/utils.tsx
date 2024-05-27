import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import type { AppStore, RootState } from '@/store'
import { setupStore } from '@/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  route?: string
}

export function renderWithProviders(
  ui: React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { preloadedState = {}, route = '/', ...renderOptions }: ExtendedRenderOptions = {},
) {
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
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
