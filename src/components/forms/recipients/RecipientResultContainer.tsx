import React, { FC } from 'react'

import { User } from '@/interfaces/chat'

type Props = {
  userResults: User[]
  handleUserSelect: (user: User) => void
}

export const RecipientResultContainer: FC<Props> = ({ userResults, handleUserSelect }) => {
  return (
    <div className="r-0 l-0 absolute z-10 mx-[24px] my-1 bg-[#161616]">
      <div className="max-h-[200px] overflow-auto scrollbar-none">
        {userResults.map((user) => (
          <div
            key={user.id}
            className=":hover:cursor-pointer bg-[#0c0c0c] px-[28px] py-5"
            onClick={() => handleUserSelect(user)}
          >
            <span>{user?.name || ''}</span>

            {user?.username && <span>@{user?.username || ''}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
