import React from 'react'
import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import { AppPage } from '@/AppPage'

function MainLayout() {
  return (
    <AppPage>
      <div className="h-full">
        <Header />
        <Outlet />
      </div>
    </AppPage>
  )
}

export default MainLayout
