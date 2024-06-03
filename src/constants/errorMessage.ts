const errorMessage = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  500: 'Internal Server Error',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  429: 'Too Many Requests',
  422: 'Unprocessable Entity',
  ACCESS_TOKEN_EXPIRED: 'Access token expired',
  'USER.EMAIL_NOT_FOUND': 'User email not found',
  'USER.EMAIL_EXIST': 'User email exist',
  'USER.WRONG_PASSWORD': 'Wrong password',
  'USER.ID_NOT_FOUND': 'User id not found',
  'USER.ROLE_INVALID': 'Role invalid',
  'USER.INVALID_RESET_TOKEN': 'Invalid reset token',
  'OAUTH.CODE_NOT_FOUND': 'Oauth code not found',
  'NOTIFICATION.ID_NOT_FOUND': 'Notification id not found',
  'AUTH.ACCESS_TOKEN_EXPIRED': 'Access token expired',
}

export default errorMessage
