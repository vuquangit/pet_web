import React, { useEffect, useRef, useState, useContext } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store'
import MicrophoneIcon from '@/assets/icons/microphone.svg'
import MicrophoneOffIcon from '@/assets/icons/microphone-off.svg'
import VideoIcon from '@/assets/icons/video.svg'
import VideoOffIcon from '@/assets/icons/video-off.svg'
import PhoneOffIcon from '@/assets/icons/phone-off.svg'
import { SocketContext } from '@/context/SocketContext'
import { WebsocketEvents } from '@/enums/chat'
import classNames from 'classnames'

export const ConversationAudioCall = () => {
  const localAudioRef = useRef<HTMLAudioElement>(null)
  const remoteAudioRef = useRef<HTMLAudioElement>(null)
  const socket = useContext(SocketContext)
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const { localStream, remoteStream, caller, receiver } = useSelector(
    (state: RootState) => state.call,
  )
  useEffect(() => {
    console.log('AUDIO: local stream was updated...')
    console.log(localStream)
    if (localAudioRef.current && localStream) {
      console.log('AUDIO: updating local video ref')
      console.log(`AUDIO: Updating local stream ${localStream.id}`)
      localAudioRef.current.srcObject = localStream
      localAudioRef.current.muted = true
    }
  }, [localStream])
  useEffect(() => {
    console.log('AUDIO: remote stream was updated...')
    console.log(remoteStream)
    if (remoteAudioRef.current && remoteStream) {
      console.log('AUDIO: updating remote video ref')
      console.log(`AUDIO: Updating remote stream ${remoteStream.id}`)
      remoteAudioRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const toggleMicrophone = () =>
    localStream &&
    setMicrophoneEnabled((prev) => {
      localStream.getAudioTracks()[0].enabled = !prev
      return !prev
    })

  const toggleVideo = () =>
    localStream &&
    setVideoEnabled((prev) => {
      localStream.getVideoTracks()[0].enabled = !prev
      return !prev
    })

  const closeCall = () => {
    socket.emit(WebsocketEvents.VOICE_CALL_HANG_UP, { caller, receiver })
  }

  const videoItemStyle = classNames(
    'flex items-center justify-center bg-[#222222] text-[32px] p-[18px] rounded-[50%] cursor-pointer',
  )

  return (
    <div className="flex h-[600px] flex-1 flex-col items-center justify-between bg-[#0e0e0e] py-[18px]">
      <div className="invisible"></div>
      <div className="flex gap-5">
        {localStream && (
          <div>
            <audio
              ref={localAudioRef}
              autoPlay
              controls
            />
          </div>
        )}
        {remoteStream && (
          <div>
            <audio
              ref={remoteAudioRef}
              autoPlay
              controls
            />
          </div>
        )}
      </div>
      <div className="flex gap-2.5">
        <div className={videoItemStyle}>
          {videoEnabled ? (
            <VideoIcon onClick={toggleVideo} />
          ) : (
            <VideoOffIcon onClick={toggleVideo} />
          )}
        </div>
        <div className={videoItemStyle}>
          {microphoneEnabled ? (
            <MicrophoneIcon onClick={toggleMicrophone} />
          ) : (
            <MicrophoneOffIcon onClick={toggleMicrophone} />
          )}
        </div>
        <div className={videoItemStyle}>
          <PhoneOffIcon onClick={closeCall} />
        </div>
      </div>
    </div>
  )
}
