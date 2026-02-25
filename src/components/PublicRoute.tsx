import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PublicRouteProps {
    children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
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

    // Redirect authenticated users away from sign in/sign up pages
    if (isAuthenticated) {
        if (isAdmin()) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        if (isCustomer()) {
            return <Navigate to="/customer/dashboard" replace />;
        }
    }

    return <>{children}</>;
}

