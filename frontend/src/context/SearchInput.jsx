import { createContext,useState,useEffect } from "react";
import api from "../api";

const SearchInputContext = createContext();

const SearchInputProvider = ({children})=>{
    const [input,setInput] = useState("");
    const [cache,setCache] = useState({});
    const [data,setData] = useState([]);
    const [searchLoading, setSearchLoading] = useState(null);

    const search = async (input)=>{
        try {
            setSearchLoading(true);
            if(cache[input]){
                setData(cache[input]);
                console.log("Used Cache");
                return;
            }
            const res = await api.get(`/search/${input}`);
            console.log(res);
            setData(res.data.products);
            setCache((prev)=>({...prev,[input] : res.data.products}))
            console.log(data)
        } catch (error) {
            console.log("Error at search function : ",error);
            setData([]);
        }finally{
            setSearchLoading(false);
        }
    }

    // useEffect(()=>{
    //     const timer = setTimeout(search,500);
    //     return ()=>{clearTimeout(timer)};
    // },[input]);


    return (
        <SearchInputContext.Provider value={{input,setInput,cache,setCache,data,setData,search,searchLoading, setSearchLoading}}>
            {children}
        </SearchInputContext.Provider>
    )
}

export {SearchInputContext,SearchInputProvider}