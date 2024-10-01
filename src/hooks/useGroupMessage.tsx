import { useAppDispatch } from '@/store/hook'

import {
  useDeleteGroupMessageMutation,
  useLazyFetchGroupMessagesQuery,
  useEditGroupMessageMutation,
} from '@/services/group'
import { DeleteGroupMessageParams, EditMessagePayload } from '@/interfaces/chat'
import {
  setGroupMessage,
  deleteGroupMessage as deleteGroupMessageStore,
} from '@/store/groupMessage'

const useGroups = () => {
  const dispatch = useAppDispatch()

  const [fetchGroupMessagesAPI] = useLazyFetchGroupMessagesQuery()
  const [deleteGroupMessageAPI] = useDeleteGroupMessageMutation()
  const [editGroupMessageAPI] = useEditGroupMessageMutation()

  const fetchGroupMessages = async (id: string) => {
    try {
      const res = await fetchGroupMessagesAPI(id).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(setGroupMessage(data))
    } catch (error) {
      console.log('Fetch group list error', error)
    }
  }

  const editGroupMessage = async (params: EditMessagePayload) => {
    try {
      const res = await editGroupMessageAPI(params).unwrap()
      const data = res.result?.data
      return data
    } catch (error) {
      console.log('Fetch group list error', error)
    }
  }

  const deleteGroupMessage = async (params: DeleteGroupMessageParams) => {
    try {
      const res = await deleteGroupMessageAPI(params).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(deleteGroupMessageStore(data))
    } catch (error) {
      console.log('Fetch group list error', error)
    }
  }

  return {
    fetchGroupMessages,
    editGroupMessage,
    deleteGroupMessage,
  }
}

export default useGroups
