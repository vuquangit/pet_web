import {
  Conversation,
  Friend,
  FriendRequest,
  FriendRequestDetailsType,
  Group,
  SettingsSidebarRouteType,
  User,
  UserContextMenuActionType,
  UserSidebarRouteType,
} from '@/interfaces/chat'

import PersonKickIcon from '@/assets/icons/person-kick.svg'
import CrowIcon from '@/assets/icons/crown.svg'
import MinusIcon from '@/assets/icons/minus.svg'
import RotateIcon from '@/assets/icons/rotate.svg'
import CommentDotsIcon from '@/assets/icons/comment-dots-regular.svg'
import UserGroupIcon from '@/assets/icons/user-group.svg'
import Gear from '@/assets/icons/gear.svg'
import VideoIcon from '@/assets/icons/video.svg'
import Person from '@/assets/icons/person.svg'
import LockIcon from '@/assets/icons/lock.svg'
import BellIcon from '@/assets/icons/bell.svg'
import InfiniteIcon from '@/assets/icons/infinity.svg'
import PaletteIcon from '@/assets/icons/palette.svg'
import HouseIcon from '@/assets/icons/house.svg'
import { IAuthMe } from '@/interfaces/auth'

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User | IAuthMe,
): User | undefined => {
  return user?.id === conversation?.creator.id ? conversation?.recipient : conversation?.creator
}

export const getUserContextMenuIcon = (type: UserContextMenuActionType) => {
  switch (type) {
    case 'kick':
      return { icon: PersonKickIcon, color: '#ff0000' }
    case 'transfer_owner':
      return { icon: CrowIcon, color: '#FFB800' }
    default:
      return { icon: MinusIcon, color: '#7c7c7c' }
  }
}

export const isGroupOwner = (user?: User | IAuthMe, group?: Group) => user?.id === group?.owner.id

export const getUserSidebarIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case 'home':
      return HouseIcon
    case 'conversations':
      return CommentDotsIcon
    case 'friends':
      return UserGroupIcon
    case 'connections':
      return RotateIcon
    case 'settings':
      return Gear
    case 'calls':
      return VideoIcon
    case 'profile':
      return Person
    default:
      return CommentDotsIcon
  }
}

export const getSettingSidebarIcon = (id: SettingsSidebarRouteType) => {
  switch (id) {
    case 'profile':
      return Person
    case 'security':
      return LockIcon
    case 'notifications':
      return BellIcon
    case 'integrations':
      return InfiniteIcon
    case 'appearance':
      return PaletteIcon
  }
}

export const getFriendRequestDetails = (
  { receiver, sender }: FriendRequest,
  user?: User,
): FriendRequestDetailsType => {
  if (user?.id === receiver?.id) {
    return {
      status: 'Incoming Friend Request',
      displayName: sender.name,
      user: sender,
      incoming: true,
    }
  }

  return {
    status: 'Outgoing Friend Request',
    displayName: receiver.name,
    user: receiver,
    incoming: false,
  }
}

export const getUserFriendInstance = (authenticatedUser: User | IAuthMe, selectedFriend: Friend) =>
  authenticatedUser?.id === selectedFriend?.sender.id
    ? selectedFriend?.receiver
    : selectedFriend?.sender
