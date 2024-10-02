import React, { FC } from 'react'

import { User } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  userResults: User[]
  handleUserSelect: (user: User) => void
}

export const RecipientResultContainer: FC<Props> = ({ userResults, handleUserSelect }) => {
  return (
    <div className="r-0 l-0 absolute z-10 mx-[24px] my-1 bg-[#161616]">
      <div className="max-h-[200px] overflow-y-scroll scrollbar-custom">
        {userResults.map((user) => (
          <div
            key={user.id}
            className="cursor-pointer bg-[#0c0c0c] px-[28px] py-5 flex items-center gap-4"
            onClick={() => handleUserSelect(user)}
          >
            <UserAvatar
              className="h-6"
              user={user}
            />
            <div className='flex flex-col'>
              <span>{user?.name || ''}</span>
              {user?.username && <span>@{user?.username || ''}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
