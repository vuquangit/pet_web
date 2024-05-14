import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'

import '@/styles/index.scss'
import '@/styles/tailwind.scss'

import router from '@/router'
import useProfile from '@/hooks/useProfile'
import LoadingPage from '@/components/LoadingPage'

const App: React.FC = () => {
  const { fetchProfile } = useProfile()

  useEffect(() => {
    fetchProfile()
  }, [])

  return (
    <>
      <RouterProvider
        router={router}
        fallbackElement={<LoadingPage />}
      />
    </>
  )
}

export default App
