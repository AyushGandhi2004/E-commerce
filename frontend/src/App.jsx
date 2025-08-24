

import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import NavBar from './components/NavBar/nav';

const App = () => {
  return (
    
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <main>
        
        <Outlet />
      </main>
      {/* You can add a Footer component here later */}
    </div>
  );
};

export default App;