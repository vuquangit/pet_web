import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { get } from 'lodash'

import { IUser } from '@/interfaces/user'
import type { RootState } from '@/store'
import { authApi } from '@/services/auth'

interface IAuthState {
  currentUser: IUser | null
}

const initialState: IAuthState = {
  currentUser: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IUser>) => ({
      ...state,
      ...action.payload,
    }),
    resetCredentials: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, action) => {
      const data = get(action, 'payload.result.data', null)
      state.currentUser = data
    })
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.currentUser = null
    })
  },
})

// Action creators are generated for each case reducer function
export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.currentUser
