import React, { useEffect, useRef, useState, useContext } from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'

import { RootState } from '@/store'
import MicrophoneIcon from '@/assets/icons/microphone.svg'
import MicrophoneOffIcon from '@/assets/icons/microphone-off.svg'
import VideoIcon from '@/assets/icons/video.svg'
import VideoOffIcon from '@/assets/icons/video-off.svg'
import PhoneOffIcon from '@/assets/icons/phone-off.svg'
import { SocketContext } from '@/context/SocketContext'

export const ConversationVideoCall = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const socket = useContext(SocketContext)
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const { localStream, remoteStream, caller, receiver } = useSelector(
    (state: RootState) => state.call,
  )
  useEffect(() => {
    console.log('local stream was updated...')
    console.log(localStream)
    if (localVideoRef.current && localStream) {
      console.log('updating local video ref')
      console.log(`Updating local stream ${localStream.id}`)
      localVideoRef.current.srcObject = localStream
      localVideoRef.current.muted = true
    }
  }, [localStream])
  useEffect(() => {
    console.log('remote stream was updated...')
    console.log(remoteStream)
    if (remoteVideoRef.current && remoteStream) {
      console.log('updating remote video ref')
      console.log(`Updating remote stream ${remoteStream.id}`)
      remoteVideoRef.current.srcObject = remoteStream
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
    socket.emit('videoCallHangUp', { caller, receiver })
  }

  const videoItemStyle = classNames(
    'flex items-center justify-center bg-[#222222] text-[32px] p-[18px] rounded-[50%] cursor-pointer',
  )

  return (
    <div className="flex h-[600px] flex-1 flex-col items-center justify-between bg-[#0e0e0e] py-[18px]">
      <div className="flex gap-5">
        {localStream && (
          <div className="h-[400px] w-[400px]">
            <video
              className="pointer-events-none h-[400px] w-[400px]"
              ref={localVideoRef}
              playsInline
              autoPlay
            />
          </div>
        )}
        {remoteStream && (
          <div className="h-[400px] w-[400px]">
            <video
              className="pointer-events-none h-[400px] w-[400px]"
              ref={remoteVideoRef}
              playsInline
              autoPlay
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
