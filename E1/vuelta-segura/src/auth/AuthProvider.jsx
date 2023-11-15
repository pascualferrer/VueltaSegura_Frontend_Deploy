import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

function AuthProvider({children}) {
    const storedToken = localStorage.getItem("token");
    const storedID = localStorage.getItem("id");
    const storedNombre = localStorage.getItem("nombre");
    const storedTipo = localStorage.getItem("tipo");
    

    const [token, setToken] = useState(storedToken || null);
    const [id, setID] = useState(storedID || null);
    const [nombre, setNombre] = useState(storedNombre || null);
    const [tipo, setTipo] = useState(storedTipo || null);

    useEffect(() => {
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("tipo", tipo);

        
    }, [token, id])

    function logout(){
        setToken(null);
        setID(null);
        setNombre(null);
        setTipo(null);
    }

    return (
        <AuthContext.Provider value={{ token, id, setToken, setID,
        nombre, setNombre, tipo, setTipo, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;