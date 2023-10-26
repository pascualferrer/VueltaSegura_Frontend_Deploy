import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Nuevo estado para indicar si la información del usuario está cargando

    const loginUser = (userData) => {
        setUser(userData);
    };
    
    const logoutUser = () => {
        setUser(null);
    };

    useEffect(() => {
        // Si hay un usuario, no estamos cargando
        setLoading(!user);
    }, [user]);
    
    const value = {
        user,
        loginUser,
        logoutUser,
        loading, // Agregar loading al contexto
    };

    return (
        <UserContext.Provider value={ value }>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}