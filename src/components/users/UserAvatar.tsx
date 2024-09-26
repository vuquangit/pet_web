import React, { FC } from 'react'
import classNames from 'classnames'
import { get } from 'lodash'

import { CDN_URL } from '@/enums/chat'
import { User } from '@/interfaces/chat'
import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { IAuthMe } from '@/interfaces/auth'

type Props = {
  user: User | IAuthMe | undefined | null
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  className?: string
}

export const UserAvatar: FC<Props> = ({ user = {}, className, onClick, ...props }) => {
  const getProfilePicture = () => {
    const avatarUrl = get(user, 'profile.avatar') // TODO: get avatar url
    return avatarUrl ? CDN_URL.BASE.concat(avatarUrl) : defaultAvatar
  }

  return (
    <img
      className={classNames('h-[44px] w-[44px] cursor-pointer rounded-[50%]', className)}
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
      {...props}
    />
  )
}
