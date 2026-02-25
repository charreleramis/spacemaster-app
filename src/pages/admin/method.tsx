// Methods and logic for Admin pages
import { useNavigate, useLocation } from 'react-router-dom';

export const useAdmin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
        { id: 'orders', label: 'Orders', path: '/admin/orders', icon: 'Briefcase' },
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

