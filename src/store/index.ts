import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

// stores
import authReducer from './auth'
import themeReducer from './theme'
import friendsReducer from './friends'
import groupsReducer from './group'
import conversationsReducer from './conversations'
import selectedTypeReducer from './selectedType'
import messageReducer from './messages'
import messagePanelReducer from './message-panel'
import systemMessagesReducer from './system-messages'
import callReducer from './call'
import messageContainerReducer from './messageContainer'
import groupSidebarReducer from './groupRecipientsSidebar'
import groupMessagesReducer from './groupMessage'

// services
import { testApi } from '@/services/test-service'
import { authApi } from '@/services/auth'
import { oauthApi } from '@/services/oauth'
import { friendApi } from '@/services/friend'
import { groupApi } from '@/services/group'
import { conversationsApi } from '@/services/conversations'
import { userApi } from '@/services/user'

const rootReducer = combineReducers({
  // services
  [authApi.reducerPath]: authApi.reducer,
  [testApi.reducerPath]: testApi.reducer,
  [oauthApi.reducerPath]: oauthApi.reducer,
  [friendApi.reducerPath]: friendApi.reducer,
  [groupApi.reducerPath]: groupApi.reducer,
  [conversationsApi.reducerPath]: conversationsApi.reducer,
  [userApi.reducerPath]: userApi.reducer,

  // reducers
  auth: authReducer,
  theme: themeReducer,
  friends: friendsReducer,
  groups: groupsReducer,
  conversation: conversationsReducer,
  selectedConversationType: selectedTypeReducer,
  messages: messageReducer,
  messagePanel: messagePanelReducer,
  systemMessages: systemMessagesReducer,
  call: callReducer,
  messageContainer: messageContainerReducer,
  groupSidebar: groupSidebarReducer,
  groupMessages: groupMessagesReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(testApi.middleware)
        .concat(oauthApi.middleware)
        .concat(friendApi.middleware)
        .concat(groupApi.middleware)
        .concat(conversationsApi.middleware)
        .concat(userApi.middleware),
    // .concat(logger),
    preloadedState,
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
