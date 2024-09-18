import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BaseQueryApi } from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import { camelizeKeys, decamelizeKeys } from 'humps'
import { get, isEmpty } from 'lodash'
import { toast } from 'react-toastify'

import ERROR_MESSAGES from '@/constants/errorMessage'
import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { resetCredentials } from '@/store/auth'
import ERROR_CODE from '@/constants/errorCode'
import { ROUTER_NAMES } from '@/constants/routerNames'

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.APP_API_ENDPOINT,
  prepareHeaders: (headers) => {
    const accessToken = StorageService.get(storageKeys.AUTH_PROFILE)?.accessToken

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`)
    }
    return headers
  },
})

export const customBaseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const body = args.body instanceof FormData ? args.body : decamelizeKeys(args.body)
  const params = decamelizeKeys(args.params)
  const argsCustom = { ...args, body, params }
  const refreshToken = StorageService.get(storageKeys.AUTH_PROFILE)?.refreshToken

  let result: any = await baseQuery(argsCustom, api, extraOptions)

  if (
    result.error &&
    result.error.status === 401 &&
    result.error.data?.error?.code === ERROR_CODE.AUTH.ACCESS_TOKEN_EXPIRED
  ) {
    try {
      const refreshResult = await baseQuery(
        { url: '/auth/refresh-token', method: 'POST', body: { refresh_token: refreshToken } },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        // get new tokens
        const _refreshResult = camelizeKeys(refreshResult)
        const tokens = get(_refreshResult, 'data.result.data', {})
        StorageService.set(storageKeys.AUTH_PROFILE, tokens)

        // retry original query
        result = await baseQuery(args, api, extraOptions)
      } else {
        handleNotification(api, result)
      }
    } finally {
      //..
    }
  }
  // show notification and redirect
  else if (result.error) {
    handleNotification(api, result)
  }

  if (result.data) {
    result.data = camelizeKeys(result.data)
  }

  return result
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleNotification = (api: BaseQueryApi, result: any) => {
  const errorStatus = result.error.status
  const error = result?.error?.data?.error
  let message = ''
  let navigateTo: string | null = null

  // clear profile and token
  if (errorStatus === 401) {
    console.log('clear profile and token')
    api.dispatch(resetCredentials())
    // api.dispatch(logOut())
    StorageService.remove(storageKeys.AUTH_PROFILE)
  }

  switch (errorStatus) {
    case 400:
      message = 'Bad Request'
      break
    case 401:
      message = 'Unauthorized'
      navigateTo = ROUTER_NAMES.LOGIN
      break
    case 403:
      navigateTo = '/403'
      break
    case 500:
      message = 'Error 500'
      // navigateTo = '/500'
      break
    // default:
    //   message = ''
    //   navigateTo = null
  }

  if (!window.navigator.onLine) {
    message = 'No internet connection'
  }

  // show notification
  if (!isEmpty(error)) {
    const errorCode: string = error?.code || ''
    const messageVal = get(ERROR_MESSAGES, errorCode) || 'Something wrong'
    console.log('ERROR:', messageVal)
    toast(messageVal)
  } else if (message) {
    console.log('ERROR:', message)
    toast(message)
  }

  // redirect
  // TODO: handle redirect outside react component
  const pathname = window.location.pathname
  if (pathname !== navigateTo && navigateTo) {
    window.location.href = `${window.location.origin}${navigateTo}`
  }
}
