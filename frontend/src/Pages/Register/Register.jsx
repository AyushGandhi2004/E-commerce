import axios from "axios";
import React from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Register = ()=>{
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
            const loginRes = await api.post('/auth/login',{
                username,
                password
            });
            if(loginRes.status === 200){
                console.log("Login Successful");
                //Storing token in localStorage
                localStorage.setItem("accessToken", loginRes.data.accessToken);
                //Redirecting to home page after successful registration and login
                navigate("/");
            }
        } catch (error) {
            if(error.status === 400){
                console.error("User  already exists");
                setPassword("");
                navigate("/login");
            }
            console.log("Error in registration:", error);
            setPassword("");
        }
    }


    return (
        <div className="flex flex-col justify-center items-center">
            <div>
                <h2>E-commerce</h2>
            </div>
            <form className="flex flex-col" onSubmit={registerHandler}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    )
};

export default Register;