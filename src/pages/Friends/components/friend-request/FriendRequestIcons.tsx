import React, { FC } from 'react'

import { FriendRequestDetailsType, HandleFriendRequestAction } from '@/interfaces/chat'
import CheckIcon from '@/assets/icons/check.svg'
import CloseIcon from '@/assets/icons/check.svg'

type Props = {
  details: FriendRequestDetailsType
  handleFriendRequest: (type?: HandleFriendRequestAction) => void
}

export const FriendRequestIcons: FC<Props> = ({ details, handleFriendRequest }) => {
  return (
    <div className="icons">
      {details.incoming && (
        <div
          className=":hover:bg-[rgb(22, 22, 22)] flex cursor-pointer items-center justify-center rounded-[50%] bg-[#171717] p-2.5 text-[24px] text-[#00ff04]"
          onClick={() => handleFriendRequest('accept')}
        >
          <CheckIcon />
        </div>
      )}
      <div
        className=":hover:bg-[rgb(22, 22, 22)] flex cursor-pointer items-center justify-center rounded-[50%] bg-[#171717] p-2.5 text-[24px] text-[#ff3a3a]"
        onClick={() => (details.incoming ? handleFriendRequest('reject') : handleFriendRequest())}
      >
        <CloseIcon />
      </div>
    </div>
  )
}
