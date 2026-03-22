import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Outlet } from 'react-router-dom'
import { UserProvider } from '../../context/User'
import { SearchInputProvider } from '../../context/SearchInput'
//import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        

const AdminApp = () => {
  return (
    <>
      
        <SearchInputProvider>
          <UserProvider>
              <AdminNavBar/>
              <Outlet/>
          </UserProvider>
        </SearchInputProvider>
      
      
      
        
    </>
  )
}

export default AdminApp