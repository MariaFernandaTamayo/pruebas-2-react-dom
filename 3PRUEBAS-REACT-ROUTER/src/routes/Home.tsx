// Home.tsx

import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";


export default function Home() {
    const auth = useAuth();

    const handleLogout = () => {
        // Limpiar la autenticación al cerrar sesión
        auth.setIsAuthenticated(false);
    };

    return (
        <DefaultLayout>
            <h1>Bienvenido a Home</h1>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </DefaultLayout>
    );
}