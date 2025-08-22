import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx';
import Login from './Pages/login/login.jsx';
import Register from './Pages/Register/Register.jsx';
import Home from './Pages/Home/Home.jsx';
import CategoryProducts from './Pages/CategoryProducts/CategoryProducts.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/home" element={<Home />}/>
            <Route path='/products/category/:category' element={<CategoryProducts />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
