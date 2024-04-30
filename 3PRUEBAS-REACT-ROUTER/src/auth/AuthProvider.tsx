import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        // Intenta obtener el estado de autenticación desde localStorage al iniciar la aplicación
        const storedAuth = localStorage.getItem("auth");
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    // Al cambiar el estado de autenticación, actualiza localStorage
    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const authContextValue: AuthContextType = {
        isAuthenticated,
        setIsAuthenticated,
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);