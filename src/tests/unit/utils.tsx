import React, { PropsWithChildren } from 'react'
import { queries, render, within } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import type { AppStore, RootState } from '@/store'
import { setupStore } from '@/store'
import * as customQueries from './custom-queries'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>
  store?: AppStore
  route?: string
}

const allQueries = {
  ...queries,
  ...customQueries,
}
const customScreen = within(document.body, allQueries)
// @ts-ignore
const customWithin = (element: React.ReactElement) => within(element, allQueries)

const renderWithProviders = (
  ui: React.ReactElement,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { preloadedState = {}, route = '/', ...renderOptions }: ExtendedRenderOptions = {},
) => {
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
  return { store, ...render(ui, { wrapper: Wrapper, queries: allQueries, ...renderOptions }) }
}

export * from '@testing-library/react'

export { customScreen as screen, customWithin as within, renderWithProviders as render }
