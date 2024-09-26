import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { chatTypes } from '@/constants/chat'
import { RootState, AppDispatch } from '@/store'
import { updateType } from '@/store/selectedType'
import { ConversationTypeData } from '@/interfaces/chat'

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
            'user-select-none cursor-pointer rounded-[5px] border border-solid border-[#939393] bg-white px-5 py-2 text-[12px] font-medium dark:border-none dark:text-[#000]',
            { 'bg-blue-600': selectedType === chat.type },
          )}
          key={chat.type}
          onClick={() => onSelectType(chat)}
        >
          {chat.label}
        </section>
      ))}
    </section>
  )
}
