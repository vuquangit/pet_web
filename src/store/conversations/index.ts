import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Conversation } from '@/interfaces/chat'
import { RootState } from '..'

export interface ConversationsState {
  conversations: Conversation[]
  loading: boolean
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
}

export const conversationsSlice = createSlice({
  name: 'conversations',
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<Conversation>) => {
      console.log('addConversation')
      state.conversations.unshift(action.payload)
    },
    updateConversation: (state, action: PayloadAction<Conversation>) => {
      console.log('Inside updateConversation')
      const conversation = action.payload
      const index = state.conversations.findIndex((c) => c.id === conversation.id)
      state.conversations.splice(index, 1)
      state.conversations.unshift(conversation)
    },
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload
    },
  },
})

const selectConversations = (state: RootState) => state.conversation.conversations
const selectConversationId = (state: RootState, id: string) => id

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) => conversations.find((c: any) => c.id === conversationId),
)

// Action creators are generated for each case reducer function
export const { addConversation, updateConversation, setConversations } = conversationsSlice.actions

export default conversationsSlice.reducer
