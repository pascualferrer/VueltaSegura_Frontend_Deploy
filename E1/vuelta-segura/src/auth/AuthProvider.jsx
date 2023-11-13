import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({children}) {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    const [token, setToken] = useState(storedToken || null);
    const [user, setUser] = useState(storedUser || null);

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", user)
    }, [token, user])

    function logout(){
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, setToken, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;