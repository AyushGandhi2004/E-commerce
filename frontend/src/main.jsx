// main.jsx

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import Home from './Pages/Home/Home.jsx';
import Login from './Pages/login/login.jsx';
import Register from './Pages/Register/Register.jsx';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts.jsx';
import Cart from './Pages/Cart/Cart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* The App component now acts as a layout for all nested routes */}
        <Route path="/" element={<App />}>
          <Route index element={<Home />} /> {/* The default page */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />}/>
          <Route path="/products/category/:category" element={<CategoryProducts />} />
          {/* Add other pages like cart, wishlist here */}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);