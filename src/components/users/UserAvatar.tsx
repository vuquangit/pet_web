import React, { FC, ImgHTMLAttributes } from 'react'
import classNames from 'classnames'
import { get } from 'lodash'

import defaultAvatar from '@/assets/images/default_avatar.jpg'
import { IUser } from '@/interfaces/user'

type Props = {
  user?: IUser | undefined | null
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void
  className?: string
  src?: ImgHTMLAttributes<HTMLImageElement>['src'] | ArrayBuffer
  isLoading?: boolean
}

export const UserAvatar: FC<Props> = ({ user, src, className, isLoading, onClick, ...props }) => {
  const getProfilePicture = () => {
    return src || get(user, 'avatarUrl') || defaultAvatar
  }

  return (
    <img
      className={classNames('h-[44px] w-[44px] cursor-pointer rounded-[50%]', className, {
        'animate-spin opacity-50': isLoading,
      })}
      src={getProfilePicture()}
      alt="avatar"
      onClick={onClick}
      {...props}
    />
  )
}
