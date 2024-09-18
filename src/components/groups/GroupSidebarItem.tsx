import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { CDN_URL } from '@/enums/chat'
// import { ConversationSidebarItemStyle } from '../../utils/styles';
import { ContextMenuEvent, Group } from '@/interfaces/chat'
// import { PeopleGroup } from 'akar-icons';
import UsersIcon from '@/assets/icons/users.svg'

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
      const usersToString = group.users.map((user) => user.firstName).join(', ')
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
        { 'bg-[#1a1a1a]': id === group.id },
      )}
      onClick={() => navigate(`/groups/${group.id}`)}
      onContextMenu={(e) => onContextMenu(e, group)}
    >
      {group.avatar ? (
        <img
          src={CDN_URL.BASE.concat(group.avatar)}
          alt="avatar"
          className="h-[56px] w-[56px] rounded-[50%]"
        />
      ) : (
        <div className="bg-[rgb(36, 36, 36)] flex h-[56px] w-[56px] items-center justify-center rounded-[50%]">
          <UsersIcon className="h-[28px]" />
        </div>
      )}
      <div>
        <span className="title">{getTransformedTitle()}</span>
        <span className="text-[rgb(163, 163, 163)] text-[14px]">
          {group.lastMessageSent?.content}
        </span>
      </div>
    </div>
  )
}
