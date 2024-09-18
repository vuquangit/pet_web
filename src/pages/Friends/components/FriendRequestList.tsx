import React, { useSelector } from 'react-redux'
import { RootState } from '@/store'
// import { FriendListContainer } from '../../utils/styles/friends';
import { FriendRequestItem } from './FriendRequestItem'

export const FriendRequestList = () => {
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests)
  return (
    <div className="h-[calc(100% - 150px)] overflow-y-scroll px-[60px] py-[40px] scrollbar-none">
      {friendRequests.length === 0 && <div>{'No Friend Requests :('}</div>}
      {friendRequests.map((friendRequest) => (
        <FriendRequestItem
          key={friendRequest.id}
          friendRequest={friendRequest}
        />
      ))}
    </div>
  )
}
