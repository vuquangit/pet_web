import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import classNames from 'classnames'

import { RootState } from '@/store'
import { getUserSidebarIcon } from '@/helpers'
import { UserSidebarItemType } from '@/interfaces/chat'

type Props = {
  item: UserSidebarItemType
}

export const UserSidebarItem: FC<Props> = ({ item }) => {
  const { pathname } = useLocation()
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests)
  const Icon = getUserSidebarIcon(item.id)

  const isActive = () => {
    if (pathname.includes('/groups') && item.id === 'conversations') return true
    return pathname.includes(item.pathname)
  }

  return (
    <Link
      to={item.pathname}
      className={classNames('relative my-1 flex items-center justify-center p-3', {
        'rounded-[8px] border border-solid border-[#5d5d5d] dark:border-[#2e2e2e]': isActive(),
      })}
    >
      <Icon
        className={classNames(
          'h-6 fill-icon-dark opacity-80 hover:opacity-100 dark:fill-icon-light',
          {
            '!dark:fill-white !opacity-100': isActive(),
          },
        )}
      />

      {item.id === 'friends' && friendRequests.length > 0 && (
        <div className="absolute right-1 top-0.5 flex items-center justify-center bg-[#ff3535] text-[10px]">
          {friendRequests.length > 9 ? '10+' : friendRequests.length}
        </div>
      )}
    </Link>
  )
}
