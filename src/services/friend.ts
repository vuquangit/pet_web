import { createApi } from '@reduxjs/toolkit/query/react'

import { IBaseResponse } from '@/interfaces/base'
import {
  FriendRequest,
  Friend,
  CancelFriendRequestResponse,
  AcceptFriendRequestResponse,
} from '@/interfaces/chat'
import { customBaseQuery } from '@/services/base'

export const friendApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'friendApi',
  tagTypes: ['Friend'],

  endpoints: (builder) => ({
    friendRequests: builder.query<IBaseResponse<FriendRequest[]>, void>({
      query: () => ({
        url: '/friends/requests',
        method: 'GET',
      }),
    }),

    friendList: builder.query<IBaseResponse<Friend[]>, void>({
      query: () => ({
        url: '/friends',
        method: 'GET',
      }),
    }),

    createFriend: builder.mutation<IBaseResponse<FriendRequest>, { userId: string }>({
      query: () => ({
        url: '/friends/requests',
        method: 'POST',
      }),
    }),

    cancelFriend: builder.mutation<IBaseResponse<CancelFriendRequestResponse>, { id: string }>({
      query: (id) => ({
        url: `/friends/requests/${id}/cancel`,
        method: 'DELETE',
      }),
    }),

    acceptFriend: builder.mutation<IBaseResponse<AcceptFriendRequestResponse>, { id: string }>({
      query: (id) => ({
        url: `/friends/requests/${id}/accept`,
        method: 'PATCH',
      }),
    }),

    rejectFriend: builder.mutation<IBaseResponse<FriendRequest>, { id: string }>({
      query: (id) => ({
        url: `/friends/requests/${id}/reject`,
        method: 'PATCH',
      }),
    }),

    removeFriend: builder.mutation<IBaseResponse<Friend>, { id: string }>({
      query: (id) => ({
        url: `/friends/${id}/delete`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useLazyFriendRequestsQuery,
  useLazyFriendListQuery,
  useCreateFriendMutation,
  useCancelFriendMutation,
  useAcceptFriendMutation,
  useRejectFriendMutation,
  useRemoveFriendMutation,
} = friendApi
