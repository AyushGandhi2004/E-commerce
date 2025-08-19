import React from "react";
import axios from "axios";

const Login = ()=>{
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', {
                username,
                password
            })
            if(res.status === 200){
                console.log("Login successful:", res.data);
            }else{
                console.error("Login failed:", res.message);
            }
            setUsername("");
            setPassword("");
        } catch (error) {
            console.error("Incorrect Password:", error);
            setPassword("");
        }
    };



    return (
        <div className="flex flex-col justify-center items-center h-screen mb-20">
            <div className="mb-10">
                <h1>E-commeerce</h1>
            </div>
            <form className="flex flex-col space-y-4 mb-20" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=> setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                <button type="submit" className="mb-10 pb-10">Login</button>
            </form>
        </div>
    )
};

export default Login;