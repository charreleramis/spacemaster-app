// Methods and logic for Settings page
import { useState } from 'react';

export const useSettings = () => {
    // Profile fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('user@example.com'); // Read-only
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle both profile and password update logic here
        if (newPassword && newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        console.log('Settings update:', { 
            profile: { name, phone },
            password: newPassword ? { currentPassword, newPassword } : null
        });
    };

    return {
        // Profile
        name,
        setName,
        phone,
        setPhone,
        email,
        // Password
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmPassword,
        setConfirmPassword,
        handleSubmit,
    };
};
