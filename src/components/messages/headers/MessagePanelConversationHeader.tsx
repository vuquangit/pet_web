import React, { useContext } from 'react'
// import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import PhoneIcon from '@/assets/icons/phone.svg'
import VideoIcon from '@/assets/icons/video.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '@/store'
import { initiateCallState } from '@/store/call'
import { selectConversationById } from '@/store/conversations'
import { SenderEvents } from '@/enums/chat'
import { AuthContext } from '@/context/AuthContext'
import { SocketContext } from '@/context/SocketContext'
import { getRecipientFromConversation } from '@/helpers'
// import {
//   MessagePanelHeaderIcons,
//   MessagePanelHeaderStyle,
// } from '../../../utils/styles';
import { CallInitiatePayload, CallType } from '@/interfaces/chat'

export const MessagePanelConversationHeader = () => {
  const user = useContext(AuthContext).user!
  const { id = '' } = useParams()
  const socket = useContext(SocketContext)

  const dispatch = useDispatch()
  const conversation = useSelector((state: RootState) => selectConversationById(state, id))

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
    <header className="flex h-[90px] w-full flex-shrink-0 items-center justify-between border-b border-solid bg-[#49494925] px-8 py-2.5">
      <div>
        <span>{recipient?.name || 'User'}</span>
      </div>
      <div className="flex items-center gap-5">
        <PhoneIcon
          className="h-[30px]"
          cursor="pointer"
          onClick={voiceCallUser}
        />
        <VideoIcon
          className="h-[30px]"
          cursor="pointer"
          onClick={videoCallUser}
        />
      </div>
    </header>
  )
}
