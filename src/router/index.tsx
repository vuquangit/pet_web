import React from 'react'
import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
  redirect,
  Navigate
} from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
// import { RootErrorBoundary } from '@/pages/Systems/RootErrorBoundary'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { ROUTER_NAMES } from '@/constants/routerNames'

const protectedLoader = async ({ request }: LoaderFunctionArgs) => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const isAuthenticated = StorageService.get(storageKeys.AUTH_PROFILE)
  if (!isAuthenticated) {
    const params = new URLSearchParams()
    params.set('from', new URL(request.url).pathname)
    return redirect('/auth/login?' + params.toString())
  }
  return null
}

const loginLoader = () => {
  const isAuthenticated = StorageService.get(storageKeys.AUTH_PROFILE)

  if (isAuthenticated) {
    return redirect('/')
  }
  return null
}

const publicRoutes: RouteObject[] = [
  {
    path: ROUTER_NAMES.AUTH,
    loader: loginLoader,
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        lazy: () => import('../pages/Auth/Login'), // Single route in lazy file
      },
      {
        path: 'reset-password',
        lazy: () => import('../pages/Auth/ResetPassword'), // Single route in lazy file
      },
    ],
  },
]

const protectedRoutes: RouteObject[] = [
  {
    index: true, // Default route
    async lazy() {
      // Multiple routes in lazy file
      const { HomePage } = await import('../pages/HomePage')
      return { Component: HomePage }
    },
  },
  {
    path: ROUTER_NAMES.HOME,
    element: <Navigate to={ROUTER_NAMES.ROOT} />,
  },
  {
    path: ROUTER_NAMES.REACT,
    async lazy() {
      // Multiple routes in lazy file
      const { ReactPage } = await import('../pages/React')
      return { Component: ReactPage }
    },
  },
  // ...other protected routes
]

const router = createBrowserRouter([
  {
    id: 'root',
    path: ROUTER_NAMES.ROOT,
    // errorElement: <RootErrorBoundary />,
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
