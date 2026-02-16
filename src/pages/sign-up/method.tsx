// Methods and logic for SignUp page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useSignUp = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign up logic here
        console.log('Sign up:', { name, phone, email, password });
        // For now, just navigate to sign in
        // navigate('/signin');
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
        handleSubmit,
        togglePasswordVisibility,
        navigate,
    };
};
