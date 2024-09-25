import React from 'react'
import MessageIcon from '@/assets/icons/message.svg'

export const ConversationPanel = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="flex justify-center">
          <MessageIcon className="h-[90px] w-[90px] fill-icon-dark dark:fill-icon-light" />
        </div>
        <h3 className="mt-5 text-[20px] font-medium">Your messages</h3>
        <p className="mt-1 text-sm text-[#a8a8a8]">Send a message to start a chat.</p>
      </div>
    </div>
  )
}
