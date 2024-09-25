import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import classNames from 'classnames'

import { MessageTextField } from './MessageTextField'
import FaceSmileIcon from '@/assets/icons/face-smile.svg'
import { MessageAttachmentActionIcon } from './MessageAttachmentActionIcon'
import { EmojiPickerModal } from '@/components/modals/EmojiPickerModal'

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
  const MAX_LENGTH = 2048
  const [isMultiLine, setIsMultiLine] = useState(false)
  const atMaxLength = content.length === MAX_LENGTH

  const [isOpenEmojiPicker, setIsOpenEmojiPicker] = useState<boolean>(false)

  return (
    <div
      className={classNames(
        'relative flex min-h-11 w-full items-center gap-5 rounded-[5px] pl-3 pr-4 dark:text-white',
        {
          'items-start': isMultiLine,
          'items-center': !isMultiLine,
        },
      )}
    >
      <div className="relative">
        <div
          className="cursor-pointer p-1"
          onClick={() => setIsOpenEmojiPicker(true)}
        >
          <FaceSmileIcon className="h-6 fill-[#9f1aff]" />
        </div>
        <EmojiPickerModal
          isShowModal={isOpenEmojiPicker}
          setShowModal={setIsOpenEmojiPicker}
          message={content}
          setMessage={setContent}
        />
      </div>

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

      {content ? (
        <button
          type="submit"
          className="cursor-pointer border-none text-sm font-bold text-[#0094f6] outline-none"
          onClick={sendMessage}
        >
          Send
        </button>
      ) : (
        <MessageAttachmentActionIcon />
      )}

      {atMaxLength && (
        <span
          className={classNames('b-2 r-[36px] absolute text-sm font-medium', {
            'text-[#ff0000]': atMaxLength,
            'text-[rgb(129, 129, 129)]': !atMaxLength,
          })}
        >
          {`${content.length}/${MAX_LENGTH}`}
        </span>
      )}
    </div>
  )
}
