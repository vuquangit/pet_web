import { IBaseResponse } from '@/interfaces/base'
import { UpdateStatusParams, User } from '@/interfaces/chat'
import { customBaseQuery } from '@/services/base'
import { createApi } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'userApi',
  tagTypes: ['Auth', 'AdminAccount'],

  endpoints: (builder) => ({
    search: builder.query<IBaseResponse<User[]>, string>({
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

export const { useLazySearchQuery, useUpdateStatusMessageMutation } = userApi
