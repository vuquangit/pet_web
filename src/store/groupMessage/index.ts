import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../.'
import {
  DeleteGroupMessageResponse,
  FetchGroupMessagePayload,
  GroupMessage,
  GroupMessageEventPayload,
  GroupMessageType,
} from '@/interfaces/chat'

export interface GroupMessagesState {
  messages: GroupMessage[]
}

const initialState: GroupMessagesState = {
  messages: [],
}
export const groupMessagesSlice = createSlice({
  name: 'groupMessages',
  initialState,
  reducers: {
    addGroupMessage: (state, action: PayloadAction<GroupMessageEventPayload>) => {
      const { group, message } = action.payload
      const groupMessage = state.messages.find((gm) => gm.id === group.id)
      groupMessage?.messages.unshift(message)
    },
    editGroupMessage: (state, action: PayloadAction<GroupMessageType>) => {
      console.log('editGroupMessageThunk.fulfilled')
      const { payload } = action
      const { id } = payload.group
      const groupMessage = state.messages.find((gm) => gm.id === id)
      if (!groupMessage) return
      const messageIndex = groupMessage.messages.findIndex((m) => m.id === payload.id)
      console.log(messageIndex)
      groupMessage.messages[messageIndex] = payload
      console.log('Updated Message')
    },
    setGroupMessage: (state, action: PayloadAction<FetchGroupMessagePayload>) => {
      const data = action.payload
      const { id } = data
      console.log('setGroupMessage', data)

      const index = state.messages.findIndex((gm) => gm.id === id)
      const exists = state.messages.find((gm) => gm.id === id)
      exists ? (state.messages[index] = data) : state.messages.push(data)
    },
    deleteGroupMessage: (state, action: PayloadAction<DeleteGroupMessageResponse>) => {
      const data = action?.payload || {}
      if (!data) return

      const groupMessages = state.messages.find((gm) => gm.id === data.groupId)
      console.log(data)
      console.log(groupMessages)
      if (!groupMessages) return
      const messageIndex = groupMessages.messages.findIndex((m) => m.id === data.messageId)
      groupMessages?.messages.splice(messageIndex, 1)
    },
  },
})

const selectGroupMessages = (state: RootState) => state.groupMessages.messages
const selectGroupMessageId = (state: RootState, id: string) => id

export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessageId],
  (groupMessages, id) => groupMessages.find((gm: any) => gm.id === id),
)

export const { addGroupMessage, editGroupMessage, setGroupMessage, deleteGroupMessage } =
  groupMessagesSlice.actions

export default groupMessagesSlice.reducer
