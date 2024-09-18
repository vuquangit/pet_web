import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
  useLazyGetConversationMessagesQuery,
} from '@/services/conversations'
import { DeleteMessageParams, EditMessagePayload } from '@/interfaces/chat'

export const fetchMessagesThunk = createAsyncThunk('messages/fetch', async (id: string) => {
  const [getConversationMessages] = useLazyGetConversationMessagesQuery()
  const { result } = await getConversationMessages(id).unwrap()
  return result
})

export const deleteMessageThunk = createAsyncThunk(
  'messages/delete',
  async (params: DeleteMessageParams) => {
    const [deleteMessage] = useDeleteMessageMutation()
    const { result } = await deleteMessage(params).unwrap()
    return result
  },
)

export const editMessageThunk = createAsyncThunk(
  'messages/edit',
  async (params: EditMessagePayload) => {
    const [editMessage] = useEditMessageMutation()
    const { result } = await editMessage(params).unwrap()
    return result
  },
)
