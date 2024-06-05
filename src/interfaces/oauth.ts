export interface IOauthRequest {
  code: string
}

export interface IOauthResponse {}

export interface IOauthLoginRequest {
  id_token: string
  access_token_oauth: string
}

export interface IOauthLoginResponse {
  access_token: string
  refresh_token: string
}
