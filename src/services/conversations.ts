import { createApi } from '@reduxjs/toolkit/query/react'

import { IBaseResponse } from '@/interfaces/base'
import {
  Conversation,
  ConversationType,
  CreateConversationParams,
  DeleteMessageParams,
  EditMessagePayload,
  FetchMessagePayload,
} from '@/interfaces/chat'
import { customBaseQuery } from '@/services/base'

export const conversationsApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'conversationsApi',
  tagTypes: ['Conversations'],

  endpoints: (builder) => ({
    checkConversationOrCreate: builder.query<IBaseResponse<Conversation>, string>({
      query: (recipientId) => ({
        url: `/exists/conversations/${recipientId}`,
        method: 'GET',
      }),
    }),

    getConversations: builder.query<IBaseResponse<Conversation[]>, void>({
      query: () => ({
        url: '/conversations',
        method: 'GET',
      }),
    }),

    getConversationsById: builder.query<IBaseResponse<Conversation>, string>({
      query: (id) => ({
        url: `/conversations/${id}`,
        method: 'GET',
      }),
    }),

    getConversationMessages: builder.query<IBaseResponse<FetchMessagePayload>, string>({
      query: (conversationId) => ({
        url: `/conversations/${conversationId}/messages`,
        method: 'GET',
      }),
    }),

    createMessage: builder.mutation<
      IBaseResponse<Conversation>,
      { id: string; type: ConversationType; data: FormData }
    >({
      query: ({ id, type, data }) => {
        const url = type === 'private' ? `/conversations/${id}/messages` : `/groups/${id}/messages`

        return {
          url,
          method: 'POST',
          body: data,
        }
      },
    }),

    postNewConversation: builder.mutation<IBaseResponse<any>, CreateConversationParams>({
      query: (data) => ({
        url: '/conversations',
        method: 'POST',
        body: data,
      }),
    }),

    deleteMessage: builder.mutation<IBaseResponse<any>, DeleteMessageParams>({
      query: ({ id, messageId }) => ({
        url: `/conversations/${id}/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),

    editMessage: builder.mutation<IBaseResponse<any>, EditMessagePayload>({
      query: ({ id, messageId, content }) => ({
        url: `/conversations/${id}/messages/${messageId}`,
        method: 'PATCH',
        body: { content },
      }),
    }),
  }),
})

export const {
  useLazyCheckConversationOrCreateQuery,
  useLazyGetConversationsQuery,
  useLazyGetConversationsByIdQuery,
  useLazyGetConversationMessagesQuery,
  useCreateMessageMutation,
  usePostNewConversationMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
} = conversationsApi
