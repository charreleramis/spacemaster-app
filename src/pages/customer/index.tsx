import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Briefcase, CreditCard, Headphones, Settings, LogOut } from 'lucide-react';
import { useCustomer } from './method';
import './style.scss';

export default function CustomerLayout() {
    const { menuItems, activeMenu, handleMenuClick } = useCustomer();

    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        LayoutDashboard,
        Briefcase,
        CreditCard,
        Headphones,
        Settings,
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
                            const isActive = activeMenu === item.path;
                            return (
                                <li key={item.id} className="customer-nav-item">
                                    <button
                                        onClick={() => handleMenuClick(item.path)}
                                        className={isActive ? "customer-nav-link-active" : "customer-nav-link"}
                                    >
                                        {Icon && <Icon className="customer-nav-icon" />}
                                        <span className="customer-nav-text">{item.label}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
                <div className="p-4 border-t border-white/10">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <LogOut className="size-5" />
                        <span className="font-medium">Sign Out</span>
                    </Link>
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
