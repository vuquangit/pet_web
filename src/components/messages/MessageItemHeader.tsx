import React, { FC } from 'react'
import { formatRelative } from 'date-fns'
import classNames from 'classnames'

import { GroupMessageType, MessageType } from '@/interfaces/chat'
import { IAuthMe } from '@/interfaces/auth'

type Props = {
  message: MessageType | GroupMessageType
  isMyMessage: boolean
  user: IAuthMe
}

export const MessageItemHeader: FC<Props> = ({ message, isMyMessage, user }) => {
  return (
    <div
      className={classNames('flex items-center gap-4', {
        'justify-end': isMyMessage,
      })}
    >
      <span
        className={classNames('text-[16px] font-medium', {
          'order-2': isMyMessage,
        })}
        style={{
          color: user?.id === message.author.id ? '#989898' : '#5E8BFF',
        }}
      >
        {/* {message.author.firstName} {message.author.lastName} */}
        {message.author.name}
      </span>
      <span className="text-[14px] font-bold text-[#6d6d6d]">
        {formatRelative(new Date(message.createdAt), new Date())}
      </span>
    </div>
  )
}
