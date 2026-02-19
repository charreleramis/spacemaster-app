// Methods and logic for Customer pages
import { useNavigate, useLocation } from 'react-router-dom';

export interface MenuSubItem {
    id: string;
    label: string;
    path: string;
}

export interface MenuItem {
    id: string;
    label: string;
    path: string;
    icon: string;
    subItems?: MenuSubItem[];
    disabled?: boolean;
}

export const useCustomer = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems: MenuItem[] = [
        { id: 'dashboard', label: 'Dashboard', path: '/customer/dashboard', icon: 'LayoutDashboard' },
        { id: 'service', label: 'Service', path: '/customer/service', icon: 'Briefcase' },
        { id: 'ads', label: 'Ads', path: '/customer/ads', icon: 'Image' },
        { id: 'subscription', label: 'Invoice', path: '/customer/subscription', icon: 'CreditCard' },
        { id: 'support', label: 'Support', path: '/customer/support', icon: 'Headphones' },
        { id: 'email-campaign', label: 'Email Campaign', path: '/customer/email-campaign', icon: 'Mail', disabled: true },
        { 
            id: 'website', 
            label: 'Website', 
            path: '/customer/website', 
            icon: 'Globe',
            disabled: true,
            subItems: [
                { id: 'website-analysis', label: 'Analysis', path: '/customer/website/analysis' },
                { id: 'website-design-security', label: 'Design & Security', path: '/customer/website/design-security' },
            ]
        },
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
