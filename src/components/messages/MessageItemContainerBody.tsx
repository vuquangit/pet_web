import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Tooltip } from 'react-tooltip'
import { formatRelative } from 'date-fns'

import { RootState } from '@/store'
import { GroupMessageType, MessageType } from '@/interfaces/chat'
import { MessageItemAttachmentContainer } from './attachments/MessageItemAttachmentContainer'
import { EditMessageContainer } from './EditMessageContainer'

type Props = {
  message: MessageType | GroupMessageType
  onEditMessageChange: (value: string) => void
  padding: string
  isMyMessage: boolean
}

export const MessageItemContainerBody: FC<Props> = ({
  message,
  isMyMessage,
  onEditMessageChange,
  padding,
}) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer,
  )

  const messageItemContentStyle = classNames(
    'w-full whitespace-pre-wrap text-[#000] dark:text-white',
    {
      'text-end': isMyMessage,
    },
  )

  if (isEditingMessage && message.id === messageBeingEdited?.id) {
    return (
      <div
        className={messageItemContentStyle}
        style={{ padding }}
      >
        <EditMessageContainer onEditMessageChange={onEditMessageChange} />
      </div>
    )
  }

  return (
    <div
      className={messageItemContentStyle}
      style={{ padding }}
    >
      <div
        className={classNames('inline-block rounded-[18px] px-4 py-[7px]', {
          'bg-[#efefef] dark:bg-[#262626]': !isMyMessage,
          'bg-[#3797f0]': isMyMessage,
        })}
        data-tooltip-id="my-message-tooltip"
        data-tooltip-content={formatRelative(new Date(message.createdAt), new Date())}
        data-tooltip-place={isMyMessage ? 'left' : 'right'}
      >
        <span>{message.content || null}</span>
      </div>

      <Tooltip
        id="my-message-tooltip"
        style={{
          fontSize: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          color: '#222',
          borderRadius: '8px',
        }}
      />

      <MessageItemAttachmentContainer message={message} />
    </div>
  )
}
