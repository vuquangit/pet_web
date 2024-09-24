import React from 'react'
import { settingsItems } from '@/constants/chat'
import { SettingsSidebarItem } from '../items/SettingsSidebarItem'

export const SettingsSidebar = () => {
  return (
    <aside className="flex h-full w-[300px] flex-auto-0 flex-col bg-[#111111]">
      <header className="w-full p-[36px] font-medium">
        <span className="text-[20px]">Settings</span>
      </header>
      <div>
        {settingsItems.map((item) => (
          <SettingsSidebarItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </aside>
  )
}
