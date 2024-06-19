import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import '@/styles/index.scss'
import '@/styles/tailwind.scss'
import 'react-toastify/dist/ReactToastify.css'

import router from '@/router'
import useProfile from '@/hooks/useProfile'
import LoadingPage from '@/components/LoadingPage'
import { currentTheme } from '@/store/theme'
import { useAppSelector } from '@/store/hook'

const App: React.FC = () => {
  const { fetchProfile } = useProfile()
  const theme = useAppSelector(currentTheme)
  const isProfileFetched = useAppSelector((state) => !!state.auth.role)

  useEffect(() => {
    if (isProfileFetched) return
    fetchProfile()
  }, [])

  return (
    <div className="app h-full">
      <RouterProvider
        router={router}
        fallbackElement={<LoadingPage />}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme={theme}
      />
    </div>
  )
}

export default App
