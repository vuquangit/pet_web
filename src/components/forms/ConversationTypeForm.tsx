import React, { FC, Dispatch, SetStateAction } from 'react'
import { chatTypes } from '@/constants/chat'
import { ConversationType } from '@/interfaces/chat'

type Props = {
  type: ConversationType
  setType: Dispatch<SetStateAction<ConversationType>>
}

export const ConversationTypeForm: FC<Props> = ({ type, setType }) => {
  return (
    <form className="flex gap-5 pb-2.5">
      {chatTypes.map((chatType) => (
        <div key={chatType.type}>
          <input
            className="hidden"
            type="radio"
            name="conversationType"
            id={chatType.type}
            onChange={() => setType(chatType.type)}
            checked={type === chatType.type}
          />
          <label
            className=':before:content-[""] border-1 mr-2 flex h-5 w-5 cursor-pointer items-center rounded-[5px] border-solid border-[#2b09ff]'
            htmlFor={chatType.type}
          >
            {chatType.label}
          </label>
        </div>
      ))}
    </form>
  )
}
