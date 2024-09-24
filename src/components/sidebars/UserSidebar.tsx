import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
import ThemeSwitch from '../ThemeSwitch'
import LogoIcon from '@/assets/icons/logo.svg'

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

      <div className="flex h-full flex-0-0-80 flex-col items-center overflow-y-scroll px-5 pb-3 pt-2 scrollbar-none">
        <div className="mb-6 mt-3 flex items-center justify-center p-3">
          <Link to={ROUTER_NAMES.HOME}>
            <LogoIcon className="h-6 fill-icon-dark dark:fill-icon-light" />
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center">
          {userSidebarItems.map((item) => (
            <UserSidebarItem
              key={item.id}
              item={item}
            />
          ))}

          <div className="my-1 p-3">
            <UserAvatar
              user={user}
              onClick={() => setShowModal(true)}
              className="!h-6 !w-6"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 py-[18px]">
          <div className="p-3">
            <ThemeSwitch />
          </div>

          <div className="p-3">
            <ExitIcon
              className="h-6 cursor-pointer fill-icon-dark dark:fill-icon-light"
              onClick={() => logoutUser()}
            />
          </div>
        </div>
      </div>
    </>
  )
}
