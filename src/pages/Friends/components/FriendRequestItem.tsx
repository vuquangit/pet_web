import React, { FC, useContext } from 'react'

import { AuthContext } from '@/context/AuthContext'
// import { FriendRequestItemContainer } from '../../utils/styles/friends';
import { FriendRequest, HandleFriendRequestAction } from '@/interfaces/chat'

import {
  acceptFriendRequestThunk,
  cancelFriendRequestThunk,
  rejectFriendRequestThunk,
} from '@/store/friends/friendsThunk'
import { getFriendRequestDetails } from '@/helpers'
import { FriendRequestDetails } from './friend-request/FriendRequestDetails'
import { FriendRequestIcons } from './friend-request/FriendRequestIcons'
import { useAppDispatch } from '@/store/hook'

type Props = {
  friendRequest: FriendRequest
}
export const FriendRequestItem: FC<Props> = ({ friendRequest }) => {
  const { user } = useContext(AuthContext)
  const dispatch = useAppDispatch()
  const friendRequestDetails = getFriendRequestDetails(friendRequest, user)

  const handleFriendRequest = (type?: HandleFriendRequestAction) => {
    const { id } = friendRequest
    switch (type) {
      case 'accept':
        return dispatch(acceptFriendRequestThunk(id))
      case 'reject':
        return dispatch(rejectFriendRequestThunk(id))
      default:
        return dispatch(cancelFriendRequestThunk(id))
    }
  }

  return (
    <div className="flex justify-between border-b border-solid border-[#1f1f1fbf] px-2.5">
      <FriendRequestDetails details={friendRequestDetails} />
      <FriendRequestIcons
        details={friendRequestDetails}
        handleFriendRequest={handleFriendRequest}
      />
    </div>
  )
}
