// Need to use the React-specific entry point to import createApi
import { IAuthRequest, IAuthResetPasswordRequest, IAuthResponse } from '@/interfaces/auth'
import { IBaseResponse } from '@/interfaces/base'
import { customBaseQuery } from '@/services/base'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IUser } from '@/interfaces/user'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'authApi',
  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    login: builder.mutation<IBaseResponse<IAuthResponse>, IAuthRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
        invalidatesTags: ['Auth'],
      }),
    }),

    getProfile: builder.query<IBaseResponse<IUser>, void>({
      query: () => ({
        url: 'auth/profile',
        method: 'GET',
        providesTags: ['Auth', { type: 'Auth', id: 'PROFILE' }],
      }),
    }),

    logout: builder.mutation<IBaseResponse<boolean>, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'DELETE',
        invalidatesTags: ['Auth'],
      }),
    }),

    resetPassword: builder.mutation<IBaseResponse<IAuthResponse>, IAuthResetPasswordRequest>({
      query: (body) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body,
        invalidatesTags: ['Auth'],
      }),
    }),

    forgotPassword: builder.mutation<IBaseResponse<{ success: boolean }>, string>({
      query: (email) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email },
        invalidatesTags: ['Auth'],
      }),
    }),

    changeAvatar: builder.mutation<IBaseResponse<{ success: boolean }>, FormData>({
      query: (formData) => ({
        url: '/auth/change-avatar',
        method: 'PATCH',
        body: formData,
        invalidatesTags: [{ type: 'Auth', id: 'PROFILE' }],
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
  useChangeAvatarMutation,
} = authApi
