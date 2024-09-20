import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { chatTypes } from '@/constants/chat'
import { RootState, AppDispatch } from '@/store'
import { updateType } from '@/store/selectedType'
import { ConversationTypeData } from '@/interfaces/chat'
import classNames from 'classnames'

export const ConversationTab = () => {
  const selectedType = useSelector((state: RootState) => state.selectedConversationType.type)
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const onSelectType = (chat: ConversationTypeData) => {
    dispatch(updateType(chat.type))
    if (chat.type === 'group') navigate('/groups')
    else navigate('/conversations')
  }
  return (
    <section className="mx-[18px] my-[14px] flex gap-5">
      {chatTypes.map((chat) => (
        <section
          className={classNames(
            'user-select-none cursor-pointer rounded-[5px] bg-[#1f1f1f] px-5 py-2 text-[12px] font-medium dark:bg-white dark:text-[#000]',
            { 'bg-[#383838]': selectedType === chat.type },
          )}
          // selected={chat.type === selectedType}
          key={chat.type}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </section>
      ))}
    </section>
  )
}
