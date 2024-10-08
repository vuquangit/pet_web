import { ConversationTypeData, SettingsItemType, UserSidebarItemType } from '@/interfaces/chat'

export const friendsNavbarItems = [
  {
    id: 'friends',
    label: 'Friends',
    pathname: '/friends',
  },
  {
    id: 'requests',
    label: 'Requests',
    pathname: '/friends/requests',
  },
  {
    id: 'blocked',
    label: 'Blocked',
    pathname: '/friends/blocked',
  },
]

export const chatTypes: ConversationTypeData[] = [
  {
    type: 'private',
    label: 'Direct Message',
  },
  {
    type: 'group',
    label: 'Group',
  },
]

export const settingsItems: SettingsItemType[] = [
  {
    id: 'profile',
    label: 'Profile',
    pathname: '/settings/profile',
  },
  {
    id: 'security',
    label: 'Security',
    pathname: '/settings/security',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    pathname: '/settings/notifications',
  },
  {
    id: 'integrations',
    label: 'Integrations',
    pathname: '/settings/integrations',
  },
  {
    id: 'appearance',
    label: 'Appearance',
    pathname: '/settings/appearance',
  },
]

export const userSidebarItems: UserSidebarItemType[] = [
  {
    id: 'home',
    pathname: '/',
    title: 'Home',
  },
  {
    id: 'conversations',
    pathname: '/conversations',
    title: 'Messages',
  },
  {
    id: 'friends',
    pathname: '/friends',
    title: 'Friends',
  },
  {
    id: 'profile',
    pathname: '/profile',
    title: 'Profile',
  },
  // {
  //   id: 'connections',
  //   pathname: '/connections',
  // },
  // {
  //   id: 'settings',
  //   pathname: '/settings',
  // },
  // {
  //   id: 'calls',
  //   pathname: '/calls',
  // },
]
