import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../../context/User'

const AdminApp = () => {
  return (
    <>
      <UserProvider>
          <AdminNavBar/>
          <Outlet/>
      </UserProvider>
        
    </>
  )
}

export default AdminApp