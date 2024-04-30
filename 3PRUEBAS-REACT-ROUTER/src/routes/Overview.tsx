// Overview.tsx

import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";


export default function Overview() {
    const auth = useAuth();

    const handleLogout = () => {
        // Limpiar la autenticación al cerrar sesión
        auth.setIsAuthenticated(false);
    };

    return (
        <DefaultLayout>
            <h1>Bienvenido a Overview</h1>
            <h2>Información del Sistema</h2>
            <p>Nombre del Sistema: Sistema de Gestión Login</p>
            <p>Versión del Sistema: 1.0.0</p>
            <p>Descripción: Este es un sistema de gestión para autenticar el usuario admin@admin / admin </p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </DefaultLayout>
    );
}