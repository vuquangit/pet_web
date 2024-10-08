import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import { get } from 'lodash'

import InputField from '@/components/Form/InputField'
import { Button } from '@/components/Form'
import { useLazyOauthGoogleQuery, useLazyOauthLoginQuery } from '@/services/oauth'
import { useLoginMutation } from '@/services/auth'
import GoogleIcon from '@/assets/icons/google.svg'
import StorageService from '@/services/local-storage'
import { storageKeys } from '@/constants/storage-keys'
import { EXCEPTION_CODE } from '@/constants/errorCode'
import ERROR_MESSAGES from '@/constants/errorMessage'
import useProfile from '@/hooks/useProfile'
import { SocketContext } from '@/context/SocketContext'

interface Props {
  isLoginGoogle: boolean
}

interface GoogleLoginButtonProps {
  saveToken: (tokens: any) => void
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ saveToken }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [oauthGoogle, { isLoading: isGoogleLoading }] = useLazyOauthGoogleQuery()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [oauthLogin, { isLoading: isOauthLoginLoading }] = useLazyOauthLoginQuery()

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: process.env.APP_API_ENDPOINT + '/oauth/google',
    onSuccess: async (res) => {
      const { code } = res

      try {
        await oauthGoogle({ code }).unwrap()
      } catch (error) {
        console.log('Google login error:', error)
      }
    },
    onError: (error) => console.log(error),
  })

  const googleLoginGuard = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: process.env.APP_API_ENDPOINT + '/oauth/google/callback',
    onSuccess: async () => {
      try {
        await oauthLogin().unwrap()
      } catch (error) {
        console.log('Google login guard error:', error)
      }
    },
    onError: (error) => console.log(error),
  })

  const getGoogleTokens = () => {
    const accessToken = searchParams.get('access_token') || ''
    const refreshToken = searchParams.get('refresh_token') || ''

    if (accessToken && refreshToken) {
      saveToken({ accessToken, refreshToken })
      searchParams.delete('access_token')
      searchParams.delete('refresh_token')
      return
    }

    const code = searchParams.get('code')
    if (!code) return

    let message: string = 'Login failed'
    switch (code) {
      case EXCEPTION_CODE.USER.EMAIL_NOT_FOUND:
        message = get(ERROR_MESSAGES, EXCEPTION_CODE.USER.EMAIL_NOT_FOUND)
    }

    const autoClose = 5000
    toast(message, {
      autoClose,
    })

    // clear params
    setTimeout(() => {
      setSearchParams({ code: '' })
    }, autoClose)
  }

  useEffect(() => {
    getGoogleTokens()
  }, [])

  return (
    <div className="mt-6">
      <button
        className="btn-primary flex w-full items-center justify-center gap-2"
        onClick={() => googleLogin()}
      >
        <GoogleIcon className="h-4 w-4" />
        Sign in with Google
      </button>

      <button
        className="btn-primary mt-5 flex w-full items-center justify-center gap-2"
        onClick={() => googleLoginGuard()}
      >
        <GoogleIcon className="h-4 w-4" />
        Sign in with Google (Guard)
      </button>
    </div>
  )
}

const LoginPage: React.FC<Props> = (props) => {
  const { isLoginGoogle } = props

  const [searchParams] = useSearchParams()
  const { fetchProfile } = useProfile()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const socket = useContext(SocketContext)

  const [email, setEmail] = useState(process.env.EMAIL_INIT || '')
  const [password, setPassword] = useState(process.env.PASSWORD_INIT || '')

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email) {
      console.log('You must provide a email to log in')
    }

    // Sign in and redirect to the proper destination if successful.
    try {
      const loginResponse = await login({ email, password }).unwrap()
      const tokens = loginResponse.result?.data
      saveToken(tokens)
    } catch (error) {
      console.log('Invalid login attempt')
    }
  }

  const saveToken = async (tokens: any) => {
    console.log(socket)
    console.log(socket.connected)

    StorageService.set(storageKeys.AUTH_PROFILE, tokens)
    await fetchProfile()

    socket.connect()
    console.log(socket.connected)

    const path = searchParams.get('from') || '/'
    navigate(path)
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={onSubmit}
        >
          <InputField
            type="email"
            value={email}
            label="Email"
            placeholder="Enter your email"
            onChange={setEmail}
            dataCy="email"
          />

          <InputField
            type="password"
            value={password}
            label="Password"
            placeholder="Enter your password"
            onChange={setPassword}
            dataCy="password"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember_me"
                className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/auth/forgot-password"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
                data-cy="btn-forgot-password"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-5">
            <Button
              label="Sign in"
              type="submit"
              className="btn-primary"
              disabled={isLoading || !email || !password}
              loading={isLoading}
              dataCy="login-submit"
            />
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-500 ">Or continue with</span>
            </div>
          </div>

          {isLoginGoogle && <GoogleLoginButton saveToken={saveToken} />}
        </div>
      </div>
    </div>
  )
}

export function Component() {
  const clientId: string = process.env.GOOGLE_CLIENT_ID || ''

  if (!clientId) {
    console.error('GOOGLE_CLIENT_ID is not defined')
  }

  if (clientId) {
    return (
      <GoogleOAuthProvider clientId={clientId}>
        <LoginPage isLoginGoogle={true} />
      </GoogleOAuthProvider>
    )
  }

  return <LoginPage isLoginGoogle={false} />
}

Component.displayName = 'AboutPage'
