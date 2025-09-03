import axios from "axios";
import React, { useContext } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User";

const Register = ()=>{
    const {user,setUser} = useContext(UserContext);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/register', {
                username,
                email,
                password
            });
            if(res.status === 201){
                console.log("Registration successful:", res.data);
                setUsername("");
                setEmail("");
                setPassword("");
            } 
            else {
                console.error("Registration failed:", res.message);
                setPassword("");
            }
            //Registration step is just for registering the user in database this does not mean the user is logged in.
            //So lets make the user logged in here itself by implementing login functionality.
            //We can do this by calling the login API with the same credentials.
            const loginRes = await api.post('/auth/login',
                { username,password },
                { withCredentials : true }
            );
            if(loginRes.status === 200){
                console.log("Login Successful");
                setUser(true);
                //Storing token in localStorage
                //localStorage.setItem("accessToken", loginRes.data.accessToken);
                //Redirecting to home page after successful registration and login
                navigate("/");
            }
        } catch (error) {
            if(error.status === 400){
                console.error("User  already exists");
                setPassword("");
                setUser(false);
                navigate("/login");
            }
            console.log("Error in registration:", error);
            setPassword("");
        }
    }


    return (
        <div className="flex flex-col justify-center items-center align-middle h-screen w-full">
            <div className="m-3">
                <h2>E-commerce</h2>
            </div>
            <form className="flex flex-col justify-between items-center mb-3 outline-1 rounded-2xl p-4" onSubmit={registerHandler}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} className="m-3 outline-1 rounded-md p-1 "/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} className="m-3 outline-1 rounded-md p-1 " />
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} className="m-3 outline-1 rounded-md p-1 "/>
                <button type="submit" className="bg-blue-500 text-white rounded-full px-5 py-1 shadow-md">Register</button>
            </form>
            <Link to='/login' className="text-blue-500">Already a User...LogIn</Link>
        </div>
    )
};

export default Register;