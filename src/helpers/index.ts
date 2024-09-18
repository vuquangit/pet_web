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
import PersonIcon from '@/assets/icons/person.svg'
import Gear from '@/assets/icons/gear.svg'
import VideoIcon from '@/assets/icons/video.svg'
import Person from '@/assets/icons/person.svg'
import LockIcon from '@/assets/icons/lock.svg'
import BellIcon from '@/assets/icons/bell.svg'
import InfiniteIcon from '@/assets/icons/infinity.svg'
import PaletteIcon from '@/assets/icons/palette.svg'

export const getRecipientFromConversation = (conversation?: Conversation, user?: User) => {
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

export const isGroupOwner = (user?: User, group?: Group) => user?.id === group?.owner.id

export const getUserSidebarIcon = (id: UserSidebarRouteType) => {
  switch (id) {
    case 'conversations':
      return CommentDotsIcon
    case 'friends':
      return PersonIcon
    case 'connections':
      return RotateIcon
    case 'settings':
      return Gear
    case 'calls':
      return VideoIcon
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
  if (user?.id === receiver.id) {
    return {
      status: 'Incoming Friend Request',
      displayName: `${sender.firstName} ${sender.lastName}`,
      user: sender,
      incoming: true,
    }
  }

  return {
    status: 'Outgoing Friend Request',
    displayName: `${receiver.firstName} ${receiver.lastName}`,
    user: receiver,
    incoming: false,
  }
}

export const getUserFriendInstance = (authenticatedUser: User, selectedFriend: Friend) =>
  authenticatedUser?.id === selectedFriend?.sender.id
    ? selectedFriend?.receiver
    : selectedFriend?.sender
