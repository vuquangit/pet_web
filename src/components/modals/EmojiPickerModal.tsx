import React, { FC, Dispatch, SetStateAction } from 'react'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import classNames from 'classnames'

import { ETheme } from '@/enums/theme'
import { currentTheme } from '@/store/theme'
import { useAppSelector } from '@/store/hook'
import useModal from '@/hooks/useModal'

type Props = {
  isShowModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

export const EmojiPickerModal: FC<Props> = ({ isShowModal, setShowModal, setMessage }) => {
  const theme = useAppSelector(currentTheme)
  const themeEmoji: Theme = theme === ETheme.DARK ? Theme.DARK : Theme.LIGHT

  const { overlayRef, handleOverlayClick} = useModal({ setShowModal })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    setMessage((prev) => prev + emojiData.emoji)
  }

  return (
    <>
      <div
        ref={overlayRef}
        className={classNames('modal-overlay bg-inherit', { hidden: !isShowModal })}
        onClick={handleOverlayClick}
      ></div>
      <div
        className={classNames('absolute bottom-[32px] left-0 z-[9999]', { hidden: !isShowModal })}
      >
        <EmojiPicker
          theme={themeEmoji}
          lazyLoadEmojis={true}
          onEmojiClick={onEmojiClick}
        />
      </div>
    </>
  )
}
