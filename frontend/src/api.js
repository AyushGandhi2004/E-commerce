import axios from "axios";

const api = axios.create({
    baseURL: process.env.NODE_ENV === "production"? import.meta.env.VITE_API_URL : "http://localhost:3000/api",
    withCredentials : true
});

// Add a request interceptor to include the token in headers...this is necessary for local storage only in cookies browser automatically attaches cookies everywhere:

// api.interceptors.request.use((config)=>{
//     const accessToken = localStorage.getItem("accessToken");
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;
// });


export default api;