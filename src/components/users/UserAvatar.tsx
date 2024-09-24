import React, { FC } from 'react'
import classNames from 'classnames'
import { get } from 'lodash'

import { CDN_URL } from '@/enums/chat'
import { User } from '@/interfaces/chat'
import defaultAvatar from '@/assets/images/default_avatar.jpg'

type Props = {
  user: User | undefined | null
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  className?: string
}

export const UserAvatar: FC<Props> = ({ user = {}, className, onClick }) => {
  const getProfilePicture = () => {
    const avatarUrl = get(user, 'profile.avatar') // TODO: get avatar url
    return avatarUrl ? CDN_URL.BASE.concat(avatarUrl) : defaultAvatar
  }

  return (
    <img
      className={classNames(className, 'h-[50px] w-[50px] cursor-pointer rounded-[50%]')}
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
    />
  )
}
