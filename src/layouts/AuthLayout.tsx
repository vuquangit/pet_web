import { Outlet } from 'react-router-dom'
import Header from '@/components/Header'

function AuthLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}

export default AuthLayout
