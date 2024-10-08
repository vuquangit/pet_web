import React, { FC } from 'react'

import { IUser } from '@/interfaces/user'
import CloseIcon from '@/assets/icons/xmark.svg'

type Props = {
  user: IUser
  removeUser: (user: IUser) => void
}

export const SelectedGroupRecipientChip: FC<Props> = ({ user, removeUser }) => {
  return (
    <div className="rounded-[6px] bg-[#1d85fc]/[0.2] px-2.5 py-1">
      <div className="flex select-none items-center justify-center">
        <span className="text-base font-bold text-[#0867ff]">{user?.name || ''}</span>
        <CloseIcon
          className=":hover:text-[#c62d2d] ml-2.5 h-4 cursor-pointer fill-[#0b5dd0] dark:fill-[#afd2fa]"
          onClick={() => removeUser(user)}
        />
      </div>
    </div>
  )
}
