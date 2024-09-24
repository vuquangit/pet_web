import { useContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/store'
import { resetState } from '@/store/call'
import { WebsocketEvents } from '@/enums/chat'
import { SocketContext } from '@/context/SocketContext'

export function useVoiceCallRejected() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    socket.on(WebsocketEvents.VOICE_CALL_REJECTED, (data) => {
      console.log('receiver rejected the voice call ', data.receiver)
      dispatch(resetState())
    })

    return () => {
      socket.off(WebsocketEvents.VOICE_CALL_REJECTED)
    }
  }, [])
}