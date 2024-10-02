import { createApi } from '@reduxjs/toolkit/query/react'

import { IBaseResponse } from '@/interfaces/base'
import {
  FriendRequest,
  Friend,
  CancelFriendRequestResponse,
  AcceptFriendRequestResponse,
  User,
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

    createFriend: builder.mutation<IBaseResponse<FriendRequest>, { request_id: string }>({
      query: (data) => ({
        url: '/friends/requests',
        method: 'POST',
        body: data,
      }),
    }),

    cancelFriend: builder.mutation<IBaseResponse<CancelFriendRequestResponse>, string>({
      query: (id) => ({
        url: `/friends/requests/${id}/cancel`,
        method: 'DELETE',
      }),
    }),

    acceptFriend: builder.mutation<IBaseResponse<AcceptFriendRequestResponse>, string>({
      query: (id) => ({
        url: `/friends/requests/${id}/accept`,
        method: 'PATCH',
      }),
    }),

    rejectFriend: builder.mutation<IBaseResponse<FriendRequest>, string>({
      query: (id) => ({
        url: `/friends/requests/${id}/reject`,
        method: 'PATCH',
      }),
    }),

    removeFriend: builder.mutation<IBaseResponse<Friend>, string>({
      query: (id) => ({
        url: `/friends/${id}/delete`,
        method: 'DELETE',
      }),
    }),

    searchFriends: builder.query<IBaseResponse<User[]>, string>({
      query: (query) => ({
        url: `/friends/search?query=${query}`,
        method: 'GET',
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
  useLazySearchFriendsQuery,
} = friendApi
