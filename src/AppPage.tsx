import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Peer from 'peerjs'
import { camelizeKeys } from 'humps'

import { removeFriendRequest } from '@/store/friends'
import { AcceptFriendRequestResponse, FriendRequest } from '@/interfaces/chat'
import { setCall, setLocalStream, setPeer, setRemoteStream } from '@/store/call'
import { useAppSelector, useAppDispatch } from '@/store/hook'
import { SocketContext } from '@/context/SocketContext'

// components
import { CallReceiveDialog } from '@/components/calls/CallReceiveDialog'
import UserCheckIcon from '@/assets/icons/user-check.svg'

// hooks
import { useVideoCallRejected } from '@/hooks/sockets/useVideoCallRejected'
import { useVideoCallHangUp } from '@/hooks/sockets/useVideoCallHangUp'
import { useVideoCallAccept } from '@/hooks/sockets/useVideoCallAccept'
import { useVideoCall } from '@/hooks/sockets/call/useVideoCall'
import { useVoiceCall } from '@/hooks/sockets/call/useVoiceCall'
import { useVoiceCallAccepted } from '@/hooks/sockets/call/useVoiceCallAccepted'
import { useVoiceCallHangUp } from '@/hooks/sockets/call/useVoiceCallHangUp'
import { useVoiceCallRejected } from '@/hooks/sockets/call/useVoiceCallRejected'
import { useFriendRequestReceived } from '@/hooks/sockets/friend-requests/useFriendRequestReceived'
import { useToast } from '@/hooks/useToast'
import useFriends from '@/hooks/useFriends'

type AppPageProps = {
  children: React.ReactNode
}

export const AppPage: React.FC<AppPageProps> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.currentUser)
  const socket = useContext(SocketContext)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { peer, call, isReceivingCall, caller, connection, callType } = useAppSelector(
    (state) => state.call,
  )
  const { info } = useToast({ theme: 'dark' })
  const { fetchFriendRequest } = useFriends()

  useEffect(() => {
    fetchFriendRequest()
  }, [dispatch])

  useEffect(() => {
    if (!user || !user.peerId) return

    const newPeer = new Peer(user.peerId, {
      config: {
        iceServers: [
          {
            url: 'stun:stun.l.google.com:19302',
          },
          {
            url: 'stun:stun1.l.google.com:19302',
          },
        ],
      },
    })
    dispatch(setPeer(newPeer))
  }, [])

  useFriendRequestReceived()
  useVideoCall()

  useEffect(() => {
    console.log('Registering all events for AppPage')

    socket.on('onFriendRequestCancelled', (payloadRaw: FriendRequest) => {
      const payload = camelizeKeys(payloadRaw) as FriendRequest

      console.log('onFriendRequestCancelled')
      console.log(payload)
      dispatch(removeFriendRequest(payload))
    })

    socket.on('onFriendRequestAccepted', (payloadRaw: AcceptFriendRequestResponse) => {
      const payload = camelizeKeys(payloadRaw) as AcceptFriendRequestResponse

      console.log('onFriendRequestAccepted')
      dispatch(removeFriendRequest(payload.friendRequest))
      socket.emit('getOnlineFriends')
      info(`${payload.friendRequest.receiver.name} accepted your friend request`, {
        position: 'bottom-left',
        icon: UserCheckIcon,
        onClick: () => navigate('/friends'),
      })
    })

    socket.on('onFriendRequestRejected', (payloadRaw: FriendRequest) => {
      const payload = camelizeKeys(payloadRaw) as FriendRequest

      console.log('onFriendRequestRejected')
      dispatch(removeFriendRequest(payload))
    })

    return () => {
      socket.off('onFriendRequestCancelled')
      socket.off('onFriendRequestRejected')
      socket.off('onFriendRequestReceived')
      socket.off('onFriendRequestAccepted')
    }
  }, [socket, isReceivingCall])

  /**
   * This useEffect hook is for the user who is receiving the call.
   * So we must dispatch the appropriate actions to set the state
   * for the user receiving the call.
   *
   * The user who is calling will have its own instance of MediaConnection/Call
   */
  useEffect(() => {
    if (!peer) return
    peer.on('call', async (incomingCall) => {
      console.log('Incoming Call!!!!!')
      console.log(callType)
      const constraints = { video: callType === 'video', audio: true }
      console.log(constraints)
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      console.log('Receiving Call & Got Local Stream:', stream.id)
      incomingCall.answer(stream)
      dispatch(setLocalStream(stream))
      dispatch(setCall(incomingCall))
    })
    return () => {
      peer.off('call')
    }
  }, [peer, callType, dispatch])

  useEffect(() => {
    if (!call) return
    call.on('stream', (remoteStream) => dispatch(setRemoteStream(remoteStream)))
    call.on('close', () => console.log('call was closed'))
    return () => {
      call.off('stream')
      call.off('close')
    }
  }, [call])

  useVideoCallAccept()
  useVideoCallRejected()
  useVideoCallHangUp()
  useVoiceCall()
  useVoiceCallAccepted()
  useVoiceCallHangUp()
  useVoiceCallRejected()

  useEffect(() => {
    if (connection) {
      console.log('connection is defined....')
      if (connection) {
        console.log('connection is defined...')
        socket.on('connect', function () {
          console.log('Connected')
        })
        connection.on('open', () => {
          console.log('connection was opened')
        })
        connection.on('error', () => {
          console.log('an error has occured')
        })
        connection.on('data', (data) => {
          console.log('data received', data)
        })
        connection.on('close', () => {
          console.log('connection closed')
        })
      }
      return () => {
        connection?.off('open')
        connection?.off('error')
        connection?.off('data')
      }
    }
  }, [connection])

  return (
    <>
      {isReceivingCall && caller && <CallReceiveDialog />}
      {children}
    </>
  )
}
