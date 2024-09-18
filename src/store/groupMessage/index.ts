import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../.'
import {
  useDeleteGroupMessageMutation,
  useLazyFetchGroupMessagesQuery,
  useEditGroupMessageMutation,
} from '@/services/group'
import {
  DeleteGroupMessageParams,
  EditMessagePayload,
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

export const fetchGroupMessagesThunk = createAsyncThunk(
  'groupMessages/fetch',
  async (id: string) => {
    // fetchGroupMessagesAPI(id)
    const [fetchGroupMessagesAPI] = useLazyFetchGroupMessagesQuery()
    const { result } = await fetchGroupMessagesAPI(id).unwrap()
    return result
  },
)

export const deleteGroupMessageThunk = createAsyncThunk(
  'groupMessages/delete',
  async (params: DeleteGroupMessageParams) => {
    // deleteGroupMessageAPI(params)
    const [deleteGroupMessageAPI] = useDeleteGroupMessageMutation()
    const { result } = await deleteGroupMessageAPI(params).unwrap()
    return result
  },
)

export const editGroupMessageThunk = createAsyncThunk(
  'groupMessages/edit',
  async (params: EditMessagePayload) => {
    // editGroupMessageAPI(params)
    const [editGroupMessageAPI] = useEditGroupMessageMutation()
    const { result } = await editGroupMessageAPI(params).unwrap()
    return result
  },
)

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroupMessagesThunk.fulfilled, (state, action) => {
        const { data } = action?.payload || {}
        if (!data) return

        const { id } = data
        console.log('fetchGroupMessagesThunk.fulfilled')
        console.log(data)
        const index = state.messages.findIndex((gm) => gm.id === id)
        const exists = state.messages.find((gm) => gm.id === id)
        exists ? (state.messages[index] = data) : state.messages.push(data)
      })
      .addCase(deleteGroupMessageThunk.fulfilled, (state, action) => {
        console.log('deleteGroupMessageThunk.fulfilled')

        const { data } = action?.payload || {}
        if (!data) return

        // const { data } = action.payload;
        const groupMessages = state.messages.find((gm) => gm.id === data.groupId)
        console.log(data)
        console.log(groupMessages)
        if (!groupMessages) return
        const messageIndex = groupMessages.messages.findIndex((m) => m.id === data.messageId)
        groupMessages?.messages.splice(messageIndex, 1)
      })
  },
})

const selectGroupMessages = (state: RootState) => state.groupMessages.messages
const selectGroupMessageId = (state: RootState, id: number) => id

export const selectGroupMessage = createSelector(
  [selectGroupMessages, selectGroupMessageId],
  (groupMessages, id) => groupMessages.find((gm: any) => gm.id === id),
)

export const { addGroupMessage, editGroupMessage } = groupMessagesSlice.actions

export default groupMessagesSlice.reducer
