import React, { useSelector } from 'react-redux'

import { RootState } from '../../store'
// import { CallReceiveDialogContainer } from '../../utils/styles';
import { UserAvatar } from '../users/UserAvatar'
// import { MdCall, MdCallEnd } from 'react-icons/md';
import PhoneIcon from '@/assets/icons/phone.svg'
import PhoneOffIcon from '@/assets/icons/phone-off.svg'
import { HandleCallType } from '@/interfaces/chat'
import { useContext } from 'react'
import { SocketContext } from '@/context/SocketContext'
import { SenderEvents, WebsocketEvents } from '@/enums/chat'

export const CallReceiveDialog = () => {
  const { caller, callType } = useSelector((state: RootState) => state.call)
  const socket = useContext(SocketContext)
  const handleCall = (type: HandleCallType) => {
    const payload = { caller }
    switch (type) {
      case 'accept':
        return callType === 'video'
          ? socket.emit('videoCallAccepted', payload)
          : socket.emit(SenderEvents.VOICE_CALL_ACCEPT, payload)
      case 'reject':
        return callType === 'video'
          ? socket.emit(WebsocketEvents.VIDEO_CALL_REJECTED, payload)
          : socket.emit(WebsocketEvents.VOICE_CALL_REJECTED, payload)
    }
  }
  return (
    <div className="absolute left-1/2 top-1/2 z-[999999] flex w-[250px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between gap-8 rounded-[10px] bg-[#1f1f1f] py-6 py-8 text-white">
      <UserAvatar user={caller!} />
      <div className="align-center">
        <span>
          {caller!.username} wants to {callType === 'audio' ? 'voice' : 'video'} call you
        </span>
      </div>
      <div className="flex justify-center gap-2.5">
        <div
          className="accept flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[50%] bg-[#151515] text-[30px] text-[#00ff0a]"
          onClick={() => handleCall('accept')}
        >
          <PhoneIcon />
        </div>
        <div
          className="reject  flex h-[50px] w-[50px] cursor-pointer items-center justify-center rounded-[50%] bg-[#151515]  text-[30px] text-[#ff0000]"
          onClick={() => handleCall('reject')}
        >
          <PhoneOffIcon />
        </div>
      </div>
    </div>
  )
}
