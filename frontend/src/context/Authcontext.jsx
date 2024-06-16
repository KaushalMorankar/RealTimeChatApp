import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL, postrequest } from "../utils/service";

export const Authcontext = createContext();

export const Authcontextprovider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [info, setinfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [logininfo, setlogininfo] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [loginerror, setloginerror] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("User");
        if (storedUser) {
            setuser(JSON.parse(storedUser));
        }
    }, []);

    const updateinfo = useCallback((newInfo) => {
        setinfo(newInfo);
    }, []);

    const signupuser = useCallback(async (e) => {
        e.preventDefault();
        
        const response = await postrequest(`${baseURL}/signup`, JSON.stringify(info));

        if (response.error) {
            setError(response.message);
        } else {
            localStorage.setItem("User", JSON.stringify(response));
            setuser(response);
            setError(null);
            navigate("/chats");
        }
    }, [info, navigate]);

    const updatelogin = useCallback((newLoginInfo) => {
        setlogininfo(newLoginInfo);
    }, []);

    const loginuser = useCallback(async (e) => {
        e.preventDefault();

        const response = await postrequest(`${baseURL}/login`, JSON.stringify(logininfo));

        if (response.error) {
            setloginerror(true);
            setError(response.message);
        } else {
            setloginerror(false);
            localStorage.setItem("User", JSON.stringify(response));
            setuser(response);
            setError(null);
            navigate("/chats");
        }
    }, [logininfo, navigate]);

    const logoutuser = useCallback(() => {
        localStorage.removeItem("User");
        setuser(null);
    }, []);

    return (
        <Authcontext.Provider
            value={{
                user,
                info,
                logininfo,
                updateinfo,
                signupuser,
                error,
                logoutuser,
                updatelogin,
                loginuser,
            }}
        >
            {children}
        </Authcontext.Provider>
    );
};
