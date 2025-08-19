import axios from "axios";
import React from "react";

const Register = ()=>{
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const registerHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/auth/register', {
                username,
                email,
                password
            });
            if(res.status === 201){
                console.log("Registration successful:", res.data);
                setUsername("");
                setEmail("");
                setPassword("");
            } else {
                console.error("Registration failed:", res.message);
                setPassword("");
            }
        } catch (error) {
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