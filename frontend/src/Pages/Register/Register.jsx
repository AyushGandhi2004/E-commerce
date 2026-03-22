import React, { useContext, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/User";
import {EyeIcon , EyeSlashIcon} from '@heroicons/react/24/outline'

const Register = ()=>{
    const {user,setUser} = useContext(UserContext);
    const [username, setUsername] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visiblePassword , setVisiblePassword] = useState(false)
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const registerHandler = async (e) => {
        e.preventDefault();
        setError("");
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
                
                // Auto login after registration
                const loginRes = await api.post('/auth/login',
                    { username,password },
                    { withCredentials : true }
                );
                if(loginRes.status === 200){
                    console.log("Login Successful");
                    setUser(true);
                    navigate("/");
                }
            } 
            else {
                console.error("Registration failed:", res.message);
                setPassword("");
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            if(error.response?.status === 400){
                console.error("User already exists");
                setPassword("");
                setUser(false);
                setError("Username or email already exists");
                navigate("/login");
            } else {
                setError("An error occurred during registration");
            }
            console.log("Error in registration:", error);
            setPassword("");
        }
    }

    return (
        <div className="auth-page page-shell px-0">
            <div className="auth-wrap">
                <aside className="auth-highlight hidden md:flex">
                    <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary-deep)]/75 font-semibold mb-3">Start Shopping Smart</p>
                    <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-text-primary)] leading-tight mb-4">
                        Create Account
                    </h1>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        Join now to track your favorites, manage orders and get a smoother shopping experience.
                    </p>
                </aside>

                <div className="card auth-card">
                    <div className="text-center mb-7 md:hidden">
                        <h1 className="text-4xl font-bold heading-gradient mb-2">Create Account</h1>
                        <p className="text-[var(--color-text-secondary)]">Join us and start shopping</p>
                    </div>

                    <form onSubmit={registerHandler} className="space-y-5">
                        {/* Error Message */}
                        {error && (
                            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Username Input */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                Username
                            </label>
                            <input
                                type="text"
                                placeholder="Choose a username"
                                value={username}
                                onChange={(e)=> setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-light)]"
                            />
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border-2 border-[var(--color-primary-light)] rounded-lg focus:outline-none focus:border-[var(--color-primary-dark)] focus:ring-4 focus:ring-[var(--color-primary-light)]/30 transition-all text-[var(--color-text-primary)] placeholder-[var(--color-text-light)]"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2">
                                Password
                            </label>
                            <div className="relative flex items-center border-2 border-[var(--color-primary-light)] rounded-lg focus-within:border-[var(--color-primary-dark)] focus-within:ring-4 focus-within:ring-[var(--color-primary-light)]/30 transition-all">
                                <input
                                    type={visiblePassword?"text":"password"}
                                    placeholder="Create a strong password"
                                    value={password}
                                    onChange={(e)=> setPassword(e.target.value)}
                                    required
                                    className="flex-grow px-4 py-3 outline-none bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-light)]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setVisiblePassword(!visiblePassword)}
                                    className="px-3 text-[var(--color-text-secondary)] hover:text-[var(--color-primary-dark)] transition-colors"
                                >
                                    {!visiblePassword ? <EyeIcon className="size-5" /> : <EyeSlashIcon className="size-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg btn-primary font-semibold text-[var(--color-primary-deep)] transition-all"
                        >
                            Create Account
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3">
                        <div className="flex-1 h-px bg-[var(--color-primary-light)]/30" />
                        <span className="text-xs text-[var(--color-text-light)]">OR</span>
                        <div className="flex-1 h-px bg-[var(--color-primary-light)]/30" />
                    </div>

                    {/* Login Link */}
                    <p className="text-center text-[var(--color-text-secondary)]">
                        Already have an account?{" "}
                        <Link to='/login' className="font-semibold text-[var(--color-primary-dark)] hover:text-[var(--color-primary-light)] transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Register;