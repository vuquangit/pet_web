import React, { FC } from 'react'
import { useLocation, Link } from 'react-router-dom'
import classNames from 'classnames'

import { RootState } from '@/store'
import { getUserSidebarIcon } from '@/helpers'
import { UserSidebarItemType } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'
import { useAppSelector } from '@/store/hook'

type Props = {
  item: UserSidebarItemType
}

export const UserSidebarItem: FC<Props> = ({ item }) => {
  const { pathname } = useLocation()
  const user = useAppSelector((state) => state.auth.currentUser)
  const friendRequests = useAppSelector((state: RootState) => state.friends.friendRequests)

  const Icon = getUserSidebarIcon(item.id)

  const isActive = () => {
    if (pathname.includes('/groups') && item.id === 'conversations') return true
    return pathname === item.pathname
  }

  return (
    <Link
      to={item.pathname}
      className={classNames(
        'relative my-1 flex gap-4 rounded-[8px] p-3 hover:bg-[rgba(255,255,255,0.1)] md:w-full',
        {
          'border border-solid border-[#5d5d5d] dark:border-[#2e2e2e]': isActive(),
        },
      )}
      data-tooltip-id="sidebar-tooltip"
      data-tooltip-content={item.title}
      data-tooltip-place={'right'}
    >
      <div className="flex w-6 items-center justify-center">
        {item.id === 'profile' ? (
          <UserAvatar
            user={user}
            className="!h-auto !w-6"
          />
        ) : (
          <Icon
            className={classNames(
              'w-6 fill-icon-dark opacity-80 hover:opacity-100 dark:fill-icon-light',
              {
                '!dark:fill-white !opacity-100': isActive(),
              },
            )}
          />
        )}
      </div>

      <span className="hidden flex-1 dark:text-[#f5f5f5] xl:block">{item.title}</span>

      {item.id === 'friends' && friendRequests.length > 0 && (
        <div className="absolute right-1 top-0.5 flex items-center justify-center bg-[#ff3535] text-[10px]">
          {friendRequests.length > 9 ? '10+' : friendRequests.length}
        </div>
      )}
    </Link>
  )
}
