const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
}

export interface AuthResponse {
    user: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
    };
    token: string;
}

export interface SignUpData {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface SignInData {
    email: string;
    password: string;
}

// Helper function to get auth token from localStorage
export const getAuthToken = (): string | null => {
    return localStorage.getItem('authToken');
};

// Helper function to set auth token in localStorage
export const setAuthToken = (token: string): void => {
    localStorage.setItem('authToken', token);
};

// Helper function to remove auth token from localStorage
export const removeAuthToken = (): void => {
    localStorage.removeItem('authToken');
};

// Helper function to get stored user data
export const getStoredUser = (): AuthResponse['user'] | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

// Helper function to set user data in localStorage
export const setStoredUser = (user: AuthResponse['user']): void => {
    localStorage.setItem('user', JSON.stringify(user));
};

// Helper function to remove user data from localStorage
export const removeStoredUser = (): void => {
    localStorage.removeItem('user');
};

// API call function
const apiCall = async <T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> => {
    const token = getAuthToken();
    
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                message: data.message || 'An error occurred',
                error: data.error,
            };
        }

        return data;
    } catch (error) {
        return {
            success: false,
            message: 'Network error. Please check your connection.',
            error: error instanceof Error ? error.message : 'Unknown error',
        };
    }
};

// Auth API functions
export const authApi = {
    signUp: async (data: SignUpData): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiCall<AuthResponse>('/auth/signup', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (response.success && response.data) {
            setAuthToken(response.data.token);
            setStoredUser(response.data.user);
        }

        return response;
    },

    signIn: async (data: SignInData): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiCall<AuthResponse>('/auth/signin', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (response.success && response.data) {
            setAuthToken(response.data.token);
            setStoredUser(response.data.user);
        }

        return response;
    },

    signOut: (): void => {
        removeAuthToken();
        removeStoredUser();
    },
};

