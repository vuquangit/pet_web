import React, { Dispatch, FC, SetStateAction, useState } from 'react'
// import { CharacterLimit, MessageInputContainer } from '../../utils/styles';
import { MessageTextField } from './MessageTextField'
// import { FaceVeryHappy } from 'akar-icons';
import FaceSmileIcon from '@/assets/icons/face-smile.svg'
import { MessageAttachmentActionIcon } from './MessageAttachmentActionIcon'
import classNames from 'classnames'

type Props = {
  content: string
  setContent: Dispatch<SetStateAction<string>>
  placeholderName: string
  sendMessage: () => void
  sendTypingStatus: () => void
}

export const MessageInputField: FC<Props> = ({
  content,
  // placeholderName,
  setContent,
  sendMessage,
  sendTypingStatus,
}) => {
  // const ICON_SIZE = 36;
  const MAX_LENGTH = 2048
  const [isMultiLine, setIsMultiLine] = useState(false)
  const atMaxLength = content.length === MAX_LENGTH

  return (
    <>
      <div
        className={classNames('relative flex w-full gap-5 rounded-[5px] bg-white px-6 py-5', {
          'items-start': isMultiLine,
          'items-center': !isMultiLine,
        })}
      >
        <MessageAttachmentActionIcon />
        <form
          onSubmit={sendMessage}
          className="w-full"
        >
          <MessageTextField
            message={content}
            setMessage={setContent}
            maxLength={MAX_LENGTH}
            setIsMultiLine={setIsMultiLine}
            sendTypingStatus={sendTypingStatus}
            sendMessage={sendMessage}
          />
        </form>
        <FaceSmileIcon className="color-[rgb(210, 210, 210)] h-[36px]" />
        {atMaxLength && (
          <span
            className={classNames('b-2 r-[36px] absolute text-[14px] font-medium', {
              'text-[#ff0000]': atMaxLength,
              'text-[rgb(129, 129, 129)]': !atMaxLength,
            })}
          >
            {`${content.length}/${MAX_LENGTH}`}
          </span>
        )}
      </div>
    </>
  )
}
