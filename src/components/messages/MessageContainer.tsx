import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

import { RootState } from '@/store'
import { GroupMessageType, MessageType, User } from '@/interfaces/chat'
import { SelectedMessageContextMenu } from '@/components/context-menus/SelectedMessageContextMenu'
import { selectConversationMessage } from '@/store/messages'
import { selectGroupMessage } from '@/store/groupMessage'
import { selectType } from '@/store/selectedType'
import { MessageItemContainerBody } from './MessageItemContainerBody'
import { useHandleClick } from '@/hooks/useHandleClick'
import { useKeydown } from '@/hooks/useKeydown'
import { UserAvatar } from '@/components/users/UserAvatar'
import {
  editMessageContent,
  resetMessageContainer,
  setContextMenuLocation,
  setIsEditing,
  setSelectedMessage,
  toggleContextMenu,
} from '@/store/messageContainer'
// import { SystemMessage } from './system/SystemMessage'
import { SystemMessageList } from './system/SystemMessageList'
import { useAppSelector, useAppDispatch } from '@/store/hook'

type Props = {
  isRecipientTyping: boolean
  recipient: User | undefined
}

export const MessageContainer: FC<Props> = ({ isRecipientTyping, recipient }) => {
  const { id = '' } = useParams()
  const dispatch = useAppDispatch()
  const conversationMessages = useSelector((state: RootState) =>
    selectConversationMessage(state, id),
  )
  const groupMessages = useSelector((state: RootState) => selectGroupMessage(state, id))
  const selectedType = useSelector((state: RootState) => selectType(state))
  const { showContextMenu } = useSelector((state: RootState) => state.messageContainer)
  const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditing(false))
  const handleClick = () => dispatch(toggleContextMenu(false))
  const user = useAppSelector((state: RootState) => state.auth)

  useKeydown(handleKeydown, [id])
  useHandleClick(handleClick, [id])

  useEffect(() => {
    return () => {
      dispatch(resetMessageContainer())
    }
  }, [id])

  const onContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    message: MessageType | GroupMessageType,
  ) => {
    e.preventDefault()
    dispatch(toggleContextMenu(true))
    dispatch(setContextMenuLocation({ x: e.pageX, y: e.pageY }))
    dispatch(setSelectedMessage(message))
  }

  const onEditMessageChange = (value: string) => dispatch(editMessageContent(value))

  const mapMessages = (
    message: MessageType | GroupMessageType,
    index: number,
    messages: MessageType[] | GroupMessageType[],
  ) => {
    const currentMessage = messages[index]
    const nextMessage = messages[index + 1]
    const showMessageHeader =
      messages.length === index + 1 || currentMessage.author.id !== nextMessage.author.id
    const isMyMessage = message.author.id === user.id

    return (
      <div
        key={message.id}
        className="flex items-center gap-2 break-words"
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader && !isMyMessage && (
          <>
            <UserAvatar
              user={message.author}
              className="!h-7 !w-7"
              data-tooltip-id="avatar-tooltip"
              data-tooltip-content={message.author.name}
            />

            <Tooltip
              id="avatar-tooltip"
              style={{
                fontSize: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                color: '#222',
                borderRadius: '8px',
              }}
            />
          </>
        )}

        <MessageItemContainerBody
          message={message}
          onEditMessageChange={onEditMessageChange}
          padding={showMessageHeader ? '0' : '0 0 0 38px'}
          isMyMessage={isMyMessage}
        />
      </div>
    )
  }

  return (
    <div
      className="scrollbar-custom flex h-full flex-col-reverse gap-1.5 overflow-y-scroll px-5 py-2.5"
      onScroll={(e) => {
        const node = e.target as HTMLDivElement
        const scrollTopMax = node.scrollHeight - node.clientHeight
        if (-scrollTopMax === node.scrollTop) {
          console.log('')
        }
      }}
    >
      <div className="mt-1 w-full border-none bg-inherit pl-[38px] text-[14px] outline-none dark:text-[#bababa]">
        {isRecipientTyping ? `${recipient !== undefined && recipient?.name} is typing...` : ''}
      </div>

      <SystemMessageList />

      {selectedType === 'private'
        ? conversationMessages?.messages.map(mapMessages)
        : groupMessages?.messages.map(mapMessages)}

      {showContextMenu && <SelectedMessageContextMenu />}
    </div>
  )
}
