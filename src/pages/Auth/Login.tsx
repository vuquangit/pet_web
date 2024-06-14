import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google'

import { useLoginMutation } from '@/services/auth'
import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import InputField from '@/components/Form/InputField'
import GoogleIcon from '@/assets/icons/google.svg'
import { useLazyOauthGoogleQuery, useLazyOauthLoginQuery } from '@/services/oauth'
import { toast } from 'react-toastify'
import { EXCEPTION_CODE } from '@/constants/errorCode'
import ERROR_MESSAGES from '@/constants/errorMessage'
import { get } from 'lodash'
import useProfile from '@/hooks/useProfile'

interface Props {
  isLoginGoogle: boolean
}

const LoginPage: React.FC<Props> = (props) => {
  const { isLoginGoogle } = props

  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchProfile } = useProfile()
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [oauthGoogle, { isLoading: isGoogleLoading }] = useLazyOauthGoogleQuery()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [oauthLogin, { isLoading: isOauthLoginLoading }] = useLazyOauthLoginQuery()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
    StorageService.set(storageKeys.AUTH_PROFILE, tokens)
    await fetchProfile()

    const path = searchParams.get('from') || '/'
    navigate(path)
  }

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: process.env.GOOGLE_CLIENT_REDIRECT_URL,
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
    redirect_uri: process.env.GOOGLE_CLIENT_REDIRECT_URL_CALLBACK,
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
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            type="password"
            value={password}
            label="Password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
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
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading || !email || !password}
              data-cy="login-submit"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className=" px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {isLoginGoogle && (
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
          )}
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
