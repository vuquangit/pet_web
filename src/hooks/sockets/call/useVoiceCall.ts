import { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { camelizeKeys } from 'humps'

import { AppDispatch, RootState } from '@/store'
import { setCaller, setReceiver, setIsReceivingCall, setCallType } from '@/store/call'
import { ReceiverEvents } from '@/enums/chat'
import { useAppSelector } from '@/store/hook'
import { SocketContext } from '@/context/SocketContext'
import { CallPayload } from '@/interfaces/chat'

export function useVoiceCall() {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch<AppDispatch>()
  const user = useAppSelector((state) => state.auth)
  const { isReceivingCall } = useSelector((state: RootState) => state.call)

  useEffect(() => {
    socket.on(ReceiverEvents.VOICE_CALL, (dataRaw: CallPayload) => {
      const data = camelizeKeys(dataRaw) as CallPayload

      console.log('receiving voice call....')
      console.log(data)
      if (isReceivingCall) return
      dispatch(setCaller(data.caller))
      dispatch(setReceiver(user))
      dispatch(setIsReceivingCall(true))
      dispatch(setCallType('audio'))
    })

    return () => {
      socket.off(ReceiverEvents.VOICE_CALL)
    }
  }, [isReceivingCall])
}
