import React, { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { get } from 'lodash'

import { RootState } from '@/store'
import { selectConversationById } from '@/store/conversations'
import { selectGroupById } from '@/store/group'
import { removeAllAttachments } from '@/store/message-panel'
import { addSystemMessage, clearAllMessages } from '@/store/system-messages'
import { useCreateMessageMutation } from '@/services/conversations'
import { getRecipientFromConversation } from '@/helpers'
import { useToast } from '@/hooks/useToast'
import { MessageAttachmentContainer } from './attachments/MessageAttachmentContainer'
import { MessageContainer } from './MessageContainer'
import { MessageInputField } from './MessageInputField'
import { MessagePanelHeader } from './MessagePanelHeader'
import { useAppSelector, useAppDispatch } from '@/store/hook'

type Props = {
  sendTypingStatus: () => void
  isRecipientTyping: boolean
}

export const MessagePanel: FC<Props> = ({ sendTypingStatus, isRecipientTyping }) => {
  const toastId = 'rateLimitToast'
  const dispatch = useAppDispatch()
  const { messageCounter } = useAppSelector((state: RootState) => state.systemMessages)
  const [content, setContent] = useState('')
  const { id: routeId = '' } = useParams()
  const user = useAppSelector((state: RootState) => state.auth)
  const { error } = useToast({ theme: 'dark' })
  const { attachments } = useAppSelector((state: RootState) => state.messagePanel)
  const conversation = useAppSelector((state: RootState) => selectConversationById(state, routeId))
  const group = useAppSelector((state: RootState) => selectGroupById(state, routeId))
  const selectedType = useAppSelector((state: RootState) => state.selectedConversationType.type)

  const recipient = getRecipientFromConversation(conversation, user)

  const [createMessage] = useCreateMessageMutation()

  useEffect(() => {
    return () => {
      dispatch(clearAllMessages())
      dispatch(removeAllAttachments())
    }
  }, [])

  const sendMessage = async () => {
    const trimmedContent = content.trim()
    if (!routeId) return
    if (!trimmedContent && !attachments.length) return
    const formData = new FormData()
    formData.append('id', routeId)
    trimmedContent && formData.append('content', trimmedContent)
    attachments.forEach((attachment: any) => formData.append('attachments', attachment.file))

    try {
      await createMessage({ id: routeId, type: selectedType, data: formData })
      // debugger
      setContent('')
      dispatch(removeAllAttachments())
      dispatch(clearAllMessages())
    } catch (err) {
      console.log('sendMessage error', err)

      // TODO: get status code
      const status = get(err, 'result.error.status')
      if (status === 429) {
        error('You are rate limited', { toastId })
        dispatch(
          addSystemMessage({
            id: messageCounter,
            level: 'error',
            content: 'You are being rate limited. Slow down.',
          }),
        )
      } else if (status === 404) {
        dispatch(
          addSystemMessage({
            id: messageCounter,
            level: 'error',
            content: 'The recipient is not in your friends list or they may have blocked you.',
          }),
        )
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col">
      <MessagePanelHeader />

      <div
        className="min-h-0 flex-1 overflow-auto"
        style={{ height: 'calc(100% - 600px)' }}
      >
        <MessageContainer
          isRecipientTyping={isRecipientTyping}
          recipient={recipient}
        />
      </div>

      <div className="m-4 rounded-[22px] border border-solid border-[#363636]">
        <MessageInputField
          content={content}
          setContent={setContent}
          sendMessage={sendMessage}
          sendTypingStatus={sendTypingStatus}
          placeholderName={
            selectedType === 'group' ? group?.title || 'Group' : recipient?.name || 'user'
          }
        />

        {attachments.length > 0 && <MessageAttachmentContainer />}
      </div>
    </div>
  )
}
