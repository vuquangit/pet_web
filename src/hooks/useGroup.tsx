import { useAppDispatch } from '@/store/hook'

import {
  CreateGroupParams,
  RemoveGroupRecipientParams,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from '@/interfaces/chat'
import {
  useLazyGroupListQuery,
  useCreateGroupMutation,
  useRemoveGroupRecipientMutation,
  useUpdateGroupOwnerMutation,
  useLeaveGroupMutation,
  useUpdateGroupDetailsMutation,
} from '@/services/group'
import { setGroups, updateGroup } from '@/store/group'

const useGroups = () => {
  const dispatch = useAppDispatch()

  const [groupList] = useLazyGroupListQuery()
  const [createGroupService] = useCreateGroupMutation()
  const [removeGroupRecipientService] = useRemoveGroupRecipientMutation()
  const [updateGroupOwnerService] = useUpdateGroupOwnerMutation()
  const [leaveGroupService] = useLeaveGroupMutation()
  const [updateGroupDetailsService] = useUpdateGroupDetailsMutation()

  const fetchGroups = async () => {
    try {
      const res = await groupList({}).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(setGroups(data))
    } catch (error) {
      console.log('Fetch group list error', error)
    }
  }

  const createGroup = async (params: CreateGroupParams) => {
    try {
      const res = await createGroupService(params).unwrap()
      const data = res.result?.data
      return data
    } catch (error) {
      console.log('Fetch group list error', error)
    }
  }

  const removeGroupRecipient = async (params: RemoveGroupRecipientParams) => {
    try {
      const res = await removeGroupRecipientService(params).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(
        updateGroup({
          type: undefined,
          group: data,
        }),
      )
    } catch (error) {
      console.log('Fetch group list error', error)
    }
  }

  const updateGroupOwner = async (params: UpdateGroupOwnerParams) => {
    try {
      const res = await updateGroupOwnerService(params).unwrap()
      const data = res.result?.data
      console.log('updated Group Owner', data)
    } catch (error) {
      console.log('Updated group owner error', error)
    }
  }

  const leaveGroup = async (id: string) => {
    try {
      const res = await leaveGroupService(id).unwrap()
      const data = res.result?.data
      console.log('Leaved Group Owner:', data)
    } catch (error) {
      console.log('Leave group owner error', error)
    }
  }

  const updateGroupDetails = async (payload: UpdateGroupDetailsPayload) => {
    try {
      const res = await updateGroupDetailsService(payload).unwrap()
      const group = res?.result?.data || {}
      console.log('Updated Group Successful. Dispatching updateGroup')
      dispatch(updateGroup({ group }))
      // thunkAPI.fulfillWithValue(group)
    } catch (error) {
      console.log('Updated group detail error', error)
    }
  }

  return {
    fetchGroups,
    createGroup,
    removeGroupRecipient,
    updateGroupOwner,
    leaveGroup,
    updateGroupDetails,
  }
}

export default useGroups
