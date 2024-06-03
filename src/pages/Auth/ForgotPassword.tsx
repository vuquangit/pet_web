import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useForgotPasswordMutation } from '@/services/auth'
import LoadingPage from '@/components/LoadingPage'

export function Component() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation()

  const [email, setEmail] = useState<string>('')
  const [isForgotSended, setIsForgotSended] = useState<boolean>(false)

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Sign in and redirect to the proper destination if successful.
    try {
      const res = await forgotPassword(email).unwrap()
      const isSuccess = res.result?.data?.success || false
      setIsForgotSended(isSuccess)
    } catch (error) {
      console.log('forgot password error', error)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {!isForgotSended ? (
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
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading || !email}
                  data-cy="login-submit"
                >
                  Send mail
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
      </div>

      {isLoading && <LoadingPage />}
    </>
  )
}

Component.displayName = 'ForgotPasswordPage'
