// Protection.tsx
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ProtectedRoute() {
    const auth = useAuth();

    if (!auth.isAuthenticated) {
        // Redirige al usuario a la página de inicio de sesión si no está autenticado
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}