import React, { FC } from 'react'
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
      {!isMyMessage && (
        <span
          className={classNames('text-[16px] font-medium text-[#5E8BFF]', {
            'text-[#989898]': user?.id !== message.author.id,
          })}
        >
          {message.author.name}
        </span>
      )}
    </div>
  )
}
