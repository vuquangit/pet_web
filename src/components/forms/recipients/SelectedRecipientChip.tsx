import React, { FC, Dispatch, SetStateAction } from 'react'

import { IUser } from '@/interfaces/user'
import CloseIcon from '@/assets/icons/close.svg'

type Props = {
  user: IUser
  setSelectedUser: Dispatch<SetStateAction<IUser | undefined>>
}

export const SelectedRecipientChip: FC<Props> = ({ user, setSelectedUser }) => {
  return (
    <div className="border-1 w-fit rounded-[14px] border-solid px-[18px] py-2.5 text-sm">
      <div className="ju flex select-none items-center">
        <span>{user?.name || ''}</span>
        <CloseIcon
          className="icon :hover:text-[#c62d2d] ml-2.5 h-[20px] cursor-pointer text-[#656565]"
          onClick={() => {
            setSelectedUser(undefined)
          }}
        />
      </div>
    </div>
  )
}
