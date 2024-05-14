import {
  LoaderFunctionArgs,
  RouteObject,
  createBrowserRouter,
  redirect,
} from 'react-router-dom'

import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import { RootErrorBoundary } from '@/pages/Systems/RootErrorBoundary'

import { storageKeys } from '@/constants/storage-keys'
import StorageService from '@/services/local-storage'
import { ROUTER_NAMES } from '@/constants/routerNames'

const protectedLoader = async ({ request }: LoaderFunctionArgs) => {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const isAuthenticated = StorageService.get(storageKeys.AUTH_PROFILE)
  if (!isAuthenticated) {
    let params = new URLSearchParams()
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
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: 'login',
        lazy: () => import(`../pages/Auth/Login`), // Single route in lazy file
      },
    ],
  },
]

const protectedRoutes: RouteObject[] = [
  {
    index: true, // Default route
    loader: protectedLoader,
    errorElement: <RootErrorBoundary />,
    async lazy() {
      // Multiple routes in lazy file
      let { HomePage } = await import('../pages/HomePage')
      return { Component: HomePage }
    },
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
          let { PageNotFound } = await import('../pages/Systems/PageNotFound')
          return { Component: PageNotFound }
        },
      },
    ],
  },
])

export default router
