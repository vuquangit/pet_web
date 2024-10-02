import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { camelizeKeys } from 'humps'

import { MessagePanel } from '@/components/messages'
import { SocketContext } from '@/context/SocketContext'
import { AppDispatch } from '@/store'
import { editMessage } from '@/store/messages'
import useMessages from '@/hooks/useMessage'
import { MessageType } from '@/interfaces/chat'

export const ConversationChannelPage = () => {
  const { id = '' } = useParams()
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout>>()
  const [isTyping, setIsTyping] = useState(false)
  const [isRecipientTyping, setIsRecipientTyping] = useState(false)
  const { handleFetchMessages } = useMessages()

  useEffect(() => {
    handleFetchMessages(id)
  }, [id])

  useEffect(() => {
    const conversationId = id
    socket.emit('onConversationJoin', { conversationId })
    socket.on('userJoin', () => {
      console.log('userJoin')
    })
    socket.on('userLeave', () => {
      console.log('userLeave')
    })
    socket.on('onTypingStart', () => {
      console.log('onTypingStart: User has started typing...')
      setIsRecipientTyping(true)
    })
    socket.on('onTypingStop', () => {
      console.log('onTypingStop: User has stopped typing...')
      setIsRecipientTyping(false)
    })
    socket.on('onMessageUpdate', (messageRaw: MessageType) => {
      const message = camelizeKeys(messageRaw) as MessageType

      console.log('onMessageUpdate received', message)
      dispatch(editMessage(message))
    })

    return () => {
      socket.emit('onConversationLeave', { conversationId })
      socket.off('userJoin')
      socket.off('userLeave')
      socket.off('onTypingStart')
      socket.off('onTypingStop')
      socket.off('onMessageUpdate')
    }
  }, [id])

  const sendTypingStatus = () => {
    if (isTyping) {
      clearTimeout(timer)
      setTimer(
        setTimeout(() => {
          console.log('User stopped typing')
          socket.emit('onTypingStop', { conversationId: id })
          setIsTyping(false)
        }, 2000),
      )
    } else {
      setIsTyping(true)
      socket.emit('onTypingStart', { conversationId: id })
    }
  }

  return (
    <div className="w-full h-full">
      <MessagePanel
        sendTypingStatus={sendTypingStatus}
        isRecipientTyping={isRecipientTyping}
      ></MessagePanel>
    </div>
  )
}
