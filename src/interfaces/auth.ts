export interface IAuthRequest {
  email: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  refreshToken: string
}
export interface IAuthResetPasswordRequest {
  token: string
  new_password: string
}
