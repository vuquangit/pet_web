import React, { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { SystemMessage } from './SystemMessage'

export const SystemMessageList = () => {
  const { messages } = useSelector((state: RootState) => state.systemMessages)

  return (
    <div>
      {messages.map((message) => (
        <SystemMessage
          key={message.id}
          message={message}
        />
      ))}
    </div>
  )
}
