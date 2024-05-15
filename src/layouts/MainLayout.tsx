import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <div className="h-full">
      <Header />
      <Outlet />
    </div>
  )
}

export default MainLayout
