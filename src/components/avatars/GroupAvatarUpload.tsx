import React, { useRef, useState, Dispatch, SetStateAction, FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { CDN_URL } from '@/enums/chat'
import { InputChangeEvent } from '@/interfaces/chat'
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import classNames from 'classnames'

type Props = {
  setFile: Dispatch<SetStateAction<File | undefined>>
}

export const GroupAvatarUpload: FC<Props> = ({ setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [source, setSource] = useState('')
  const { selectedGroupContextMenu } = useSelector((state: RootState) => state.groups)

  const getGroupAvatar = () => {
    return selectedGroupContextMenu && selectedGroupContextMenu.avatar
      ? CDN_URL.BASE.concat(selectedGroupContextMenu.avatar)
      : defaultAvatar
  }

  const onFileChange = (e: InputChangeEvent) => {
    const file = e.target.files?.item(0)
    if (file) {
      setSource(URL.createObjectURL(file))
      setFile(file)
    }
  }

  const onAvatarClick = () => fileInputRef.current?.click()

  return (
    <div className="mb-5 flex w-full justify-center">
      <div
        className={classNames('border-1 h-[150px] w-[150px] cursor-pointer rounded-full', {
          ':hover:opacity-100 bg-cover bg-center bg-no-repeat opacity-100':
            source || getGroupAvatar(),
          'bg-[#404040]': !(source || getGroupAvatar()),
        })}
        onClick={onAvatarClick}
      ></div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  )
}
