import React, { FC } from 'react'

import { User } from '@/interfaces/chat'
import CloseIcon from '@/assets/icons/xmark.svg'

type Props = {
  user: User
  removeUser: (user: User) => void
}

export const SelectedGroupRecipientChip: FC<Props> = ({ user, removeUser }) => {
  return (
    <div className="rounded-[6px] bg-[#1d85fc]/[0.2] px-2.5 py-1">
      <div className="flex items-center justify-center select-none">
        <span className="font-bold text-[#0867ff] text-base">{user?.name || ''}</span>
        <CloseIcon
          className=":hover:text-[#c62d2d] ml-2.5 h-4 cursor-pointer fill-[#0b5dd0] dark:fill-[#afd2fa]"
          onClick={() => removeUser(user)}
        />
      </div>
    </div>
  )
}
