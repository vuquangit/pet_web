import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '@/store'
import { ETheme } from '@/enums/theme'

export interface ITheme {
  theme: ETheme
}

const initialState: ITheme = {
  theme: ETheme.LIGHT,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ETheme>) => ({
      ...state,
      theme: action.payload,
    }),
    resetTheme: () => initialState,
  },
})

export default themeSlice.reducer
export const { setTheme, resetTheme } = themeSlice.actions
export const currentTheme = (state: RootState) => state.theme.theme
