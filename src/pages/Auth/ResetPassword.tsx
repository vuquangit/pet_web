import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { useResetPasswordMutation } from '@/services/auth'
import { toast } from 'react-toastify'
import LoadingPage from '@/components/LoadingPage'
import InputField from '@/components/Form/InputField'

export function Component() {
  const [resetPassword, { isLoading }] = useResetPasswordMutation()
  const [searchParams] = useSearchParams()
  const token: string = searchParams.get('token') || ''

  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [isResetSended, setIsResetSended] = useState<boolean>(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!token) {
      toast('Invalid token')
    }

    // Sign in and redirect to the proper destination if successful.
    try {
      await resetPassword({ token, new_password: password }).unwrap()
      setIsResetSended(true)
    } catch (error) {
      console.log('reset password error', error)
    }
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Reset Password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!isResetSended ? (
          <form
            className="space-y-6"
            onSubmit={onSubmit}
          >
            <InputField
              type="password"
              value={password}
              label="New password"
              placeholder="Enter new password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <InputField
              type="password"
              value={confirmPassword}
              label="Confirm password"
              placeholder="Confirm new password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex flex-col justify-center gap-5">
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading || !password || password !== confirmPassword}
                data-cy="login-submit"
              >
                Change Password
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col justify-center gap-5">
            <p className="text-center text-sm text-gray-500">
              Please enter your email address and we will send you a link to reset your password.
            </p>

            <Link
              to="/auth/login"
              className="text-center text-sm text-gray-500"
            >
              <button
                type="button"
                className="btn-primary"
              >
                Back to login
              </button>
            </Link>
          </div>
        )}
      </div>

      {isLoading && <LoadingPage />}
    </div>
  )
}

Component.displayName = 'ResetPasswordPage'
