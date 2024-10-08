import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { camelizeKeys } from 'humps'

import { AppDispatch, RootState } from '@/store'
import { setCaller, setReceiver, setIsReceivingCall, setCallType } from '@/store/call'
import { SocketContext } from '@/context/SocketContext'
import { CallPayload } from '@/interfaces/chat'
import { useAppSelector } from '@/store/hook'

export function useVideoCall() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state) => state.auth.currentUser)
  const { isReceivingCall } = useSelector((state: RootState) => state.call)

  useEffect(() => {
    socket.on('onVideoCall', (dataRaw: CallPayload) => {
      const data = camelizeKeys(dataRaw) as CallPayload

      console.log('receiving video call....')
      console.log(data)
      if (isReceivingCall) return
      dispatch(setCaller(data.caller))
      dispatch(setReceiver(user))
      dispatch(setIsReceivingCall(true))
      dispatch(setCallType('video'))
    })

    return () => {
      socket.off('onVideoCall')
    }
  }, [isReceivingCall])
}
