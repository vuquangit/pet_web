import React, { Dispatch, FC, SetStateAction, createRef } from 'react'
import classNames from 'classnames'

import { IUser } from '@/interfaces/user'
import { UserAvatar } from '@/components/users/UserAvatar'
import { Skeleton } from '@/components/Form'
import useOnClickOutside from '@/hooks/useOnClickOutside'

type Props = {
  isLoading: boolean
  isShowModal: boolean
  userResults: IUser[]
  handleUserSelect: (user: IUser) => void
  setShowModal: Dispatch<SetStateAction<boolean>>
}

export const RecipientResultContainer: FC<Props> = ({
  isLoading,
  isShowModal,
  userResults,
  handleUserSelect,
  setShowModal,
}) => {
  const friendModalRef = createRef<HTMLDivElement>()
  useOnClickOutside({ ref: friendModalRef, handler: () => setShowModal(false) })

  const renderUserItems = () => {
    if (userResults.length === 0) {
      return (
        <div className="px-2 py-4">
          <p>No results found</p>
        </div>
      )
    }

    return userResults.map((user) => (
      <div
        key={user.id}
        className="flex cursor-pointer items-center gap-4 bg-[#0c0c0c] px-[28px] py-5 hover:bg-[#0c0c0c]/[0.7]"
        onClick={() => handleUserSelect(user)}
      >
        <UserAvatar
          className="h-6"
          user={user}
        />
        <div className="flex flex-col">
          <span>{user?.name || ''}</span>
          {user?.username && <span>@{user?.username || ''}</span>}
        </div>
      </div>
    ))
  }

  return (
    <div
      ref={friendModalRef}
      className={classNames('r-0 l-0 absolute z-10 mx-[24px] my-1 bg-[#161616]', {
        hidden: !isShowModal,
      })}
    >
      <div className="scrollbar-custom max-h-[200px] overflow-y-scroll">
        {isLoading ? <Skeleton /> : renderUserItems()}
      </div>
    </div>
  )
}
