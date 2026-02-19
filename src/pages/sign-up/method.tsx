// Methods and logic for SignUp page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

export const useSignUp = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await authApi.signUp({
                name,
                phone,
                email,
                password,
            });

            if (response.success && response.data) {
                // Update auth context
                login(response.data.user, response.data.token);
                // Navigate based on role
                if (response.data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/customer/dashboard');
                }
            } else {
                setError(response.message || 'Sign up failed. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Sign up error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return {
        name,
        setName,
        phone,
        setPhone,
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
