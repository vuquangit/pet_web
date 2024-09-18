import { useAppDispatch } from '@/store/hook'
import {
  addFriendRequest,
  setFriends,
  setFriendRequests,
  removeFriendRequest,
} from '@/store/friends'
import {
  useLazyFriendRequestsQuery,
  useLazyFriendListQuery,
  useCreateFriendMutation,
  useCancelFriendMutation,
  useAcceptFriendMutation,
  useRejectFriendMutation,
  useRemoveFriendMutation,
} from '@/services/friend'

const useFriends = () => {
  const dispatch = useAppDispatch()
  const [createFriendService] = useCreateFriendMutation()
  const [friendList] = useLazyFriendListQuery()
  const [friendRequestsList, { isLoading: isLoadingFriendRequest }] = useLazyFriendRequestsQuery()
  const [cancelFriendRequestService] = useCancelFriendMutation()
  const [acceptFriend] = useAcceptFriendMutation()
  const [rejectFriend] = useRejectFriendMutation()
  const [removeFriendService] = useRemoveFriendMutation()

  const fetchFriends = async () => {
    try {
      const res = await friendList().unwrap()
      const friendsData = res.result?.data
      if (!friendsData) return
      dispatch(setFriends(friendsData))
    } catch (error) {
      console.log('Fetch friend error', error)
    }
  }

  const fetchFriendRequest = async () => {
    try {
      const res = await friendRequestsList().unwrap()
      const friendRequestData = res.result?.data
      if (!friendRequestData) return
      dispatch(setFriendRequests(friendRequestData))
    } catch (error) {
      console.log('Fetch friend request error', error)
    }
  }

  const createFriendRequest = async (request_id: string) => {
    try {
      const res = await createFriendService({ request_id }).unwrap()
      const newRequest = res.result?.data
      if (!newRequest) return
      dispatch(addFriendRequest(newRequest))
    } catch (error) {
      console.log('Create friend request error', error)
    }
  }

  const cancelFriendRequest = async (id: string) => {
    try {
      const res = await cancelFriendRequestService(id).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(removeFriendRequest({ id }))
    } catch (error) {
      console.log('Cancel friend request error', error)
    }
  }

  const acceptFriendRequest = async (requestId: string) => {
    try {
      const res = await acceptFriend(requestId).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(addFriendRequest(data.friendRequest))
    } catch (error) {
      console.log('Accept friend request error', error)
    }
  }

  const rejectFriendRequest = async (requestId: string) => {
    try {
      const res = await rejectFriend(requestId).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(removeFriendRequest({ id: requestId }))
    } catch (error) {
      console.log('Reject friend request error', error)
    }
  }

  const removeFriend = async (id: string) => {
    try {
      const res = await removeFriendService(id).unwrap()
      const data = res.result?.data
      if (!data) return
      dispatch(removeFriendRequest({ id }))
    } catch (error) {
      console.log('Remove friend error', error)
    }
  }

  return {
    isLoadingFriendRequest,
    createFriendRequest,
    fetchFriends,
    fetchFriendRequest,
    cancelFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
  }
}

export default useFriends
