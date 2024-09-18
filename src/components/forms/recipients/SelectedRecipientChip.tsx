import React, { FC, Dispatch, SetStateAction } from 'react'

// import { SelectedRecipientPillStyle } from '../../utils/styles';
import { User } from '@/interfaces/chat'
// import { CircleX } from 'akar-icons';
import CloseIcon from '@/assets/icons/close.svg'

type Props = {
  user: User
  setSelectedUser: Dispatch<SetStateAction<User | undefined>>
}

export const SelectedRecipientChip: FC<Props> = ({ user, setSelectedUser }) => {
  return (
    <div className="border-1 w-fit rounded-[14px] border-solid px-[18px] py-2.5 text-[14px]">
      <div className="ju flex select-none items-center">
        <span>{user.username}</span>
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
