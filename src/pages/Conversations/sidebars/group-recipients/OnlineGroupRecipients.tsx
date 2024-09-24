import React, { FC } from 'react'

// import { Crown } from 'akar-icons';
import CrowIcon from '@/assets/icons/crown.svg'
// import { GroupRecipientSidebarItem } from '../../../utils/styles';
import { ContextMenuEvent, Group, User } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  users: User[]
  group?: Group
  onUserContextMenu: (e: ContextMenuEvent, user: User) => void
}

export const OnlineGroupRecipients: FC<Props> = ({ users, group, onUserContextMenu }) => {
  const formatStatusMessage = ({ presence }: User) => {
    if (!presence || !presence.statusMessage) return null
    const { statusMessage } = presence
    return statusMessage.length > 30 ? statusMessage.slice(0, 30).concat('...') : statusMessage
  }

  return (
    <>
      {users.map((user) => (
        <div
          key={user.id}
          className="my-2.5 flex items-center gap-2.5 text-[18px] font-medium"
          // online={true}
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <div className="flex items-center gap-[14px]">
            <UserAvatar user={user} />
            <div className="flex flex-col text-[#636363]">
              <span>{user.name}</span>
              <span className="text-[12px] font-medium text-[#929292]">
                {formatStatusMessage(user)}
              </span>
            </div>
          </div>
          {user.id === group?.owner.id && <CrowIcon color="#ffbf00" />}
        </div>
      ))}
    </>
  )
}