import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '..'
import {
  ConversationMessage,
  DeleteMessageResponse,
  FetchMessagePayload,
  MessageEventPayload,
  MessageType,
} from '@/interfaces/chat'

export interface MessagesState {
  messages: ConversationMessage[]
  loading: boolean
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, message } = action.payload
      const conversationMessage = state.messages.find((cm) => cm.id === conversation.id)
      conversationMessage?.messages.unshift(message)
    },
    deleteMessage: (state, action: PayloadAction<DeleteMessageResponse>) => {
      console.log('Inside deleteMessage reducer')
      const { payload } = action
      const conversationMessages = state.messages.find((cm) => cm.id === payload.conversationId)
      if (!conversationMessages) return
      const messageIndex = conversationMessages.messages.findIndex(
        (m) => m.id === payload.messageId,
      )
      conversationMessages.messages.splice(messageIndex, 1)
    },
    editMessage: (state, action: PayloadAction<MessageType>) => {
      console.log('editMessageReducer')
      const message = action.payload
      const conversationMessage = state.messages.find((cm) => cm.id === message.conversation.id)
      if (!conversationMessage) return
      const messageIndex = conversationMessage.messages.findIndex((m) => m.id === message.id)
      conversationMessage.messages[messageIndex] = message
    },
    setMessage: (state, action: PayloadAction<FetchMessagePayload>) => {
      const data = action?.payload || {}
      if (!data) return

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, messages } = data
      const index = state.messages.findIndex((cm) => cm.id === id)
      const exists = state.messages.find((cm) => cm.id === id)
      if (exists) {
        console.log('exists')
        state.messages[index] = data
      } else {
        state.messages.push(data)
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
  //       const { data } = action?.payload || {}
  //       if (!data) return

  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const { id, messages } = data
  //       const index = state.messages.findIndex((cm) => cm.id === id)
  //       const exists = state.messages.find((cm) => cm.id === id)
  //       if (exists) {
  //         console.log('exists')
  //         state.messages[index] = data
  //       } else {
  //         state.messages.push(data)
  //       }
  //     })
  //     .addCase(deleteMessageThunk.fulfilled, (state, action) => {
  //       const { data } = action?.payload || {}
  //       if (!data) return

  //       const conversationMessages = state.messages.find((cm) => cm.id === data.conversationId)
  //       if (!conversationMessages) return
  //       const messageIndex = conversationMessages.messages.findIndex((m) => m.id === data.messageId)
  //       conversationMessages?.messages.splice(messageIndex, 1)
  //     })
  //     .addCase(editMessageThunk.fulfilled, (state, action) => {
  //       console.log('editMessageThunk.fulfilled')
  //       const { data: message } = action?.payload || {}
  //       if (!message) return
  //       // const { data: message } = action.payload;
  //       const { id } = message.conversation
  //       const conversationMessage = state.messages.find((cm) => cm.id === id)
  //       if (!conversationMessage) return
  //       const messageIndex = conversationMessage.messages.findIndex((m) => m.id === message.id)
  //       console.log(messageIndex)
  //       conversationMessage.messages[messageIndex] = message
  //       console.log('Updated Message')
  //     })
  // },
})

const selectConversationMessages = (state: RootState) => state.messages.messages

const selectConversationMessageId = (state: RootState, id: string) => id

export const selectConversationMessage = createSelector(
  [selectConversationMessages, selectConversationMessageId],
  (conversationMessages, id) => conversationMessages.find((cm) => cm.id === id),
)

export const { addMessage, deleteMessage, editMessage, setMessage } = messagesSlice.actions

export default messagesSlice.reducer