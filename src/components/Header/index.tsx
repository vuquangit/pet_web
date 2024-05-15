import React from 'react'
import { useNavigate } from 'react-router-dom'

import NavigationApp from '@/components/Navigation'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { ROUTER_NAMES } from '@/constants/routerNames'
import { useAppDispatch, useAppSelector } from '@/store/hook'
import { resetCredentials } from '@/store/auth'
import LogoIcon from '@/assets/icons/logo.svg'
import ThemeSwitch from '../ThemeSwitch'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector((state) => !!state.auth.role)

  const handleLogout = () => {
    console.log('Logout')
    StorageService.set(storageKeys.AUTH_PROFILE, null)
    dispatch(resetCredentials())
    navigate(ROUTER_NAMES.LOGIN)
  }

  return (
    <header className="flex items-center justify-between border-b border-solid border-gray-300 bg-white px-5 py-3 shadow-xl dark:border-none dark:bg-[#282829] dark:text-white">
      <LogoIcon className="h-8" />

      {isAuthenticated && (
        <>
          <NavigationApp />
        </>
      )}

      <div className="flex">
        <ThemeSwitch />
        {isAuthenticated && (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
