import { useEffect, useState } from 'react'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'

enum ETheme {
  LIGHT = 'light',
  DARK = 'dark',
}

function ThemeSwitch() {
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const currentTheme = StorageService.get(storageKeys.THEME)
    return currentTheme === ETheme.DARK
  })

  const toggleTheme = () => {
    setDarkTheme((curr) => !curr)
  }

  useEffect(() => {
    document.body.classList.remove(ETheme.LIGHT, ETheme.DARK)
    document.body.classList.add(darkTheme ? ETheme.DARK : ETheme.LIGHT)

    StorageService.set(storageKeys.THEME, darkTheme ? ETheme.DARK : ETheme.LIGHT)
  }, [darkTheme])

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="flex">
        <label className="relative inline-flex items-center mr-5 cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={darkTheme}
            readOnly
          />
          <div
            onClick={toggleTheme}
            className="peer h-6 w-11 rounded-full bg-gray-200  after:absolute  after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"
          ></div>
        </label>
      </div>
    </div>
  )
}

export default ThemeSwitch
