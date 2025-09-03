import { Children, createContext, useEffect, useState } from "react";
import api from "../api";


const UserContext = createContext();
const UserProvider = ({children}) => {
    const [user , setUser] = useState(null);

    useEffect(()=>{
        const checkAuth = async ()=>{
            try {
                const response =await api.get('/auth/me');
                if(response.status==200) setUser(true);
                else setUser(false)
            } catch (error) {
                setUser(false);
            }
        }
        checkAuth();
    },[]);

    return (
        <UserContext.Provider value={{user ,setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export {UserContext,UserProvider}