import React, { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { AppDispatch, RootState } from '@/store'
import { updateType } from '@/store/selectedType'
import { chatTypes } from '@/constants/chat'
import { ConversationTypeData } from '@/interfaces/chat'

export const ConversationSelected = () => {
  const selectedType = useSelector((state: RootState) => state.selectedConversationType.type)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  const onSelectType = (chat: ConversationTypeData) => {
    dispatch(updateType(chat.type))
    if (chat.type === 'group') navigate('/groups')
    else navigate('/conversations')
  }

  return (
    <div className="flex w-full gap-5 border-b border-solid border-[#4343435f] bg-[#0f0f0f] px-6 py-5">
      {chatTypes.map((chat) => (
        <div
          key={chat.type}
          className={classNames(
            'rounded-[10px] bg-[#212121] px-[28px] py-3 text-[15px] font-medium text-[#f0f0f0]',
            { 'bg-[#444444': selectedType === chat.type },
          )}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </div>
      ))}
    </div>
  )
}
