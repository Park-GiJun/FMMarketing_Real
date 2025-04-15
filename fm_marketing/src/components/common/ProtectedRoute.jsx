import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const [isChecking, setIsChecking] = useState(true);
    const { isAuthenticated, user, checkAuth } = useAuthStore();

    useEffect(() => {
        const verifyAuth = async () => {
            await checkAuth();
            setIsChecking(false);
        };

        verifyAuth();
    }, [checkAuth]);

    if (isChecking) {
        // Show loading state while checking authentication
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    // Not authenticated - redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/pc/login" replace />;
    }

    // Check role requirements if any
    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // User doesn't have the required role - redirect to unauthorized
        return <Navigate to="/pc/unauthorized" replace />;
    }

    // User is authenticated and has the required role
    return <Outlet />;
};

export default ProtectedRoute;
