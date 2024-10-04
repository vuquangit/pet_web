import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { ContextMenuEvent, Group } from '@/interfaces/chat'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  group: Group
  onContextMenu: (event: ContextMenuEvent, group: Group) => void
}

export const GroupSidebarItem: React.FC<Props> = ({ group, onContextMenu }) => {
  const { id } = useParams()
  const MAX_TITLE_LENGTH = 20
  // const MAX_MESSAGE_LENGTH = 50;
  const navigate = useNavigate()

  const getTransformedTitle = () => {
    if (!group.title) {
      const usersToString = group.users.map((user) => user.name).join(', ')
      return usersToString.length > MAX_TITLE_LENGTH
        ? usersToString.slice(0, MAX_TITLE_LENGTH).concat('...')
        : usersToString
    }
    return group.title.length > MAX_TITLE_LENGTH
      ? group.title.slice(0, MAX_TITLE_LENGTH).concat('...')
      : group.title
  }

  return (
    <div
      className={classNames(
        ':hover:bg-[#222] flex w-full cursor-pointer items-center gap-5 px-8 py-5',
        { 'bg-[#efefef] dark:bg-[#262626]': id === group.id },
      )}
      onClick={() => navigate(`/groups/${group.id}`)}
      onContextMenu={(e) => onContextMenu(e, group)}
    >
      <UserAvatar
        src={group.avatar}
        className="!h-[56px] !w-[56px]"
      />
      <div className="flex-col hidden screen-900:flex">
        <span className="title">{getTransformedTitle()}</span>
        <span className="text-[rgb(163, 163, 163)] text-sm">{group.lastMessageSent?.content}</span>
      </div>
    </div>
  )
}
