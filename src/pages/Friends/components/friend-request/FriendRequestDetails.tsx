import React, { FC } from 'react'
import { FriendRequestDetailsType } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  details: FriendRequestDetailsType
}

export const FriendRequestDetails: FC<Props> = ({ details }) => (
  <div className="flex items-center gap-5">
    <UserAvatar user={details.user} />
    <div className="flex flex-col text-[20px]">
      <span>{details.displayName}</span>
      <span className="text-[#626626} text-[14px] font-medium italic">{details.status}</span>
    </div>
  </div>
)
