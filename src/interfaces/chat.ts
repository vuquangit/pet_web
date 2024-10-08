import { IUser } from './user'

export type CreateUserParams = {
  username: string
  // firstName: string
  // lastName: string
  password: string
}

export type UserCredentialsParams = {
  username: string
  password: string
}

export type Profile = {
  id: string
  about?: string
  avatar?: string
  banner?: string
}

export type UserPresence = {
  id: string
  statusMessage?: string
  showOffline: boolean
}

export type UserPeer = {
  id: string
}

export type Conversation = {
  id: string
  creator: IUser
  recipient: IUser
  createdAt: string
  lastMessageSent: MessageType
}

export type CreateConversationParams = {
  // id: string
  userId: string
  message: string
}

export type MessageAttachment = {
  key: string
}

export type MessageType = {
  id: string
  content?: string
  createdAt: string
  author: IUser
  conversation: Conversation
  attachments?: MessageAttachment[]
}

export type GroupMessageType = {
  id: string
  content?: string
  createdAt: string
  author: IUser
  group: Group
  attachments?: MessageAttachment[]
}

export type FetchMessagePayload = {
  id: string
  messages: MessageType[]
}

export type FetchGroupMessagePayload = {
  id: string
  messages: GroupMessageType[]
}

export type MessageEventPayload = {
  message: MessageType
  conversation: Conversation
}

export type CreateMessageParams = {
  id: string
  content: string
}

export type ConversationMessage = {
  id: string
  messages: MessageType[]
}

export type GroupMessage = {
  id: string
  messages: GroupMessageType[]
}

export type DeleteMessageParams = {
  id: string
  messageId: string
}

export type DeleteGroupMessageParams = {
  id: string
  messageId: string
}

export type DeleteMessageResponse = {
  conversationId: string
  messageId: string
}

export type DeleteGroupMessageResponse = {
  groupId: string
  messageId: string
}

export type MessagePanelBodyProps = {
  isTyping: boolean
}

export type EditMessagePayload = {
  id: string
  messageId: string
  content: string
}

export type ConversationType = 'group' | 'private'

export type ConversationTypeData = {
  type: ConversationType
  label: string
}

export type Group = {
  id: string
  title?: string
  users: IUser[]
  creator: IUser
  owner: IUser
  messages: GroupMessageType[]
  createdAt: number
  lastMessageSent: MessageType
  lastMessageSentAt: Date
  avatar?: string
}

export type GroupMessageEventPayload = {
  message: GroupMessageType
  group: Group
}

export type CreateGroupParams = {
  users: string[]
  title: string
}

export type AddGroupRecipientParams = {
  id: string
  // username: string;
  add_user_id: string
}

export type RemoveGroupRecipientParams = {
  id: string
  userId: string
}

export type Points = {
  x: number
  y: number
}

export type UserContextMenuActionType = 'kick' | 'transfer_owner' | 'profile'
export type ContextMenuItemType = {
  label: string
  action: UserContextMenuActionType
  color: string
  ownerOnly: boolean
}

export type AddGroupUserMessagePayload = {
  group: Group
  user: IUser
}

export type RemoveGroupUserMessagePayload = {
  group: Group
  user: IUser
}

export type UpdateGroupOwnerParams = {
  id: string
  newOwnerId: string
}

export type ContextMenuEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
export type DivMouseEvent = React.MouseEvent<HTMLDivElement, MouseEvent>
export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>
export type DragEvent = React.DragEvent<HTMLTextAreaElement>
export type ClipboardEvent = React.ClipboardEvent<HTMLTextAreaElement>
export type FormEvent = React.FormEvent<HTMLFormElement>

export type FriendRequestStatus = 'accepted' | 'pending' | 'rejected'

export type Friend = {
  id: string
  sender: IUser
  receiver: IUser
  created_at: number
}

export type FriendRequest = {
  id: string
  sender: IUser
  receiver: IUser
  created_at: number
  status: FriendRequestStatus
}

export type HandleFriendRequestAction = 'accept' | 'reject' | 'cancel'

export type CancelFriendRequestResponse = {
  id: string
}

export type AcceptFriendRequestResponse = {
  friend: Friend
  friendRequest: FriendRequest
}

export type UserSidebarRouteType =
  | 'conversations'
  | 'friends'
  | 'connections'
  | 'settings'
  | 'calls'
  | 'profile'
  | 'home'

export type UserSidebarItemType = {
  id: UserSidebarRouteType
  pathname: string
  title: string
}

export type SettingsSidebarRouteType =
  | 'profile'
  | 'security'
  | 'notifications'
  | 'integrations'
  | 'appearance'

export type SettingsItemType = {
  id: SettingsSidebarRouteType
  label: string
  pathname: string
}

export type RateLimitType = 'group' | 'private'

export type UpdateRateLimitPayload = {
  type: RateLimitType
  status: boolean
}

export type UpdateProfileParams = Partial<{
  about: string
  avatar: File
  banner: File
}>

export type Attachment = {
  id: string
  file: File
}

export type FriendRequestDetailsType = {
  status: string
  displayName: string
  user: IUser
  incoming: boolean
}

export type SystemMessageLevel = 'info' | 'warning' | 'error'
export type SystemMessageType = {
  id: number
  content: string
  level: SystemMessageLevel
}

export type UpdateStatusParams = {
  statusMessage: string
}

export type SelectableTheme = 'dark' | 'light'

export type CallPayload = {
  recipientId: string
  conversationId: string
  caller: IUser
}

export type HandleCallType = 'accept' | 'reject'

export type AcceptedCallPayload = {
  acceptor: IUser
  caller: IUser
  conversation: Conversation
}

export type SetVideoRefPayload = {
  localVideoRef?: React.RefObject<HTMLVideoElement>
  remoteVideoRef?: React.RefObject<HTMLVideoElement>
}

export type CallInitiatePayload = {
  localStream: MediaStream
  isCalling: boolean
  activeConversationId: string
  caller: IUser
  receiver: IUser
  callType: CallType
}

export type CallType = 'video' | 'audio'

export type UpdateGroupDetailsPayload = {
  id: string
  data: FormData
}

export enum UpdateGroupAction {
  NEW_MESSAGE = 'newMessage',
}

export type UpdateGroupPayload = {
  type?: UpdateGroupAction
  group: Group
}

export type GroupParticipantLeftPayload = {
  group: Group
  userId: string
}
