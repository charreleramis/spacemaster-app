import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Briefcase, LogOut } from 'lucide-react';
import { useAdmin } from './method';
import '../customer/style.scss';

export default function AdminLayout() {
    const { menuItems, activeMenu, handleMenuClick } = useAdmin();

    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        LayoutDashboard,
        Briefcase,
    };

    return (
        <div className="customer-container">
            {/* Sidebar */}
            <aside className="customer-sidebar">
                <div className="customer-sidebar-header">
                    <h1 className="customer-sidebar-title">Admin Portal</h1>
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
                <div className="p-4 border-t border-black/10">
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-black/5 transition-colors"
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

