import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import { RootState } from '@/store'
import { GroupMessageType, MessageType } from '@/interfaces/chat'
import { SelectedMessageContextMenu } from '@/components/context-menus/SelectedMessageContextMenu'
import { selectConversationMessage } from '@/store/messages'
import { selectGroupMessage } from '@/store/groupMessage'
import { selectType } from '@/store/selectedType'
import { MessageItemHeader } from './MessageItemHeader'
import { MessageItemContainerBody } from './MessageItemContainerBody'
import { useHandleClick } from '@/hooks/useHandleClick'
import { useKeydown } from '@/hooks/useKeydown'
import { UserAvatar } from '../users/UserAvatar'
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

export const MessageContainer = () => {
  const { id = '' } = useParams()
  const dispatch = useAppDispatch()
  const conversationMessages = useSelector((state: RootState) =>
    // selectConversationMessage(state, parseInt(id!)),
    selectConversationMessage(state, id),
  )
  const groupMessages = useSelector((state: RootState) => selectGroupMessage(state, parseInt(id!)))
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
        className="flex items-center gap-5 break-words py-[5px]"
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader && (
          <UserAvatar
            className={classNames({ 'order-2': isMyMessage })}
            user={message.author}
          />
        )}

        {showMessageHeader ? (
          <div className="flex-1">
            <MessageItemHeader
              user={user}
              message={message}
              isMyMessage={isMyMessage}
            />
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding="8px 0 0 0"
              isMyMessage={isMyMessage}
            />
          </div>
        ) : (
          <MessageItemContainerBody
            message={message}
            onEditMessageChange={onEditMessageChange}
            padding="0 0 0 70px"
            isMyMessage={isMyMessage}
          />
        )}
      </div>
    )
  }

  return (
    <div
      className="flex h-full flex-col-reverse overflow-y-scroll px-5 py-2.5"
      onScroll={(e) => {
        const node = e.target as HTMLDivElement
        const scrollTopMax = node.scrollHeight - node.clientHeight
        if (-scrollTopMax === node.scrollTop) {
          console.log('')
        }
      }}
    >
      <>
        <SystemMessageList />
        {selectedType === 'private'
          ? conversationMessages?.messages.map(mapMessages)
          : groupMessages?.messages.map(mapMessages)}
      </>
      {showContextMenu && <SelectedMessageContextMenu />}
    </div>
  )
}
