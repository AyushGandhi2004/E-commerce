

import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import NavBar from './components/NavBar/nav';
import Footer from './components/Footer/Footer';
import { UserProvider } from './context/User';
import { SearchInputProvider } from './context/SearchInput';

const App = () => {
  return (
    <UserProvider>
      <SearchInputProvider>
        <div className="bg-[var(--color-bg-primary)] min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Outlet />
          </main>
          <Footer />
        </div>
      </SearchInputProvider>
    </UserProvider>
    
  );
};

export default App;