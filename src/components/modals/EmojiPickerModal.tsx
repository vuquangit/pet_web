import React, { FC, Dispatch, SetStateAction, useEffect, createRef } from 'react'
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import classNames from 'classnames'

import { ETheme } from '@/enums/theme'
import { currentTheme } from '@/store/theme'
import { useAppSelector } from '@/store/hook'

type Props = {
  isShowModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
}

export const EmojiPickerModal: FC<Props> = ({ isShowModal, setShowModal, setMessage }) => {
  const ref = createRef<HTMLDivElement>()
  const emojiRef = createRef<HTMLDivElement>()

  const theme = useAppSelector(currentTheme)
  const themeEmoji: Theme = theme === ETheme.DARK ? Theme.DARK : Theme.LIGHT

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { current } = ref
    if (current === e.target) {
      console.log('Close Modal')
      setShowModal(false)
    }
  }

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => e.key === 'Escape' && setShowModal(false)
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const onEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    console.log('onEmojiClick', emojiData, event)
    setMessage((prev) => prev + emojiData.emoji)
  }

  return (
    <>
      <div
        ref={ref}
        className={classNames('modal-overlay bg-inherit', { hidden: !isShowModal })}
        onClick={handleOverlayClick}
      ></div>
      <div
        ref={emojiRef}
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
