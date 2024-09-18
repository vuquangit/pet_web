import React, { useEffect } from 'react'
import { FriendRequestList } from './components/FriendRequestList'
import useFriends from '@/hooks/useFriends'

export const FriendRequestPage = () => {
  const { fetchFriendRequest, isLoadingFriendRequest } = useFriends()

  useEffect(() => {
    ;(async () => {
      await fetchFriendRequest()
    })()
  }, [])

  return <FriendRequestList isLoading={isLoadingFriendRequest} />
}
