import { ROUTER_NAMES } from '@/constants/routerNames'
import React from 'react'
import { Link } from 'react-router-dom'

interface Navigation {
  label: string
  path: string
}

const NavigationApp: React.FC = () => {
  const navList: Navigation[] = [
    {
      label: 'Home',
      path: ROUTER_NAMES.HOME,
    },
    {
      label: 'React 19',
      path: ROUTER_NAMES.REACT,
    },
  ]

  return (
    <nav>
      <ul className="flex gap-3">
        {navList.map((item) => (
          <li
            key={item.path}
            className="px-2"
          >
            <Link
              to={item.path}
              className="cursor-pointer text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavigationApp
