import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AppDispatch, RootState } from '@/store'
import { setIsEditing } from '@/store/messageContainer'
import { selectType } from '@/store/selectedType'
import { EditMessagePayload } from '@/interfaces/chat'
import { InputField } from '@/components/Form'
import useMessages from '@/hooks/useMessage'
import useGroupMessage from '@/hooks/useGroupMessage'

type Props = {
  onEditMessageChange: (value: string) => void
}

export const EditMessageContainer: FC<Props> = ({ onEditMessageChange }) => {
  const { id = '' } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const { messageBeingEdited } = useSelector((state: RootState) => state.messageContainer)
  const conversationType = useSelector((state: RootState) => selectType(state))
  const { handleEditMessage } = useMessages()
  const { editGroupMessage } = useGroupMessage()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(messageBeingEdited)
    console.log('Submitting Edit')
    if (!messageBeingEdited) {
      console.log('messageBeingEdited is undefined... Returning')
      return
    }
    const params: EditMessagePayload = {
      id: id,
      messageId: messageBeingEdited.id,
      content: messageBeingEdited.content || '',
    }
    console.log(params)
    console.log('Editing...', conversationType)
    conversationType === 'private'
      ? await handleEditMessage(params)
      : await editGroupMessage(params)

    dispatch(setIsEditing(false))
  }

  return (
    <div style={{ width: '100%' }}>
      <form onSubmit={onSubmit}>
        <InputField
          value={messageBeingEdited?.content}
          onChange={onEditMessageChange}
        />
      </form>
      <div className="text-[12px]">
        <div>
          escape to <span className="text-[#1d77ff]">cancel</span> - enter to <span>save</span>
        </div>
      </div>
    </div>
  )
}
