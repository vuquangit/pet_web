import React, { FC } from 'react'

// import { Crown } from 'akar-icons';
import CrowIcon from '@/assets/icons/crown.svg'
// import { GroupRecipientSidebarItem } from '../../../utils/styles';
import { Group, User } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  onlineUsers: User[]
  group?: Group
  onUserContextMenu: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, user: User) => void
}

export const OfflineGroupRecipients: FC<Props> = ({ onlineUsers, group, onUserContextMenu }) => (
  <>
    {group?.users
      .filter((user) => !onlineUsers.find((onlineUser) => onlineUser.id === user.id))
      .map((user) => (
        <div
          key={user.id}
          className="my-2.5 flex items-center gap-2.5 text-[18px] font-medium opacity-20"
          // online={false}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <div className="flex items-center gap-[14px]">
            <UserAvatar user={user} />
            <span>{user.firstName}</span>
          </div>
          {user.id === group?.owner.id && <CrowIcon color="#ffbf00" />}
        </div>
      ))}
  </>
)
