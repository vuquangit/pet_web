import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import CrowIcon from '@/assets/icons/crown.svg'
import { Group, User } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  onlineUsers: User[]
  group?: Group
  onUserContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, user: User) => void
}

export const OfflineGroupRecipients: FC<Props> = ({ onlineUsers, group, onUserContextMenu }) =>
  group?.users
    .filter((user) => !onlineUsers.find((onlineUser) => onlineUser.id === user.id))
    .map((user) => (
      <div
        key={user.id}
        className="my-2.5 flex items-center gap-2.5 text-[18px] font-medium"
        onContextMenu={(e) => onUserContextMenu(e, user)}
      >
        <Link to={`/profile/${user.id}`} className="flex items-center gap-[14px] dark:text-white">
          <UserAvatar user={user} />
          <span className="text-[#000] dark:text-white">{user.name}</span>
        </Link>

        {user.id === group?.owner.id && <CrowIcon className="h-6 fill-[#ffbf00]" />}
      </div>
    ))
