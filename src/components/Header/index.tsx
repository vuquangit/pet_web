import { useNavigate } from 'react-router-dom'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { ROUTER_NAMES } from '@/constants/routerNames'

const Header: React.FC = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log('Logout')
    StorageService.set(storageKeys.AUTH_PROFILE, null)
    navigate(ROUTER_NAMES.LOGIN)
  }

  return (
    <header className="flex items-center justify-between bg-white px-5 py-2.5">
      <span>Header</span>
      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header
