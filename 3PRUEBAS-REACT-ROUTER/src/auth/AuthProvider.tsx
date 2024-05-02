// AuthProvider.tsx

import { useContext, createContext, useState, useEffect } from "react";

interface AuthProviderProps {
    children: React.ReactNode;
}

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void; // Función para cambiar el estado de autenticación
    logout: () => void; // Función para cerrar sesión
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setIsAuthenticated: () => {}, // Placeholder para la función setIsAuthenticated
    logout: () => {} // Placeholder para la función logout
});

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Al iniciar, verifica si hay un estado de autenticación guardado en localStorage
        const storedAuth = localStorage.getItem("isAuthenticated");
        return storedAuth ? JSON.parse(storedAuth) : false;
    });

    useEffect(() => {
        // Al cambiar el estado de autenticación, actualiza el localStorage
        localStorage.setItem("isAuthenticated", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        // Comprueba si el localStorage está vacío en cualquier momento
        const checkLocalStorage = () => {
            const storedAuth = localStorage.getItem("isAuthenticated");
            if (storedAuth === null) {
                logout(); // Si no hay ningún valor en el localStorage, cierra la sesión
            }
        };

        // Ejecuta la comprobación inicial
        checkLocalStorage();

        // Establece un event listener para detectar cambios en el localStorage
        window.addEventListener("storage", checkLocalStorage);

        // Limpia el event listener al desmontar el componente
        return () => {
            window.removeEventListener("storage", checkLocalStorage);
        };
    }, []);

    const handleSetIsAuthenticated = (value: boolean) => {
        setIsAuthenticated(value);
    };

    const logout = () => {
        setIsAuthenticated(false); // Cierra la sesión
        localStorage.removeItem("isAuthenticated"); // Elimina el estado de autenticación del localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated: handleSetIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);