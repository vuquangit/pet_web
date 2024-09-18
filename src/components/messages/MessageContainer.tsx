import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '@/store'
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
// import { MessageContainerStyle, MessageItemContainer, MessageItemDetails } from '../../utils/styles'
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

export const MessageContainer = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const conversationMessages = useSelector((state: RootState) =>
    // selectConversationMessage(state, parseInt(id!)),
    selectConversationMessage(state, id),
  )
  const groupMessages = useSelector((state: RootState) => selectGroupMessage(state, parseInt(id!)))
  const selectedType = useSelector((state: RootState) => selectType(state))
  const { showContextMenu } = useSelector((state: RootState) => state.messageContainer)
  const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && dispatch(setIsEditing(false))
  const handleClick = () => dispatch(toggleContextMenu(false))

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
    return (
      <div
        key={message.id}
        className="flex items-center gap-5 break-words py-[5px]"
        onContextMenu={(e) => onContextMenu(e, message)}
      >
        {showMessageHeader && <UserAvatar user={message.author} />}
        {showMessageHeader ? (
          <div className="flex-1">
            <MessageItemHeader message={message} />
            <MessageItemContainerBody
              message={message}
              onEditMessageChange={onEditMessageChange}
              padding="8px 0 0 0"
            />
          </div>
        ) : (
          <MessageItemContainerBody
            message={message}
            onEditMessageChange={onEditMessageChange}
            padding="0 0 0 70px"
          />
        )}
      </div>
    )
  }

  return (
    <div
      className="flex h-full flex-col-reverse overflow-y-scroll py-2.5"
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
