import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

import authReducer from './auth'
import themeReducer from './theme'

import { testApi } from '@/services/test-service'
import { authApi } from '@/services/auth'
import { oauthApi } from '@/services/oauth'

const rootReducer = combineReducers({
  // services
  [authApi.reducerPath]: authApi.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [oauthApi.reducerPath]: oauthApi.reducer,

  // reducers
  auth: authReducer,
  theme: themeReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(testApi.middleware)
        .concat(oauthApi.middleware),
    // .concat(logger),
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
