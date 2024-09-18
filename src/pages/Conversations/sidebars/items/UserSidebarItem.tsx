import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { RootState } from '@/store'
import { getUserSidebarIcon } from '@/helpers'
// import { IconBadge, UserSidebarItemStyle } from '../../../utils/styles';
import { UserSidebarItemType } from '@/interfaces/chat'
import classNames from 'classnames'

type Props = {
  item: UserSidebarItemType
}

export const UserSidebarItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const friendRequests = useSelector((state: RootState) => state.friends.friendRequests)
  const Icon = getUserSidebarIcon(item.id)
  // const ICON_SIZE = 30;
  const STROKE_WIDTH = 2

  const isActive = () => {
    if (pathname.includes('/groups') && item.id === 'conversations') return true
    return pathname.includes(item.pathname)
  }
  return (
    <div
      className={classNames('relative flex w-full items-center justify-center px-5 py-5', {
        'bg-[#1e1e1e]': isActive(),
      })}
      onClick={() => navigate(item.pathname)}
    >
      <Icon
        className="h-8"
        strokeWidth={STROKE_WIDTH}
      />
      {item.id === 'friends' && friendRequests.length > 0 && (
        <div className="absolute right-1 top-0.5 flex items-center justify-center bg-[#ff3535] text-[10px]">
          {friendRequests.length > 9 ? '10+' : friendRequests.length}
        </div>
      )}
    </div>
  )
}
