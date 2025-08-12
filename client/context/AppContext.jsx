// AppContext.jsx (rename to .jsx so Vite parses JSX)
import { useContext, createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AppContext = createContext();

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [blog, setBlog] = useState([]);
    const [input, setInput] = useState("");

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/api/blog/all");
            if (data.success) {
                setBlog(data.data);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchBlogs();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            axios.defaults.headers.common["Authorization"] = `${storedToken}`;
        }
    }, []);

    const value = {
        axios,
        navigate,
        token,
        setToken,
        blog,
        setBlog,
        input,
        setInput,
        fetchBlogs,
    };

    return (
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
