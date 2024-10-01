import { useAppDispatch } from '@/store/hook'
import {
  useLazyGetConversationsQuery,
  usePostNewConversationMutation,
} from '@/services/conversations'
import { setConversations, addConversation } from '@/store/conversations'
import { CreateConversationParams } from '@/interfaces/chat'

const useConversations = () => {
  const dispatch = useAppDispatch()
  const [getConversations] = useLazyGetConversationsQuery()
  const [postNewConversation] = usePostNewConversationMutation()

  const fetchConversations = async () => {
    try {
      const res = await getConversations().unwrap()
      const friendsData = res.result?.data
      if (!friendsData) return
      dispatch(setConversations(friendsData))
    } catch (error) {
      console.log('Fetch Conversations error', error)
    }
  }

  const createConversation = async (data: CreateConversationParams) => {
    try {
      const res = await postNewConversation(data).unwrap()
      const friendsData = res.result?.data
      if (!friendsData) return
      dispatch(addConversation(friendsData))

      return friendsData
    } catch (error) {
      console.log('Create conversations error', error)
    }
  }

  return {
    fetchConversations,
    createConversation,
  }
}

export default useConversations
