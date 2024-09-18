import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  CreateGroupParams,
  RemoveGroupRecipientParams,
  UpdateGroupDetailsPayload,
  UpdateGroupOwnerParams,
} from '@/interfaces/chat'
// import {
//   fetchGroups as fetchGroupsAPI,
//   createGroup as createGroupAPI,
//   removeGroupRecipient as removeGroupRecipientAPI,
//   updateGroupOwner as updateGroupOwnerAPI,
//   leaveGroup as leaveGroupAPI,
//   updateGroupDetails as updateGroupDetailsAPI,
// } from '@/services/group';
import {
  useLazyGroupListQuery,
  useCreateGroupMutation,
  useRemoveGroupRecipientMutation,
  useUpdateGroupOwnerMutation,
  useLeaveGroupMutation,
  useUpdateGroupDetailsMutation,
} from '@/services/group'
import { updateGroup } from '.'

export const fetchGroupsThunk = createAsyncThunk('groups/fetch', async () => {
  // return fetchGroupsAPI();
  const [groupList] = useLazyGroupListQuery()
  const { result } = await groupList({}).unwrap()
  return result
})

export const createGroupThunk = createAsyncThunk(
  'groups/create',
  async (params: CreateGroupParams) => {
    // createGroupAPI(params)
    const [createGroup] = useCreateGroupMutation()
    const { result } = await createGroup(params).unwrap()
    return result
  },
)

export const removeGroupRecipientThunk = createAsyncThunk(
  'groups/recipients/delete',
  async (params: RemoveGroupRecipientParams) => {
    // removeGroupRecipientAPI(params)
    const [removeGroupRecipient] = useRemoveGroupRecipientMutation()
    const { result } = await removeGroupRecipient(params).unwrap()
    return result
  },
)

export const updateGroupOwnerThunk = createAsyncThunk(
  'groups/owner/update',
  async (params: UpdateGroupOwnerParams) => {
    // updateGroupOwnerAPI(params)
    const [updateGroupOwner] = useUpdateGroupOwnerMutation()
    const { result } = await updateGroupOwner(params).unwrap()
    return result
  },
)

export const leaveGroupThunk = createAsyncThunk('groups/leave', async (id: string) => {
  // leaveGroupAPI(id)
  const [leaveGroup] = useLeaveGroupMutation()
  const { result } = await leaveGroup(id).unwrap()
  return result
})

export const updateGroupDetailsThunk = createAsyncThunk(
  'groups/update/details',
  async (payload: UpdateGroupDetailsPayload, thunkAPI) => {
    try {
      const [updateGroupDetails] = useUpdateGroupDetailsMutation()
      // const { data: group } = await updateGroupDetails(payload).unwrap();
      const res = await updateGroupDetails(payload).unwrap()
      const group = res?.result?.data || {}
      console.log('Updated Group Successful. Dispatching updateGroup')
      thunkAPI.dispatch(updateGroup({ group }))
      thunkAPI.fulfillWithValue(group)
    } catch (err) {
      thunkAPI.rejectWithValue(err)
    }
  },
)
