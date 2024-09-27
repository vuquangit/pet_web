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
  peer_id: string
  peer: any // TODO: add peer interface
  presence_id: string
  presence: any // TODO: add presence interface
}

export interface IAuthResetPasswordRequest {
  token: string
  new_password: string
}
