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

      <div className="flex h-[50px] w-full flex-row items-center overflow-y-scroll border-t border-solid border-[#dbdbdb] scrollbar-none dark:border-[#262626] md:h-full md:max-w-[72px] md:flex-col md:border-r md:px-3 md:pb-5 md:pt-2 xl:max-w-[244px]">
        <div className="mb-6 mt-3 hidden w-full items-center justify-center p-3 md:flex xl:justify-start">
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

        <div className="flex w-full flex-1 justify-evenly md:flex-col md:justify-start">
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

        <div className="hidden w-full items-center gap-3 py-[18px] md:flex md:flex-col">
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
