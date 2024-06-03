// Need to use the React-specific entry point to import createApi
import { IAuthMe, IAuthRequest, IAuthResetPasswordRequest, IAuthResponse } from '@/interfaces/auth'
import { IBaseResponse } from '@/interfaces/base'
import { customBaseQuery } from '@/services/base'
import { createApi } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'authApi',
  tagTypes: ['Auth', 'AdminAccount'],

  endpoints: (builder) => ({
    login: builder.mutation<IBaseResponse<IAuthResponse>, IAuthRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    getProfile: builder.query<IBaseResponse<IAuthMe>, void>({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
      }),
    }),

    logout: builder.mutation<IBaseResponse<boolean>, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'DELETE',
      }),
    }),

    resetPassword: builder.mutation<IBaseResponse<IAuthResponse>, IAuthResetPasswordRequest>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
      }),
    }),

    forgotPassword: builder.mutation<IBaseResponse<{ success: boolean }>, string>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useLazyGetProfileQuery,
  useLogoutMutation,
  useResetPasswordMutation,
  useForgotPasswordMutation,
} = authApi
