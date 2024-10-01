import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
// import { MessageAttachmentContainerStyle, MessageAttachmentStyle } from '../../../utils/styles'
// import { RiDeleteBin6Fill } from 'react-icons/ri'
import TrashIcon from '@/assets/icons/trash.svg'
import { MessageImageCanvas } from './MessageImageCanvas'
import { Attachment } from '@/interfaces/chat'
import { removeAttachment } from '../../../store/message-panel'

export const MessageAttachmentContainer = () => {
  const { attachments } = useSelector((state: RootState) => state.messagePanel)
  const dispatch = useDispatch<AppDispatch>()

  const onDeleteAttachment = (attachment: Attachment) => {
    dispatch(removeAttachment(attachment))
  }

  return (
    <div className="my-2.5 flex flex-col gap-2">
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className="relative my-2.5 flex h-[300px] max-h-[300px] flex-col items-center gap-5 rounded-[10px] bg-[#161616] pt-[50px]"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MessageImageCanvas file={attachment.file} />
          <TrashIcon
            color="red"
            // style={{ position: 'absolute', zIndex: 1, right: 15, top: 10 }}
            className="absolute right-[15px] top-2.5 z-[1] h-8"
            // size={30}
            onClick={() => onDeleteAttachment(attachment)}
          />
          <div>{attachment.file.name}</div>
        </div>
      ))}
    </div>
  )
}
