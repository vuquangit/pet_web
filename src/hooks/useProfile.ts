import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { useLazyGetProfileQuery } from '@/services/auth'

const useProfile = () => {
  const [getProfile] = useLazyGetProfileQuery()

  const fetchProfile = async () => {
    const tokens = StorageService.get(storageKeys.AUTH_PROFILE)?.accessToken
    if (!tokens) return

    try {
      await getProfile().unwrap()
    } catch (error) {
      console.log('fetch profile error', error)
    }
  }

  return { fetchProfile }
}

export default useProfile
