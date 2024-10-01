import { ERoles } from '@/enums/roles'

export interface IAuthRequest {
  email: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
}

// Auth
export interface IAuthMe {
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

export interface IAuthResetPasswordRequest {
  token: string
  new_password: string
}
