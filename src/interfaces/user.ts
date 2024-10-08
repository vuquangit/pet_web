import { ERoles } from '@/enums/roles'

export interface IUser {
  id: string
  name: string
  email: string
  role: ERoles
  username: string
  peerId: string
  peer: any // TODO: add peer interface
  presenceId: string
  presence: any // TODO: add presence interface
  avatarUrl: string
}
