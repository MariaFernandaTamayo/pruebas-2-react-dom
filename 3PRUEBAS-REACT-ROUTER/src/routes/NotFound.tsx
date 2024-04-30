import { Navigate } from "react-router-dom";

export default function NotFound() {
    // Redirige automáticamente al usuario al login
    return <Navigate to="/login" />;
}