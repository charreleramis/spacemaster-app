import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getStoredUser, getAuthToken, authApi, type AuthResponse } from '../utils/api';

interface AuthContextType {
    user: AuthResponse['user'] | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (user: AuthResponse['user'], token: string) => void;
    logout: () => void;
    isCustomer: () => boolean;
    isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthResponse['user'] | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for stored authentication on mount
        const storedUser = getStoredUser();
        const storedToken = getAuthToken();

        if (storedUser && storedToken) {
            setUser(storedUser);
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const login = (userData: AuthResponse['user'], authToken: string) => {
        setUser(userData);
        setToken(authToken);
    };

    const logout = () => {
        authApi.signOut();
        setUser(null);
        setToken(null);
    };

    const isCustomer = () => {
        return user?.role === 'customer';
    };

    const isAdmin = () => {
        return user?.role === 'admin';
    };

    const value: AuthContextType = {
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        isCustomer,
        isAdmin,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

