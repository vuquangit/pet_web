import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'

import { useLoginMutation } from '@/services/auth'
import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import useProfile from '@/hooks/useProfile'

export function Component() {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const from = params.get('from') || '/'

  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const { fetchProfile } = useProfile()

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
      const tokens = loginResponse.data
      StorageService.set(storageKeys.AUTH_PROFILE, tokens)

      fetchProfile()

      const path = from || '/'
      navigate(path)
    } catch (error) {
      console.log('Invalid login attempt')
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="w-auto h-10 mx-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          onSubmit={onSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-default"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to='/auth/reset-password'
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  data-cy="btn-reset-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input-default"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
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
      </div>
    </div>
  )
}

Component.displayName = 'AboutPage'
