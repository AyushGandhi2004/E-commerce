import React, { useContext,useState } from "react";
import axios from "axios";
import api from "../../api"
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";
import { Link } from "react-router-dom";
import {EyeIcon , EyeSlashIcon} from '@heroicons/react/24/outline'


const Login = ()=>{
    const {user , setUser} = useContext(UserContext);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visiblePassword , setVisiblePassword] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', 
                { username , password },
                { withCredentials: true }
            )
            if(res.status === 200){
                console.log("Login successful:", res.data);
                setUser(true);
            }else{
                console.error("Login failed:", res.message);
                setUser(false);
            }
            //lets store the token in localStorage as of now but storing it in cookies is more secure.
            //we receive the response form the login controller as:
            //res.data = {
            //    message : "Login successful",
            //    user : checkUser,
            //    accessToken : "JWT_TOKEN_STRING"
            // localStorage.setItem("accessToken", res.data.accessToken);

            setUsername("");
            setPassword("");
            if(res.data.user.role == 'admin') navigate("/admin");
            else navigate("/");
        } catch (error) {
            console.error("Incorrect Password:", error);
            setPassword("");
            setUser(false);
        }
    };



    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="m-3">
                <h1>E-commeerce</h1>
            </div>
            <form className="flex flex-col justify-between items-center mb-3 outline-1 rounded-2xl p-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} className="m-3 outline-1 rounded-md p-1 flex w-full"/>
                <div className="m-3 outline-1 rounded-md p-1 flex w-full">
                    <input type={visiblePassword?"text":"password"} placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="flex-grow outline-none bg-transparent px-2"/>
                    {!visiblePassword ? <EyeIcon className="size-6 cursor-pointer" onClick={(e)=>setVisiblePassword(true)}/> : <EyeSlashIcon className="size-6 cursor-pointer" onClick={(e)=>setVisiblePassword(false)}/>}
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded-full px-5 py-1 shadow-md">Login</button>
            </form>
            <Link to='/register' className="text-blue-500">New to E-commerce...SignUp</Link>
        </div>
    )
};

export default Login;