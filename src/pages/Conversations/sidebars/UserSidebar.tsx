import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// import {
//   UserSidebarFooter,
//   UserSidebarHeader,
//   UserSidebarScrollableContainer,
//   UserSidebarStyle,
// } from '../../utils/styles';
import { userSidebarItems } from '@/constants/chat'
import { UserSidebarItem } from './items/UserSidebarItem'
import { AuthContext } from '@/context/AuthContext'
import { UpdatePresenceStatusModal } from '@/components/modals/UpdatePresenceStatusModal'
import ExitIcon from '@/assets/icons/exit.svg'
import { UserAvatar } from '@/components/users/UserAvatar'
// import { logoutUser as logoutUserAPI } from '@/services/auth';
import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { ROUTER_NAMES } from '@/constants/routerNames'
import { useAppDispatch } from '@/store/hook'
import { resetCredentials } from '@/store/auth'

export const UserSidebar = () => {
  const [showModal, setShowModal] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logoutUser = () => {
    // logoutUserAPI().finally(() => navigate('/login', { replace: true }));
    StorageService.set(storageKeys.AUTH_PROFILE, null)
    dispatch(resetCredentials())
    navigate(ROUTER_NAMES.LOGIN)
  }

  return (
    <>
      {showModal && <UpdatePresenceStatusModal setShowModal={setShowModal} />}
      <div className="flex h-full flex-0-0-80 flex-col items-center overflow-y-scroll bg-[#15161E] scrollbar-none">
        <header className="flex h-[90px] w-full flex-shrink-0 items-center justify-center border-b border-solid border-[#494949a9]">
          <UserAvatar
            user={user!}
            onClick={() => setShowModal(true)}
          />
        </header>
        <div className="flx h-full w-full flex-col items-center">
          {userSidebarItems.map((item) => (
            <UserSidebarItem
              key={item.id}
              item={item}
            />
          ))}
        </div>

        <footer className="py-[18px]">
          <ExitIcon
            className="h-8"
            onClick={() => logoutUser()}
          />
        </footer>
      </div>
    </>
  )
}
