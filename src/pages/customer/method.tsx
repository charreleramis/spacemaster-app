// Methods and logic for Customer pages
import { useNavigate, useLocation } from 'react-router-dom';

export const useCustomer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', path: '/customer/dashboard', icon: 'LayoutDashboard' },
        { id: 'service', label: 'Service', path: '/customer/service', icon: 'Briefcase' },
        { id: 'subscription', label: 'Subscription', path: '/customer/subscription', icon: 'CreditCard' },
        { id: 'support', label: 'Support', path: '/customer/support', icon: 'Headphones' },
        { id: 'settings', label: 'Settings', path: '/customer/settings', icon: 'Settings' },
    ];

    const handleMenuClick = (path: string) => {
        navigate(path);
    };

    const activeMenu = location.pathname;

    return {
        menuItems,
        activeMenu,
        handleMenuClick,
        navigate,
    };
};
