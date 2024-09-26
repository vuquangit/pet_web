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
  peer_id: string
  peer: any // TODO: add peer interface
  presence: any // TODO: add presence interface
}

export interface IAuthResetPasswordRequest {
  token: string
  new_password: string
}
