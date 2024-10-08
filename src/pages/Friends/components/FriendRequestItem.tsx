import React, { FC } from 'react'

import { FriendRequest, HandleFriendRequestAction } from '@/interfaces/chat'
import { getFriendRequestDetails } from '@/helpers'
import { FriendRequestDetails } from './friend-request/FriendRequestDetails'
import { FriendRequestIcons } from './friend-request/FriendRequestIcons'
import useFriends from '@/hooks/useFriends'
import { useAppSelector } from '@/store/hook'

type Props = {
  friendRequest: FriendRequest
}
export const FriendRequestItem: FC<Props> = ({ friendRequest }) => {
  const user = useAppSelector((state) => state.auth.currentUser)
  const friendRequestDetails = getFriendRequestDetails(friendRequest, user)
  const { acceptFriendRequest, rejectFriendRequest, removeFriend } = useFriends()

  const handleFriendRequest = async (type?: HandleFriendRequestAction) => {
    const { id } = friendRequest
    switch (type) {
      case 'accept':
        return await acceptFriendRequest(id)
      case 'reject':
        return await rejectFriendRequest(id)
      default:
        return await removeFriend(id)
    }
  }

  return (
    <div className=":last-child:border-n-none flex justify-between border-b border-solid border-[#1f1f1fbf] p-2.5">
      <FriendRequestDetails details={friendRequestDetails} />
      <FriendRequestIcons
        details={friendRequestDetails}
        handleFriendRequest={handleFriendRequest}
      />
    </div>
  )
}
