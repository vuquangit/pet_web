import React, { FC } from 'react'
import { FriendRequestDetailsType } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  details: FriendRequestDetailsType
}

export const FriendRequestDetails: FC<Props> = ({ details }) => (
  <div className="details">
    <UserAvatar user={details.user} />
    <div className="name">
      <span>{details.displayName}</span>
      <span className="status">{details.status}</span>
    </div>
  </div>
)
