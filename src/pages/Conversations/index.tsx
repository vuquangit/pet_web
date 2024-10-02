import React, { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useParams } from 'react-router-dom'
import { camelizeKeys } from 'humps'

import { ConversationPanel } from '@/components/conversations/ConversationPanel'
import { ConversationSidebar } from '@/components/sidebars/ConversationSidebar'
import { AppDispatch } from '@/store'
import { addMessage, deleteMessage } from '@/store/messages'
import { updateType } from '@/store/selectedType'
import { SocketContext } from '@/context/SocketContext'
import { Conversation, DeleteMessageResponse, MessageEventPayload } from '@/interfaces/chat'
import { addConversation, updateConversation } from '@/store/conversations'
import useConversations from '@/hooks/useConversations'

export function ConversationPage() {
  const { id } = useParams()

  const dispatch = useDispatch<AppDispatch>()
  const socket = useContext(SocketContext)
  const { fetchConversations } = useConversations()

  useEffect(() => {
    dispatch(updateType('private'))
    fetchConversations()
  }, [])

  useEffect(() => {
    socket.on('onMessage', (payloadRaw: MessageEventPayload) => {
      // console.log('Message Received', payloadRaw)
      const payload = camelizeKeys(payloadRaw) as MessageEventPayload
      dispatch(addMessage(payload))
      dispatch(updateConversation(payload.conversation))
    })
    socket.on('onConversation', (payloadRaw: Conversation) => {
      const payload = camelizeKeys(payloadRaw) as Conversation

      console.log('Received onConversation Event', payload)
      dispatch(addConversation(payload))
    })
    socket.on('onMessageDelete', (payloadRaw) => {
      const payload = camelizeKeys(payloadRaw) as DeleteMessageResponse

      console.log('Message Deleted', payload)
      dispatch(deleteMessage(payload))
    })
    return () => {
      socket.off('connected')
      socket.off('onMessage')
      socket.off('onConversation')
      socket.off('onMessageDelete')
    }
  }, [id])

  return (
    <div className="flex flex-1 h-full">
      <ConversationSidebar />
      {!id && <ConversationPanel />}
      <Outlet />
    </div>
  )
}
