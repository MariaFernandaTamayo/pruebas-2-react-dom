import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Estado para manejar el mensaje de error
    const auth = useAuth();

    const handleLogin = () => {
        // Verificar las credenciales del usuario administrador
        if (email === "admin@admin.com" && password === "admin") {
            auth.setIsAuthenticated(true); // Establecer autenticación
        } else {
            setError("Credenciales incorrectas. Por favor, inténtalo de nuevo."); // Establecer mensaje de error
        }
    };

    if (auth.isAuthenticated) {
        return <Navigate to="/" />; // Redirigir a la raíz después de iniciar sesión
    }

    return (
        <form>
            <h1>Login</h1>
            <label>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Mostrar mensaje de error si hay uno */}
            <button type="button" onClick={handleLogin}>Login</button>
        </form>
    );
}