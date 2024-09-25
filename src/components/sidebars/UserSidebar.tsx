import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

import { userSidebarItems } from '@/constants/chat'
import { UserSidebarItem } from './items/UserSidebarItem'
import { UpdatePresenceStatusModal } from '@/components/modals/UpdatePresenceStatusModal'
import ExitIcon from '@/assets/icons/exit.svg'
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

      <div className="flex h-full w-full max-w-[72px] flex-col items-center overflow-y-scroll border-r border-solid border-[#dbdbdb] px-3 pb-5 pt-2 scrollbar-none dark:border-[#262626] xl:max-w-[244px]">
        <div className="mb-6 mt-3 flex w-full items-center justify-center p-3 xl:justify-start">
          <Link
            to={ROUTER_NAMES.HOME}
            className="flex items-center gap-4"
          >
            <LogoIcon className="h-6 fill-icon-dark dark:fill-icon-light" />
            <span className="hidden flex-1 text-[20px] font-bold text-[#f5f5f5] xl:block">
              Pet Island
            </span>
          </Link>
        </div>

        <div className="flex w-full flex-1 flex-col items-start">
          {userSidebarItems.map((item) => (
            <UserSidebarItem
              key={item.id}
              item={item}
            />
          ))}

          <Tooltip
            id="sidebar-tooltip"
            style={{
              fontSize: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              color: '#222',
              borderRadius: '8px',
            }}
            className="block xl:hidden"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-3 py-[18px]">
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
