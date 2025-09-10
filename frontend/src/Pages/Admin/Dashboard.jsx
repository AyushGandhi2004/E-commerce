import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/User'
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const Dashboard = () => {
    const { user , setUser } = useContext(UserContext);
    const [isAdmin,setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const checkAdmin = async ()=>{
        try {
            const response = await api.get('/auth/admin/me');
            if(response.status == 200) setIsAdmin(true);
        } catch (error) {
            console.log("You are not an admin");
        }
    }

    useEffect(()=>{
        if(!user){
            navigate('/admin/login');
        }
        checkAdmin();
    },[user,isAdmin]);

    if(!isAdmin) return <div>Only Admins can access this page</div>
  return (
    <div className='flex flex-col justify-center items-center w-full h-screen'>
        <div className='m-4 w-full justify-center flex text-2xl'>Welcome to E-commerce Admin Portal</div>
        <div className='flex flex-col justify-center items-center w-full h-screen'>
            <div className='flex justify-around m-2 w-full h-60'>
                <div className='flex outline-1 w-[40%] rounded-3xl justify-center items-center'>Manage Products</div>
                <div className='flex outline-1 w-[40%] rounded-3xl justify-center items-center'>Manage Orders</div>
            </div>
            <div className='flex justify-around m-2 w-full h-60'>
                <div className='flex outline-1 w-[40%] rounded-3xl justify-center items-center'>Manage Users</div>
                <div className='flex outline-1 w-[40%] rounded-3xl justify-center items-center'>Manage Sellers</div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard