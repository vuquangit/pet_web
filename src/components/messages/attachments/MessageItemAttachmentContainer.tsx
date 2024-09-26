import React, { FC, useState } from 'react'
import CloseIcon from '@/assets/icons/close.svg'
import { CDN_URL } from '@/enums/chat'
import { useKeydown } from '@/hooks/useKeydown'
import { GroupMessageType, MessageType } from '@/interfaces/chat'

type Props = {
  message: MessageType | GroupMessageType
}
export const MessageItemAttachmentContainer: FC<Props> = ({ message }) => {
  const [showOverlay, setShowOverlay] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const onClick = (key: string) => {
    setShowOverlay(true)
    setImageUrl(CDN_URL.ORIGINAL.concat(key))
  }

  const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowOverlay(false)
  useKeydown(handleKeydown)

  return (
    <>
      {showOverlay && (
        <div className="modal-overlay">
          <CloseIcon
            className="r-2.5 :hover:text-[rgb(255, 0, 0)] absolute top-2.5 cursor-pointer text-[40px]"
            onClick={() => setShowOverlay(false)}
          />
          <img
            src={imageUrl}
            alt="overlay"
            style={{ maxHeight: '90%' }}
          />
        </div>
      )}
      <div>
        {message.attachments?.map((attachment) => (
          <img
            key={attachment.key}
            src={CDN_URL.PREVIEW.concat(attachment.key)}
            width={300}
            alt={attachment.key}
            onClick={() => onClick(attachment.key)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
    </>
  )
}
