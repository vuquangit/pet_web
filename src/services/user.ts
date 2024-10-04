import { IBaseResponse } from '@/interfaces/base'
import { UpdateStatusParams } from '@/interfaces/chat'
import { customBaseQuery } from '@/services/base'
import { createApi } from '@reduxjs/toolkit/query/react'
import { IAuthMe } from '@/interfaces/auth'

export const userApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'userApi',
  tagTypes: ['User'],

  endpoints: (builder) => ({
    getList: builder.query<IBaseResponse<IAuthMe[]>, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    }),

    getUser: builder.query<IBaseResponse<IAuthMe>, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
    }),

    updateUser: builder.mutation<IBaseResponse<IAuthMe>, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
    }),

    search: builder.query<IBaseResponse<IAuthMe[]>, string>({
      query: (query) => ({
        url: `/users/search?query=${query}`,
        method: 'GET',
      }),
    }),

    updateStatusMessage: builder.mutation<IBaseResponse<any>, UpdateStatusParams>({
      query: (data) => ({
        url: '/users/presence/status',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
})

export const {
  useLazyGetListQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
  useLazySearchQuery,
  useUpdateStatusMessageMutation,
} = userApi
