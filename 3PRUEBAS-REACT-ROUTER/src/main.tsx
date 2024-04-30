import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './routes/Home.tsx';
import Login from './routes/Login.tsx';
import Contact from './routes/Contact.tsx';
import Overview from './routes/Overview.tsx';
import ProtectedRoute from './routes/Protection.tsx';
import { AuthProvider } from './auth/AuthProvider.tsx';

// Importa el componente NotFound
import NotFound from './routes/NotFound.tsx';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/overview",
        element: <Overview />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  },
  // Ruta para cualquier otra URL no definida, redirige al componente NotFound
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
  
);