import { useNavigate } from "react-router-dom";
import api from "../api";

const useApi = () => {
    const navigate = useNavigate();

    api.interceptors.response.use(
        (res)=> res,
        (error) => {
            if(error.response && error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                console.error("Unauthorized access - redirecting to login");
                localStorage.removeItem("accessToken"); // Clear token
                navigate("/login");
            }
            return Promise.reject(error);
        }
    );
    return api;
}

export default useApi;