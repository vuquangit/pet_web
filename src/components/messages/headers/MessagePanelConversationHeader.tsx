import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import classNames from 'classnames'

import PhoneIcon from '@/assets/icons/phone.svg'
import VideoIcon from '@/assets/icons/video.svg'
import { RootState } from '@/store'
import { initiateCallState } from '@/store/call'
import { selectConversationById } from '@/store/conversations'
import { SenderEvents } from '@/enums/chat'
import { SocketContext } from '@/context/SocketContext'
import { getRecipientFromConversation } from '@/helpers'
import { CallInitiatePayload, CallType } from '@/interfaces/chat'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { UserAvatar } from '@/components/users/UserAvatar'

export const MessagePanelConversationHeader = () => {
  const user = useAppSelector((state) => state.auth) as any
  const { id = '' } = useParams()
  const socket = useContext(SocketContext)

  const dispatch = useAppDispatch()
  const conversation = useAppSelector((state: RootState) => selectConversationById(state, id))

  const recipient = getRecipientFromConversation(conversation, user)

  const buildCallPayloadParams = (
    stream: MediaStream,
    type: CallType,
  ): CallInitiatePayload | undefined =>
    conversation && {
      localStream: stream,
      caller: user,
      receiver: recipient!,
      isCalling: true,
      activeConversationId: conversation.id,
      callType: type,
    }

  const videoCallUser = async () => {
    if (!recipient) return console.log('Recipient undefined')
    socket.emit('onVideoCallInitiate', {
      conversationId: conversation!.id,
      recipientId: recipient.id,
    })
    const constraints = { video: true, audio: true }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    const payload = buildCallPayloadParams(stream, 'video')
    if (!payload) throw new Error('Video Call Payload is undefined.')
    dispatch(initiateCallState(payload))
  }

  const voiceCallUser = async () => {
    if (!recipient) return console.log('Recipient undefined')
    socket.emit(SenderEvents.VOICE_CALL_INITIATE, {
      conversationId: conversation!.id,
      recipientId: recipient.id,
    })
    const constraints = { video: false, audio: true }
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    const payload = buildCallPayloadParams(stream, 'audio')
    if (!payload) throw new Error('Voice Call Payload is undefined.')
    dispatch(initiateCallState(payload))
  }

  return (
    <header className="flex w-full flex-shrink-0 items-center justify-between border-b border-solid bg-[#49494925] px-8 py-2.5">
      <div className="flex items-center gap-3">
        <UserAvatar
          user={recipient}
          className="h-10 w-10"
        />
        <span>{recipient?.name || ''}</span>
      </div>

      <div className="flex items-center gap-5">
        <PhoneIcon
          className={classNames('h-[24px] cursor-pointer fill-[#0080ff]', {
            // '[rgba(255, 255, 255, 0.3)]': disabled
          })}
          onClick={voiceCallUser}
        />
        <VideoIcon
          className={classNames('h-[24px] cursor-pointer fill-[#0080ff]', {
            // 'dark:[rgba(255, 255, 255, 0.3)]': disabled
          })}
          onClick={videoCallUser}
        />
      </div>
    </header>
  )
}
