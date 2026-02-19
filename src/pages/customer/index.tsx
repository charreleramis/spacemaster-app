import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Briefcase, CreditCard, Headphones, Settings, LogOut, Mail, Globe, BarChart3, Shield, ChevronDown, ChevronRight, Lock } from 'lucide-react';
import { useState } from 'react';
import { useCustomer } from './method';
import { useAuth } from '../../contexts/AuthContext';
import './style.scss';

export default function CustomerLayout() {
    const { menuItems, activeMenu, handleMenuClick } = useCustomer();
    const [expandedMenus, setExpandedMenus] = useState<Set<string>>(new Set());
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleSignOut = () => {
        logout();
        navigate('/signin');
    };

    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        LayoutDashboard,
        Briefcase,
        CreditCard,
        Headphones,
        Settings,
        Mail,
        Globe,
        BarChart3,
        Shield,
    };

    const toggleSubMenu = (menuId: string) => {
        setExpandedMenus((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    const isSubMenuActive = (subItems: Array<{ path: string }>) => {
        return subItems.some(subItem => activeMenu === subItem.path || activeMenu.startsWith(subItem.path));
    };

    return (
        <div className="customer-container">
            {/* Sidebar */}
            <aside className="customer-sidebar">
                <div className="customer-sidebar-header">
                    <h1 className="customer-sidebar-title">Customer Portal</h1>
                </div>
                <nav className="customer-sidebar-nav">
                    <ul className="customer-nav-list">
                        {menuItems.map((item) => {
                            const Icon = iconMap[item.icon];
                            const hasSubItems = item.subItems && item.subItems.length > 0;
                            const isExpanded = expandedMenus.has(item.id);
                            const isActive = activeMenu === item.path || (hasSubItems && isSubMenuActive(item.subItems!));
                            const isDisabled = item.disabled === true;
                            
                            return (
                                <li key={item.id} className="customer-nav-item">
                                    <button
                                        onClick={() => {
                                            if (isDisabled) return;
                                            if (hasSubItems) {
                                                toggleSubMenu(item.id);
                                            } else {
                                                handleMenuClick(item.path);
                                            }
                                        }}
                                        disabled={isDisabled}
                                        className={isActive && !isDisabled ? "customer-nav-link-active" : "customer-nav-link"}
                                        style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'space-between',
                                            width: '100%',
                                            opacity: isDisabled ? 0.5 : 1,
                                            cursor: isDisabled ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            {Icon && <Icon className="customer-nav-icon" />}
                                            <span className="customer-nav-text">{item.label}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {isDisabled && <Lock className="size-4" style={{ color: '#9ca3af' }} />}
                                            {hasSubItems && !isDisabled && (
                                                isExpanded ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />
                                            )}
                                        </div>
                                    </button>
                                    {hasSubItems && isExpanded && (
                                        <ul style={{ 
                                            listStyle: 'none', 
                                            paddingLeft: '2rem', 
                                            marginTop: '0.25rem',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem'
                                        }}>
                                            {item.subItems!.map((subItem) => {
                                                const subIsActive = activeMenu === subItem.path;
                                                return (
                                                    <li key={subItem.id}>
                                                        <button
                                                            onClick={() => handleMenuClick(subItem.path)}
                                                            className={subIsActive ? "customer-nav-link-active" : "customer-nav-link"}
                                                            style={{
                                                                padding: '0.5rem 0.75rem',
                                                                fontSize: '0.875rem',
                                                                justifyContent: 'flex-start'
                                                            }}
                                                        >
                                                            <span className="customer-nav-text">{subItem.label}</span>
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-4 border-t border-black/10">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-colors w-full text-left"
                    >
                        <LogOut className="size-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="customer-main-content">
                <div className="customer-content-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
