import React, { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { CallSidebarItem } from '@/components/calls/CallSidebarItem'

export const CallsSidebar = () => {
  const { friends } = useSelector((state: RootState) => state.friends)
  return (
    <div className="flex-0 md:w-[calc(100% - 80px)] flex h-full w-[400px] flex-auto flex-col">
      <header className="flex h-[90px] flex-shrink-0 items-center gap-[20px] border-b border-solid border-[#49494925] px-8 py-2.5">
        Friends
      </header>
      <div className="flex h-full w-full flex-col items-center">
        {friends.map((friend) => (
          <CallSidebarItem
            key={friend.id}
            friend={friend}
          />
        ))}
      </div>
    </div>
  )
}
