import { createAsyncThunk } from '@reduxjs/toolkit'

import {
  useLazyFriendRequestsQuery,
  useLazyFriendListQuery,
  useCreateFriendMutation,
  useCancelFriendMutation,
  useAcceptFriendMutation,
  useRejectFriendMutation,
  useRemoveFriendMutation,
} from '@/services/friend'

export const fetchFriendsThunk = createAsyncThunk('friends/fetch', async () => {
  const [friendList] = useLazyFriendListQuery()
  const { result } = await friendList().unwrap()
  return result
})

export const fetchFriendRequestThunk = createAsyncThunk('friends/requests/fetch', async () => {
  const [friendRequestsList] = useLazyFriendRequestsQuery()
  const { result } = await friendRequestsList().unwrap()
  return result
})

export const createFriendRequestThunk = createAsyncThunk(
  'friends/requests/create',
  async (userId: string) => {
    const [createFriend] = useCreateFriendMutation()
    const { result } = await createFriend({ userId }).unwrap()
    return result
  },
)

export const cancelFriendRequestThunk = createAsyncThunk(
  'friends/request/cancel',
  async (id: string) => {
    const [cancelFriend] = useCancelFriendMutation()
    const { result } = await cancelFriend({ id }).unwrap()
    return result
  },
)

export const acceptFriendRequestThunk = createAsyncThunk(
  'friends/request/accept',
  async (id: string) => {
    const [acceptFriend] = useAcceptFriendMutation()
    const { result } = await acceptFriend({ id }).unwrap()
    return result
  },
)

export const rejectFriendRequestThunk = createAsyncThunk(
  'friends/request/reject',
  async (id: string) => {
    const [rejectFriend] = useRejectFriendMutation()
    const { result } = await rejectFriend({ id }).unwrap()
    return result
  },
)

export const removeFriendThunk = createAsyncThunk('friends/remove', async (id: string) => {
  const [removeFriend] = useRemoveFriendMutation()
  const { result } = await removeFriend({ id }).unwrap()
  return result
})
