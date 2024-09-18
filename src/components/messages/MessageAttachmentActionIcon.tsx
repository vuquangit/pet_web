import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PersonCirclePlus from '@/assets/icons/person-circle-plus.svg'
import { AppDispatch, RootState } from '@/store'
import { addAttachment, incrementAttachmentCounter } from '@/store/message-panel'
import { useToast } from '@/hooks/useToast'
import { DivMouseEvent, InputChangeEvent } from '@/interfaces/chat'

export const MessageAttachmentActionIcon = () => {
  const attachmentIconRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const { error } = useToast({ theme: 'dark' })
  const { attachmentCounter, attachments } = useSelector((state: RootState) => state.messagePanel)

  const onClick = (e: DivMouseEvent) => {
    console.log('on click', e)
    fileInputRef.current?.click()
  }

  const onChange = (e: InputChangeEvent) => {
    const { files } = e.target
    if (!files) return
    const maxFilesDropped = 5 - attachments.length
    if (maxFilesDropped === 0) return error('Max files reached')
    const filesArray = Array.from(files)
    let localCounter = attachmentCounter
    for (let i = 0; i < filesArray.length; i++) {
      console.log(filesArray[i])
      if (i === maxFilesDropped) break
      dispatch(addAttachment({ id: (localCounter++).toString(), file: filesArray[i] }))
      dispatch(incrementAttachmentCounter())
    }
  }

  return (
    <div
      ref={attachmentIconRef}
      onClick={onClick}
    >
      <PersonCirclePlus
        className="text-[rgb(210, 210, 210)] h-[36px]"
        cursor="pointer"
      />
      <input
        multiple
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
    </div>
  )
}
