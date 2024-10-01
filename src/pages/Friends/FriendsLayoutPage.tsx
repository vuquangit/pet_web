import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import { FriendPageNavbar } from '@/components/navbar/FriendsPageNavbar'
import { FriendsPage } from './FriendsPage'

export const FriendsLayoutPage = () => {
  const { pathname } = useLocation()
  return (
    <div className="h-full w-full">
      <FriendPageNavbar />
      {pathname === '/friends' && <FriendsPage />}
      <Outlet />
    </div>
  )
}
