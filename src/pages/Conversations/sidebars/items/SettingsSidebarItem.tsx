import React, { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { getSettingSidebarIcon } from '@/helpers'
// import { SettingsSidebarItemStyle } from '../../../utils/styles/settings';
import { SettingsItemType } from '@/interfaces/chat'
import classNames from 'classnames'

type Props = {
  item: SettingsItemType
}

export const SettingsSidebarItem: FC<Props> = ({ item }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const Icon = getSettingSidebarIcon(item.id)
  // const ICON_SIZE = 30;
  const STROKE_WIDTH = 2

  return (
    <div
      className="cursor-pointer px-6 py-2.5"
      onClick={() => navigate(item.pathname)}
      // isActive={item.pathname === pathname}
    >
      <div
        className={classNames('flex select-none items-center gap-2.5 rounded-[8px] p-3.5', {
          'bg-[#070707]': item.pathname === pathname,
        })}
      >
        <Icon
          className="h-8"
          strokeWidth={STROKE_WIDTH}
        />
        <span>{item.label}</span>
      </div>
    </div>
  )
}
