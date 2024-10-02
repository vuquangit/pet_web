import React, { FC } from 'react'

import { User } from '@/interfaces/chat'
import CloseCircleIcon from '@/assets/icons/close-circle.svg'

type Props = {
  user: User
  removeUser: (user: User) => void
}

export const SelectedGroupRecipientChip: FC<Props> = ({ user, removeUser }) => {
  return (
    <div className="rounded-[14px] border border-solid border-[#181818] dark:border-[#eeeeee] px-[18px] py-1.5 text-sm">
      <div className="flex items-center justify-center select-none">
        <span>{user?.name || ''}</span>
        <CloseCircleIcon
          className="icon :hover:text-[#c62d2d] ml-2.5 h-5 cursor-pointer text-[#656565] dark:fill-white"
          onClick={() => removeUser(user)}
        />
      </div>
    </div>
  )
}
