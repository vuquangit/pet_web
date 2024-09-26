import { createApi } from '@reduxjs/toolkit/query/react'

import { IBaseResponse } from '@/interfaces/base'
import {
  Group,
  FetchGroupMessagePayload,
  CreateMessageParams,
  User,
  CreateGroupParams,
  DeleteGroupMessageParams,
  DeleteGroupMessageResponse,
  GroupMessageType,
  EditMessagePayload,
  AddGroupRecipientParams,
  RemoveGroupRecipientParams,
  UpdateGroupOwnerParams,
  UpdateGroupDetailsPayload,
} from '@/interfaces/chat'
import { customBaseQuery } from '@/services/base'

export const groupApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'groupApi',
  tagTypes: ['Group'],

  endpoints: (builder) => ({
    groupList: builder.query<IBaseResponse<Group[]>, any>({
      query: () => ({
        url: '/groups',
        method: 'GET',
      }),
    }),

    getGroup: builder.query<IBaseResponse<Group>, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: 'GET',
      }),
    }),

    getGroupMessage: builder.query<IBaseResponse<FetchGroupMessagePayload>, string>({
      query: (id) => ({
        url: `/groups/${id}/messages`,
        method: 'GET',
      }),
    }),

    postGroupMessage: builder.mutation<IBaseResponse<any>, CreateMessageParams>({
      query: ({ id, content }) => ({
        url: `/groups/${id}/messages`,
        method: 'POST',
        body: content,
      }),
    }),

    searchUsers: builder.query<IBaseResponse<User[]>, string>({
      query: (query) => ({
        url: `/users/search?query=${query}`,
        method: 'GET',
      }),
    }),

    createGroup: builder.mutation<IBaseResponse<any>, CreateGroupParams>({
      query: (data) => ({
        url: '/groups',
        method: 'POST',
        body: data,
      }),
    }),

    deleteGroupMessage: builder.mutation<
      IBaseResponse<DeleteGroupMessageResponse>,
      DeleteGroupMessageParams
    >({
      query: ({ id, messageId }) => ({
        url: `/groups/${id}/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),

    editGroupMessage: builder.mutation<IBaseResponse<GroupMessageType>, EditMessagePayload>({
      query: ({ id, messageId, content }) => ({
        url: `/groups/${id}/messages/${messageId}`,
        method: 'PATCH',
        body: content,
      }),
    }),

    addGroupRecipient: builder.mutation<IBaseResponse<any>, AddGroupRecipientParams>({
      query: ({ id, userId }) => ({
        url: `/groups/${id}/recipients`,
        method: 'POST',
        body: { userId },
      }),
    }),

    removeGroupRecipient: builder.mutation<IBaseResponse<Group>, RemoveGroupRecipientParams>({
      query: ({ id, userId }) => ({
        url: `/groups/${id}/recipients/${userId}`,
        method: 'DELETE',
      }),
    }),

    updateGroupOwner: builder.mutation<IBaseResponse<any>, UpdateGroupOwnerParams>({
      query: ({ id, newOwnerId }) => ({
        url: `/groups/${id}/owner`,
        method: 'PATCH',
        body: { newOwnerId },
      }),
    }),

    leaveGroup: builder.mutation<IBaseResponse<any>, string>({
      query: (id) => ({
        url: `/groups/${id}/leave`,
        method: 'DELETE',
      }),
    }),

    updateGroupDetails: builder.mutation<IBaseResponse<any>, UpdateGroupDetailsPayload>({
      query: ({ id, data }) => ({
        url: `/groups/${id}/details`,
        method: 'PATCH',
        body: data,
      }),
    }),

    fetchGroupMessages: builder.query<IBaseResponse<FetchGroupMessagePayload>, string>({
      query: (id) => ({
        url: `/groups/${id}/messages`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useLazyGroupListQuery,
  useLazyGetGroupQuery,
  useLazyGetGroupMessageQuery,
  useLazySearchUsersQuery,
  useCreateGroupMutation,
  useDeleteGroupMessageMutation,
  useEditGroupMessageMutation,
  useAddGroupRecipientMutation,
  useRemoveGroupRecipientMutation,
  useUpdateGroupOwnerMutation,
  useLeaveGroupMutation,
  useUpdateGroupDetailsMutation,
  useLazyFetchGroupMessagesQuery,
} = groupApi
