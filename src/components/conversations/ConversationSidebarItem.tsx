import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from 'classnames'

import { CDN_URL } from '@/enums/chat'
import { AuthContext } from '@/context/AuthContext'
import { getRecipientFromConversation } from '@/helpers'
import { Conversation } from '@/interfaces/chat'
import defaultAvatar from '@/assets/images/default_avatar.jpg'

type Props = {
  conversation: Conversation
}

export const ConversationSidebarItem: React.FC<Props> = ({ conversation }) => {
  const MESSAGE_LENGTH_MAX = 50
  const { id } = useParams()
  const { user } = useContext(AuthContext)
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

  const hasProfilePicture = () => recipient?.profile?.avatar

  return (
    <>
      <div
        className={classNames(
          ':hover:bg-[#222] flex w-full cursor-pointer items-center gap-5 px-8 py-5',
          { 'bg-[#1a1a1a]': id === conversation.id },
        )}
        onClick={() => navigate(`/conversations/${conversation.id}`)}
      >
        <img
          src={
            hasProfilePicture()
              ? CDN_URL.BASE.concat(recipient?.profile?.avatar || '')
              : defaultAvatar
          }
          alt="avatar"
          className="bg-[rgb(49, 100, 255)] h-[56px] w-[56px] rounded-[50%]"
        />
        <div className="flex flex-1 flex-col gap-1 break-all">
          <span className="block text-[16px] font-medium text-[#1a1a1a]">
            {`${recipient?.firstName} ${recipient?.lastName}`}
          </span>
          <span className="text-[16px] font-normal text-[#515151]">{lastMessageContent()}</span>
        </div>
      </div>
    </>
  )
}
