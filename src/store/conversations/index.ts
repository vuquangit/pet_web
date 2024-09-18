import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Conversation, CreateConversationParams } from '@/interfaces/chat'
// import { getConversations, postNewConversation } from '@/services/conversations';
import { RootState } from '..'
import {
  useLazyGetConversationsQuery,
  usePostNewConversationMutation,
} from '@/services/conversations'

export interface ConversationsState {
  conversations: Conversation[]
  loading: boolean
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
}

export const fetchConversationsThunk = createAsyncThunk('conversations/fetch', async () => {
  // return getConversations();
  const [getConversations] = useLazyGetConversationsQuery()
  const { result } = await getConversations().unwrap()

  return result
})

export const createConversationThunk = createAsyncThunk(
  'conversations/create',
  async (data: CreateConversationParams) => {
    // return postNewConversation(data);
    const [postNewConversation] = usePostNewConversationMutation()
    const { result } = await postNewConversation(data).unwrap()
    return result
  },
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        const { data } = action?.payload || {}
        if (!data) return

        state.conversations = data
        state.loading = false
      })
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(createConversationThunk.fulfilled, (state, action) => {
        const { data } = action?.payload || {}
        if (!data) return

        console.log('Fulfilled')
        console.log(data)
        state.conversations.unshift(data)
      })
  },
})

const selectConversations = (state: RootState) => state.conversation.conversations
const selectConversationId = (state: RootState, id: string) => id

export const selectConversationById = createSelector(
  [selectConversations, selectConversationId],
  (conversations, conversationId) => conversations.find((c: any) => c.id === conversationId),
)

// Action creators are generated for each case reducer function
export const { addConversation, updateConversation } = conversationsSlice.actions

export default conversationsSlice.reducer
