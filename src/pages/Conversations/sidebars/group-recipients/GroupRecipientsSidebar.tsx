import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '@/store'
import { selectGroupById } from '@/store/group'
import { SocketContext } from '@/context/SocketContext'
import { User } from '@/interfaces/chat'
import {
  setContextMenuLocation,
  setSelectedUser,
  toggleContextMenu,
} from '@/store/groupRecipientsSidebar'
import { SelectedParticipantContextMenu } from '@/components/context-menus/SelectedParticipantContextMenu'
import { OnlineGroupRecipients } from './OnlineGroupRecipients'
import { OfflineGroupRecipients } from './OfflineGroupRecipients'

export const GroupRecipientsSidebar = () => {
  const { id: groupId = '' } = useParams()

  const [onlineUsers, setOnlineUsers] = useState<User[]>([])

  const dispatch = useDispatch<AppDispatch>()
  const socket = useContext(SocketContext)
  const group = useSelector((state: RootState) => selectGroupById(state, groupId))
  const groupSidebarState = useSelector((state: RootState) => state.groupSidebar)

  useEffect(() => {
    const handleClick = () => dispatch(toggleContextMenu(false))
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [groupId])

  useEffect(() => {
    socket.emit('getOnlineGroupUsers', { groupId })
    const interval = setInterval(() => {
      socket.emit('getOnlineGroupUsers', { groupId })
    }, 5000)
    socket.on('onlineGroupUsersReceived', (payload) => {
      console.log('received onlineGroupUsersReceived event')
      console.log(payload)
      setOnlineUsers(payload.onlineUsers)
    })
    return () => {
      console.log('Clearing Interval for GroupRecipientsSidebar')
      clearInterval(interval)
      socket.off('onlineGroupUsersReceived')
    }
  }, [group, groupId])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleResize = (e: UIEvent) => dispatch(toggleContextMenu(false))
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const onUserContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, user: User) => {
    e.preventDefault()
    dispatch(toggleContextMenu(true))
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }))
    dispatch(setSelectedUser(user))
  }

  return (
    <aside className="flex h-full w-[350px] flex-auto flex-col bg-[#111]">
      <div className="flex h-[90px] w-full flex-shrink-0 items-center gap-[20px] border-b border-solid border-[#49494925] px-8 py-2.5">
        <span className="text-[20px] font-medium">Participants</span>
      </div>
      <div className="min-h-0 flex-auto overflow-y-auto pl-8 pt-8 text-[#000] scrollbar-none">
        <span>Online Users</span>
        <OnlineGroupRecipients
          users={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        <span>Offline Users</span>
        <OfflineGroupRecipients
          onlineUsers={onlineUsers}
          group={group}
          onUserContextMenu={onUserContextMenu}
        />
        {groupSidebarState.showUserContextMenu && (
          <SelectedParticipantContextMenu points={groupSidebarState.points} />
        )}
      </div>
    </aside>
  )
}
