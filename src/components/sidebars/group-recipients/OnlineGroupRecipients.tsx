import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import CrowIcon from '@/assets/icons/crown.svg'
import { ContextMenuEvent, Group } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'
import { IUser } from '@/interfaces/user'

type Props = {
  users: IUser[]
  group?: Group
  onUserContextMenu: (e: ContextMenuEvent, user: IUser) => void
}

export const OnlineGroupRecipients: FC<Props> = ({ users, group, onUserContextMenu }) => {
  const formatStatusMessage = ({ presence }: IUser) => {
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
          onContextMenu={(e) => onUserContextMenu(e, user)}
        >
          <Link
            className="flex items-center gap-[14px]"
            to={`/profile/${user.id}`}
          >
            <UserAvatar user={user} />
            <div className="flex flex-col text-[#636363] dark:text-white">
              <span>{user.name}</span>
              <span className="text-[12px] font-medium text-[#929292] dark:text-white">
                {formatStatusMessage(user)}
              </span>
            </div>
          </Link>
          {user.id === group?.owner.id && (
            <CrowIcon
              className="h-6 dark:text-white"
              color="#ffbf00"
            />
          )}
        </div>
      ))}
    </>
  )
}
