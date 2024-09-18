export enum CDN_URL {
  BASE = 'https://chuachat.ams3.cdn.digitaloceanspaces.com/',
  ORIGINAL = 'https://chuachat.ams3.cdn.digitaloceanspaces.com/original/',
  PREVIEW = 'https://chuachat.ams3.digitaloceanspaces.com/preview/',
}

export enum WebsocketEvents {
  VOICE_CALL_ACCEPTED = 'onVoiceCallAccepted',
  VOICE_CALL_HANG_UP = 'onVoiceCallHangUp',
  VOICE_CALL_REJECTED = 'onVoiceCallRejected',
  VIDEO_CALL_REJECTED = 'onVideoCallRejected',
}

export enum SenderEvents {
  VIDEO_CALL_INITIATE = 'onVideoCallInitiate',
  VIDEO_CALL_ACCEPT = 'videoCallAccepted',
  VOICE_CALL_INITIATE = 'onVoiceCallInitiate',
  VOICE_CALL_ACCEPT = 'onVoiceCallAccepted',
}
