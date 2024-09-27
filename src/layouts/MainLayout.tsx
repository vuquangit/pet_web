import React from 'react'
// import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'

import { AppPage } from '@/AppPage'
import { UserSidebar } from '@/components/sidebars/UserSidebar'

function MainLayout() {
  return (
    <AppPage>
      {/* <Header /> */}
      <div className="flex h-full w-full flex-col-reverse md:flex-row">
        <UserSidebar />
        <Outlet />
      </div>
    </AppPage>
  )
}

export default MainLayout
