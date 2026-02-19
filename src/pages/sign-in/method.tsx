// Methods and logic for SignIn page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi, getStoredUser } from '../../utils/api';

export const useSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await authApi.signIn({
                email,
                password,
            });

            if (response.success) {
                const user = getStoredUser();
                // Navigate based on user role
                if (user?.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/customer/dashboard');
                }
            } else {
                setError(response.message || 'Sign in failed. Please check your credentials.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Sign in error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        showPassword,
        isLoading,
        error,
        handleSubmit,
        togglePasswordVisibility,
        navigate,
    };
};
