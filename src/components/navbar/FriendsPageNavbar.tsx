import React, { useState } from 'react'
// import { AiOutlineUserAdd } from 'react-icons/ai';
import { useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { Button } from '@/components/Form'
import { friendsNavbarItems } from '@/constants/chat'
// import { Button } from '../../utils/styles/button';
// import { FriendsNavbar, FriendsNavbarItem } from '../../utils/styles/friends';
import { CreateFriendRequestModal } from '@/components/modals/CreateFriendRequestModal'
import UserAddIcon from '@/assets/icons/user-plus-solid.svg'

export const FriendPageNavbar = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {showModal && <CreateFriendRequestModal setShowModal={setShowModal} />}
      <nav className="flex h-[150px] justify-between border border-solid border-[#30303035] px-[60px] py-[48px] text-[20px]">
        <div className="flex items-center gap-[80px]">
          {friendsNavbarItems.map((item) => (
            <span
              key={item.id}
              // className="cursor-pointer"
              className={classNames('cursor-pointer', {
                'underline underline-offset-[14px]': pathname === item.pathname,
              })}
              onClick={() => navigate(item.pathname)}
            >
              {item.label}
            </span>
          ))}
        </div>
        <Button
          // size="sm"
          // flex={true}
          // variant="primary"
          className="btn-primary"
          onClick={() => setShowModal(true)}
        >
          <UserAddIcon className="h-[20px]" />
          <span>Add Friend</span>
        </Button>
      </nav>
    </>
  )
}
