export interface IOauthRequest {
  code: string
}

export interface IOauthResponse {}

export interface IOauthLoginRequest {}

export interface IOauthLoginResponse {
  accessToken: string
  refreshToken: string
}
