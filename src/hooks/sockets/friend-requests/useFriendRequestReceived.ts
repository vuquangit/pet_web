import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { camelizeKeys } from 'humps'

import { AppDispatch } from '@/store'
import { addFriendRequest } from '@/store/friends'
import { SocketContext } from '@/context/SocketContext'
import { FriendRequest } from '@/interfaces/chat'
import { useToast } from '@/hooks/useToast'
import UserAdd from '@/assets/icons/user-plus-solid.svg'

export function useFriendRequestReceived() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const { info } = useToast({ theme: 'dark' })

  useEffect(() => {
    socket.on('onFriendRequestReceived', (payloadRaw: FriendRequest) => {
      const payload = camelizeKeys(payloadRaw) as FriendRequest

      console.log('onFriendRequestReceived', payload)
      dispatch(addFriendRequest(payload))
      info(`Incoming Friend Request from ${payload.sender.name}`, {
        position: 'bottom-left',
        icon: UserAdd,
        onClick: () => navigate('/friends/requests'),
      })
    })

    return () => {
      socket.off('onFriendRequestReceived')
    }
  }, [])
}
