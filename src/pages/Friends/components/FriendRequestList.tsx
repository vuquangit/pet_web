import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { FriendRequestItem } from './FriendRequestItem'
import LoadingPage from '@/components/LoadingPage'

type FriendRequestProps = {
  isLoading: boolean
}

export const FriendRequestList: FC<FriendRequestProps> = ({ isLoading }) => {
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests)

  if (isLoading) return <LoadingPage />

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
