import { IBaseResponse } from '@/interfaces/base'
import { customBaseQuery } from '@/services/base'
import { createApi } from '@reduxjs/toolkit/query/react'

export const testApi = createApi({
  baseQuery: customBaseQuery,
  reducerPath: 'testApi',
  tagTypes: ['Test'],

  endpoints: (builder) => ({
    testUnauthenticated: builder.query<IBaseResponse<any>, void>({
      query: () => ({
        url: 'test/unauthenticated',
        method: 'GET',
      }),
    }),
  }),
})

export const { useLazyTestUnauthenticatedQuery } = testApi
