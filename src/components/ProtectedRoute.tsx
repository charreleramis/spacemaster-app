import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: 'customer' | 'admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
    const { isAuthenticated, isLoading, isCustomer, isAdmin } = useAuth();

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '1.125rem',
                color: '#6b7280'
            }}>
                Loading...
            </div>
        );
    }

    // Redirect to sign in if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Check role-based access
    if (requiredRole === 'customer' && !isCustomer()) {
        // If user is admin trying to access customer route, redirect to admin dashboard
        if (isAdmin()) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/signin" replace />;
    }

    if (requiredRole === 'admin' && !isAdmin()) {
        // If user is customer trying to access admin route, redirect to customer dashboard
        if (isCustomer()) {
            return <Navigate to="/customer/dashboard" replace />;
        }
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
}

