import React, { FC } from 'react'

import { SystemMessageLevel, SystemMessageType } from '@/interfaces/chat'
import AlertIcon from '@/assets/icons/alert.svg'
import InfoIcon from '@/assets/icons/info.svg'

type Props = {
  message: SystemMessageType
}

const getSystemIcon = (type: SystemMessageLevel) => {
  switch (type) {
    case 'info':
      return InfoIcon
    case 'warning':
    case 'error':
      return AlertIcon
  }
}

export const SystemMessage: FC<Props> = ({ message }) => {
  const { content, level } = message
  const Icon = getSystemIcon(level)

  return (
    <div className="my-2 flex w-[80%] flex-col gap-1 rounded-[8px] bg-[#1c1c1c] px-4 py-3">
      <div className="flex items-center gap-2.5">
        <Icon className="text-[20px]" />
        <span className="font-bold">System Message</span>
      </div>
      <div>
        <span className="pl-[28px] text-sm italic text-[#656565]">{content}</span>
      </div>
    </div>
  )
}
