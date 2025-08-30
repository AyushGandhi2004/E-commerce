import React from "react";
import axios from "axios";
import api from "../../api"
import { useNavigate } from "react-router-dom";


const Login = ()=>{
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', {
                username,
                password
            })
            if(res.status === 200){
                console.log("Login successful:", res.data);
            }else{
                console.error("Login failed:", res.message);
            }
            //lets store the token in localStorage as of now but storing it in cookies is more secure.
            //we receive the response form the login controller as:
            //res.data = {
            //    message : "Login successful",
            //    user : checkUser,
            //    accessToken : "JWT_TOKEN_STRING"
            localStorage.setItem("accessToken", res.data.accessToken);

            setUsername("");
            setPassword("");
            navigate("/");
        } catch (error) {
            console.error("Incorrect Password:", error);
            setPassword("");
        }
    };



    return (
        <div className="flex flex-col justify-center items-center h-screen ">
            <div className="m-3">
                <h1>E-commeerce</h1>
            </div>
            <form className="flex flex-col justify-between items-center mb-3 outline-1 rounded-2xl p-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} className="m-3 outline-1 rounded-md p-1 "/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="m-3 outline-1 rounded-md p-1 "/>
                <button type="submit" className="bg-blue-500 text-white rounded-full px-5 py-1 shadow-md">Login</button>
            </form>
            <a href="/Register" className="text-blue-500">New to E-commerce...SignUp</a>
        </div>
    )
};

export default Login;