import React, { FC } from 'react'

import { CDN_URL } from '@/enums/chat'
import { User } from '@/interfaces/chat'
import defaultAvatar from '@/assets/images/default_avatar.jpg'

type Props = {
  user: User
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
}

export const UserAvatar: FC<Props> = ({ user, onClick }) => {
  const getProfilePicture = () => {
    const { profile } = user
    return profile && profile.avatar ? CDN_URL.BASE.concat(profile.avatar) : defaultAvatar
  }

  return (
    <img
      className="h-[50px] w-[50px] cursor-pointer rounded-[50%]"
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
    />
  )
}
