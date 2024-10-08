import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { getRecipientFromConversation } from '@/helpers'
import { Conversation } from '@/interfaces/chat'
import { useAppSelector } from '@/store/hook'
import { UserAvatar } from '@/components/users/UserAvatar'

type Props = {
  conversation: Conversation
}

export const ConversationSidebarItem: React.FC<Props> = ({ conversation }) => {
  const MESSAGE_LENGTH_MAX = 50
  const { id } = useParams()
  const user = useAppSelector((state) => state.auth.currentUser)
  const navigate = useNavigate()
  const recipient = getRecipientFromConversation(conversation, user)
  const lastMessageContent = () => {
    const { lastMessageSent } = conversation
    if (lastMessageSent && lastMessageSent.content)
      return lastMessageSent.content?.length >= MESSAGE_LENGTH_MAX
        ? lastMessageSent.content?.slice(0, MESSAGE_LENGTH_MAX).concat('...')
        : lastMessageSent.content
    return null
  }

  return (
    <div
      className={classNames(
        ':hover:bg-[#222] flex w-full cursor-pointer items-center gap-5',
        'justify-center px-6 py-2 screen-900:justify-start screen-900:px-8 screen-900:py-5',
        { 'bg-[#efefef] dark:bg-[#262626]': id === conversation.id },
      )}
      onClick={() => navigate(`/conversations/${conversation.id}`)}
    >
      <UserAvatar
        user={recipient}
        className="!h-[56px] !w-[56px]"
      />
      <div className="hidden flex-1 flex-col gap-1 break-all screen-900:flex">
        <span className="block text-[16px] font-medium text-[#1a1a1a] dark:text-white">
          {recipient?.name}
        </span>
        <span className="text-[16px] font-normal text-[#515151] dark:text-[#b3b3b3]">
          {lastMessageContent()}
        </span>
      </div>
    </div>
  )
}
