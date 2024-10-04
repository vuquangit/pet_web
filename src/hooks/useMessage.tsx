import { useAppDispatch } from '@/store/hook'
import { DeleteMessageParams, EditMessagePayload } from '@/interfaces/chat'
import {
  useDeleteMessageMutation,
  useEditMessageMutation,
  useLazyGetConversationMessagesQuery,
} from '@/services/conversations'
import { setMessage, deleteMessage, editMessage, setLoading } from '@/store/messages'

const useMessages = () => {
  const dispatch = useAppDispatch()
  const [getConversationMessages] = useLazyGetConversationMessagesQuery()
  const [deleteMessageService] = useDeleteMessageMutation()
  const [editMessageService] = useEditMessageMutation()

  const handleFetchMessages = async (id: string) => {
    try {
      dispatch(setLoading(true))
      const res = await getConversationMessages(id).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(setMessage(data))
    } catch (error) {
      console.log('Fetch messages error', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleDeleteMessage = async (params: DeleteMessageParams) => {
    try {
      const res = await deleteMessageService(params).unwrap()
      const messageData = res.result?.data
      if (!messageData) return
      dispatch(deleteMessage(messageData))
    } catch (error) {
      console.log('Delete messages error', error)
    }
  }

  const handleEditMessage = async (params: EditMessagePayload) => {
    try {
      const res = await editMessageService(params).unwrap()
      const messageData = res.result?.data
      if (!messageData) return
      dispatch(editMessage(messageData))
    } catch (error) {
      console.log('Edit messages error', error)
    }
  }

  return {
    handleFetchMessages,
    handleDeleteMessage,
    handleEditMessage,
  }
}

export default useMessages
