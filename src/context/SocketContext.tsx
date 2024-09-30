import { createContext } from 'react'
import { io } from 'socket.io-client'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'

const APP_WEBSOCKET_URL = process.env?.APP_WEBSOCKET_URL || 'http://localhost:8080'
const accessToken = StorageService.get(storageKeys.AUTH_PROFILE)?.accessToken || ''

console.log('APP_WEBSOCKET_URL:', APP_WEBSOCKET_URL)

export const socket = io(APP_WEBSOCKET_URL, {
  withCredentials: true,
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
  // parser: customParser // TODO: ???
})

export const SocketContext = createContext(socket)
