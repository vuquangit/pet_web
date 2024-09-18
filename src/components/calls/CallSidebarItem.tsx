import React, { FC, useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'
import { getUserFriendInstance } from '@/helpers'
import { Friend } from '@/interfaces/chat'
import { UserAvatar } from '../users/UserAvatar'
// import { IoMdVideocam, IoMdCall } from 'react-icons/io';
import VideoIcon from '@/assets/icons/video.svg'
import PhoneIcon from '@/assets/icons/phone.svg'

type Props = {
  friend: Friend
}
export const CallSidebarItem: FC<Props> = ({ friend }) => {
  const { user } = useContext(AuthContext)
  return (
    <div>
      <div>
        <UserAvatar user={getUserFriendInstance(user!, friend)} />
      </div>
      <div>
        <div>
          <span className="username">{user?.name}</span>
        </div>
        <div className="icons">
          <div className="icon">
            <VideoIcon className="h-8" />
          </div>
          <div className="icon">
            <PhoneIcon className="h-8" />
          </div>
        </div>
      </div>
    </div>
  )
}
