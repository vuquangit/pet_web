import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

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

  return (
    <>
      {isEditingMessage && message.id === messageBeingEdited?.id ? (
        <div
          className={messageItemContentStyle}
          style={{ padding }}
        >
          <EditMessageContainer onEditMessageChange={onEditMessageChange} />
        </div>
      ) : (
        <div
          className={messageItemContentStyle}
          style={{ padding }}
        >
          {message.content || null}
          <MessageItemAttachmentContainer message={message} />
        </div>
      )}
    </>
  )
}
