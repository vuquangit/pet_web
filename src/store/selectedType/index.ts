import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../.'
import { ConversationType } from '@/interfaces/chat'
// import { deleteGroupMessageThunk } from './groupMessage';

export interface SelectedTypeState {
  type: ConversationType
}

const initialState: SelectedTypeState = {
  type: 'private',
}

export const selectedTypeApi = createSlice({
  name: 'selectedType',
  initialState,
  reducers: {
    updateType: (state, action: PayloadAction<ConversationType>) => {
      state.type = action.payload
    },
  },
})

export const selectType = (state: RootState) => state.selectedConversationType.type

export const { updateType } = selectedTypeApi.actions

export default selectedTypeApi.reducer
