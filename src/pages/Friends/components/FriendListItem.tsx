import React, { FC } from 'react'
import classNames from 'classnames'

import { ContextMenuEvent, Friend } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'
import EllipseVerticalIcon from '@/assets/icons/ellipsis-vertical.svg'
import { Button } from '@/components/Form'
import { useAppSelector } from '@/store/hook'

type Props = {
  friend: Friend
  online: boolean
  onContextMenu: (e: ContextMenuEvent, friend: Friend) => void
}

export const FriendListItem: FC<Props> = ({ friend, online, onContextMenu }) => {
  const user = useAppSelector((state) => state.auth.currentUser)

  const friendUserInstance = user?.id === friend.sender.id ? friend.receiver : friend.sender

  return (
    <div
      className={classNames(
        ':last:border-b-unset flex cursor-pointer items-center justify-between gap-5 px-3 py-2',
        { ':hover:opacity-80 opacity-20': !online },
      )}
      onContextMenu={(e) => onContextMenu(e, friend)}
    >
      <div className="flex items-center gap-5">
        <UserAvatar user={friendUserInstance} />

        <div className="flex flex-col gap-1">
          <span className="text-[18px] font-medium">{friendUserInstance.name}</span>
          {online && (
            <span className="text-sm text-[#00ff00]">
              {friendUserInstance.presence?.statusMessage}
            </span>
          )}
        </div>
      </div>

      <div>
        <Button type="text">
          <EllipseVerticalIcon className="h-5 dark:fill-white" />
        </Button>
      </div>
    </div>
  )
}
