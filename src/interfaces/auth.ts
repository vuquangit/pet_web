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
}

export interface IAuthResetPasswordRequest {
  token: string
  new_password: string
}
