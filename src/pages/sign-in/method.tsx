// Methods and logic for SignIn page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign in logic here
        console.log('Sign in:', { email, password });
        // Navigate to customer dashboard after successful sign in
        navigate('/customer/dashboard');
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
        handleSubmit,
        togglePasswordVisibility,
        navigate,
    };
};
