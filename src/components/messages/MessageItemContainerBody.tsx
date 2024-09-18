import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
// import { MessageItemContent } from '../../utils/styles';
import { GroupMessageType, MessageType } from '@/interfaces/chat'
import { MessageItemAttachmentContainer } from './attachments/MessageItemAttachmentContainer'
import { EditMessageContainer } from './EditMessageContainer'
import classNames from 'classnames'

type Props = {
  message: MessageType | GroupMessageType
  onEditMessageChange: (value: string) => void
  padding: string
}

export const MessageItemContainerBody: FC<Props> = ({ message, onEditMessageChange, padding }) => {
  const { isEditingMessage, messageBeingEdited } = useSelector(
    (state: RootState) => state.messageContainer,
  )

  const messageItemContentStyle = classNames('w-full whitespace-pre-wrap text-[#000]')

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
