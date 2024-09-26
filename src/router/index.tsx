import React from 'react'
import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
  redirect,
  Navigate,
} from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { RootErrorBoundary } from '@/pages/Systems/RootErrorBoundary'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { ROUTER_NAMES } from '@/constants/routerNames'

type RouteApp = {
  // ...
  children?: RouteApp[]
} & RouteObject

const setTitlePage = (title: string) => {
  document.title = 'Pet - ' + title
}

const protectedLoader = async ({ request }: LoaderFunctionArgs) => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const isAuthenticated = !!StorageService.get(storageKeys.AUTH_PROFILE)?.accessToken
  const pathname = new URL(window.location.href).pathname

  if (!isAuthenticated && pathname !== '/auth/login') {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect('/auth/login?' + params.toString())
  }
  return null
}

const loginLoader = () => {
  const isAuthenticated = !!StorageService.get(storageKeys.AUTH_PROFILE)?.accessToken
  const pathname = new URL(window.location.href).pathname

  if (isAuthenticated && pathname === '/auth/login') {
    return redirect('/')
  }
  return null
}

const publicRoutes: RouteApp[] = [
  {
    path: ROUTER_NAMES.AUTH,
    loader: loginLoader,
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        lazy: () => import('../pages/Auth/Login'), // Single route in lazy file
        loader: () => {
          setTitlePage('Login')
          return null
        },
      },
      {
        path: 'forgot-password',
        lazy: () => import('../pages/Auth/ForgotPassword'),
        loader: () => {
          setTitlePage('Forgot Password')
          return null
        },
      },
      {
        path: 'reset-password',
        lazy: () => import('../pages/Auth/ResetPassword'),
        loader: () => {
          setTitlePage('Reset Password')
          return null
        },
      },
    ],
  },
]

const protectedRoutes: RouteApp[] = [
  {
    index: true, // Default route
    async lazy() {
      // Multiple routes in lazy file
      const { HomePage } = await import('../pages/HomePage')
      return { Component: HomePage }
    },
    loader: () => {
      setTitlePage('Home')
      return null
    },
  },

  {
    path: ROUTER_NAMES.HOME,
    element: <Navigate to={ROUTER_NAMES.ROOT} />,
  },

  // Conversations page
  {
    path: ROUTER_NAMES.CONVERSATIONS,
    async lazy() {
      // Multiple routes in lazy file
      const { ConversationPage } = await import('../pages/Conversations')
      return { Component: ConversationPage }
    },
    loader: () => {
      setTitlePage('Conversation')
      return null
    },
    children: [
      {
        path: ':id',
        async lazy() {
          // Multiple routes in lazy file
          const { ConversationChannelPage } = await import('../pages/Conversations/Detail')
          return { Component: ConversationChannelPage }
        },
        loader: () => {
          setTitlePage('Conversation Detail')
          return null
        },
      },
    ],
  },

  // Friend pages
  {
    path: ROUTER_NAMES.FRIENDS,
    async lazy() {
      // Multiple routes in lazy file
      const { FriendsLayoutPage } = await import('../pages/Friends/FriendsLayoutPage')
      return { Component: FriendsLayoutPage }
    },
    loader: () => {
      setTitlePage('Friends')
      return null
    },
    children: [
      {
        path: ROUTER_NAMES.FRIEND_REQUEST,
        async lazy() {
          // Multiple routes in lazy file
          const { FriendRequestPage } = await import('../pages/Friends/FriendRequestPage')
          return { Component: FriendRequestPage }
        },
        loader: () => {
          setTitlePage('Friend Request')
          return null
        },
      },
      {
        path: ROUTER_NAMES.FRIEND_BLOCKED,
        async lazy() {
          // Multiple routes in lazy file
          const { FriendRequestBlocked } = await import('../pages/Friends/FriendRequestBlocked')
          return { Component: FriendRequestBlocked }
        },
        loader: () => {
          setTitlePage('Friend Blocked')
          return null
        },
      },
    ],
  },

  // Group pages
  {
    path: ROUTER_NAMES.GROUPS,
    async lazy() {
      // Multiple routes in lazy file
      const { GroupPage } = await import('../pages/Groups')
      return { Component: GroupPage }
    },
    loader: () => {
      setTitlePage('Groups')
      return null
    },
    children: [
      {
        path: ROUTER_NAMES.GROUP_DETAIL,
        async lazy() {
          // Multiple routes in lazy file
          const { GroupChannelPage } = await import('../pages/Groups/GroupDetail')
          return { Component: GroupChannelPage }
        },
        loader: () => {
          setTitlePage('Group Detail')
          return null
        },
      },
    ],
  },

  // ...other protected routes
]

const router = createBrowserRouter([
  {
    id: 'root',
    path: ROUTER_NAMES.ROOT,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: '',
        loader: protectedLoader,
        Component: MainLayout,
        children: protectedRoutes,
      },
      ...publicRoutes,
      {
        path: '*',
        async lazy() {
          // Multiple routes in lazy file
          const { PageNotFound } = await import('../pages/Systems/PageNotFound')
          return { Component: PageNotFound }
        },
      },
    ],
  },
])

export default router
