import React, { FC, useContext } from 'react'
import { formatRelative } from 'date-fns'

import { AuthContext } from '@/context/AuthContext'
// import { MessageItemHeaderContainer } from '../../utils/styles';
import { GroupMessageType, MessageType } from '@/interfaces/chat'

type Props = {
  message: MessageType | GroupMessageType
}

export const MessageItemHeader: FC<Props> = ({ message }) => {
  const { user } = useContext(AuthContext)
  return (
    <div className="flex items-center gap-4">
      <span
        className="text-[16px] font-medium"
        style={{
          color: user?.id === message.author.id ? '#989898' : '#5E8BFF',
        }}
      >
        {message.author.firstName} {message.author.lastName}
      </span>
      <span className="text-[14px] font-bold text-[#6d6d6d]">
        {formatRelative(new Date(message.createdAt), new Date())}
      </span>
    </div>
  )
}
