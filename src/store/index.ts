import { combineReducers, configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import authReducer from './auth'

import { authApi } from '@/services/auth'
import { testApi } from '@/services/test'

const rootReducer = combineReducers({
  // services
  [authApi.reducerPath]: authApi.reducer,
  [testApi.reducerPath]: testApi.reducer,

  // reducers
  auth: authReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(testApi.middleware)
        .concat(logger),
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
