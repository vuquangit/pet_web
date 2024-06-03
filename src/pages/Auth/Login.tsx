import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'

import { useLoginMutation } from '@/services/auth'
import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import InputField from '@/components/Form/InputField'
import { currentTheme } from '@/store/theme'
import { useAppSelector } from '@/store/hook'
import { ETheme } from '@/enums/theme'

export function Component() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/'
  const clientId: string = process.env.GOOGLE_CLIENT_ID || ''

  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const theme = useAppSelector(currentTheme)

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
      StorageService.set(storageKeys.AUTH_PROFILE, tokens)

      const path = from || '/'
      navigate(path)
    } catch (error) {
      console.log('Invalid login attempt')
    }
  }

  const loginGoogleSuccess = (response: any) => {
    console.log(response)
  }

  const loginGoogleError = () => {
    console.log('Login error')
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
            label="New password"
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

          <div className="mt-6">
            <GoogleOAuthProvider clientId={clientId}>
              <GoogleLogin
                theme={theme === ETheme.DARK ? 'filled_black' : 'filled_blue'}
                onSuccess={loginGoogleSuccess}
                onError={loginGoogleError}
              ></GoogleLogin>
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

Component.displayName = 'AboutPage'
