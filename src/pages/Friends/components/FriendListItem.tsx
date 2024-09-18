import React, { FC, useContext } from 'react'

import { AuthContext } from '@/context/AuthContext'
import { ContextMenuEvent, Friend } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  friend: Friend
  online: boolean
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void
}

export const FriendListItem: FC<Props> = ({ friend, online, onContextMenu }) => {
  const { user } = useContext(AuthContext)

  const friendUserInstance = user?.id === friend.sender.id ? friend.receiver : friend.sender

  return (
    <div
      className=":last:border-b-unset flex items-center gap-[20px] border border-b border-solid border-[#181818] px-[14px]"
      onContextMenu={(e) => onContextMenu(e, friend)}
      style={{ opacity: !online ? '0.2' : '1' }}
    >
      <UserAvatar user={friendUserInstance} />
      <div className="flex flex-col gap-1">
        <span className="text-[18px] font-medium">{friendUserInstance.username}</span>
        {online && (
          <span className="text-[14px] text-[#00ff00]">
            {friendUserInstance.presence?.statusMessage}
          </span>
        )}
      </div>
    </div>
  )
}
