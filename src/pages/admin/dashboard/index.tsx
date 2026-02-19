import { Users, DollarSign, CheckCircle, Clock, Briefcase, User } from 'lucide-react';
import { useAdminDashboard } from './method';
import { Table } from '../../../components/Table';
import '../../customer/style.scss';

export default function AdminDashboard() {
    const {
        registeredUsers,
        totalSales,
        approvedOrders,
        pendingOrders,
        activeTab,
        setActiveTab,
        orders,
        users,
        pendingOrdersList,
        formatAmount,
        getServiceTypeLabel,
        formatDate,
    } = useAdminDashboard();

    const cards = [
        {
            id: 'users',
            label: 'Registered Users',
            count: registeredUsers,
            icon: Users,
            color: 'from-blue-500 to-blue-600',
        },
        {
            id: 'sales',
            label: 'Total Sales',
            count: formatAmount(totalSales),
            icon: DollarSign,
            color: 'from-green-500 to-green-600',
            isAmount: true,
        },
        {
            id: 'approved',
            label: 'Approved Orders',
            count: approvedOrders,
            icon: CheckCircle,
            color: 'from-green-500 to-green-600',
        },
        {
            id: 'pending',
            label: 'Pending Orders',
            count: pendingOrders,
            icon: Clock,
            color: 'from-yellow-500 to-yellow-600',
        },
    ];

    return (
        <>
            <h1 className="customer-page-title">Dashboard</h1>
            <p className="customer-page-description">
                Welcome to the admin dashboard. Here you can view orders overview and manage the system.
            </p>

            {/* Dashboard Cards */}
            <div className="customer-service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.id} className="customer-service-card">
                            <div className={`customer-service-card-icon bg-gradient-to-br ${card.color}`} style={{ color: 'white' }}>
                                <Icon className="size-6" style={{ color: 'white' }} />
                            </div>
                            <div className="customer-service-card-content">
                                <p className="customer-service-card-label">{card.label}</p>
                                <p className="customer-service-card-count">{card.count}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Tabs */}
            <div style={{ marginTop: '2rem' }}>
                <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                    marginBottom: '1.5rem'
                }}>
                    <button
                        onClick={() => setActiveTab('orders')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'orders' ? '2px solid #22c55e' : '2px solid transparent',
                            color: activeTab === 'orders' ? '#111827' : '#6b7280',
                            fontWeight: activeTab === 'orders' ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Briefcase className="size-4" />
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'users' ? '2px solid #22c55e' : '2px solid transparent',
                            color: activeTab === 'users' ? '#111827' : '#6b7280',
                            fontWeight: activeTab === 'users' ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <User className="size-4" />
                        Users
                    </button>
                    <button
                        onClick={() => setActiveTab('pending')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'pending' ? '2px solid #22c55e' : '2px solid transparent',
                            color: activeTab === 'pending' ? '#111827' : '#6b7280',
                            fontWeight: activeTab === 'pending' ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Clock className="size-4" />
                        Pending Orders
                    </button>
                </div>

                {/* Tab Content */}
                <div className="customer-service-detail-card">
                    {activeTab === 'orders' && (
                        <div>
                            <div className="customer-service-detail-card-header">
                                <h2 className="customer-service-detail-card-title">All Orders</h2>
                            </div>
                            <div className="customer-service-detail-card-body" style={{ padding: 0 }}>
                                <Table
                                    columns={[
                                        {
                                            key: 'name',
                                            header: 'Service Name',
                                            className: 'customer-service-name',
                                        },
                                        {
                                            key: 'type',
                                            header: 'Type',
                                            render: (order) => (
                                                <span className="customer-service-type-badge">
                                                    {getServiceTypeLabel(order.type)}
                                                </span>
                                            ),
                                        },
                                        {
                                            key: 'description',
                                            header: 'Description',
                                            className: 'customer-service-description',
                                        },
                                        {
                                            key: 'status',
                                            header: 'Status',
                                            render: (order) => (
                                                <span className={`customer-service-badge ${order.status === 'pending' ? 'text-yellow-600 bg-yellow-100' : order.status === 'approved' ? 'text-blue-600 bg-blue-100' : order.status === 'delivered' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100'}`}>
                                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                </span>
                                            ),
                                        },
                                        {
                                            key: 'requestedDate',
                                            header: 'Requested Date',
                                            className: 'customer-service-date',
                                            render: (order) => formatDate(order.requestedDate),
                                        },
                                        {
                                            key: 'amount',
                                            header: 'Amount',
                                            className: 'customer-service-date',
                                            render: (order) => formatAmount(order.amount),
                                        },
                                    ]}
                                    data={orders}
                                    emptyMessage="No orders found."
                                    itemsPerPage={10}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div>
                            <div className="customer-service-detail-card-header">
                                <h2 className="customer-service-detail-card-title">Registered Users</h2>
                            </div>
                            <div className="customer-service-detail-card-body" style={{ padding: 0 }}>
                                <Table
                                    columns={[
                                        {
                                            key: 'name',
                                            header: 'Name',
                                            className: 'customer-service-name',
                                        },
                                        {
                                            key: 'email',
                                            header: 'Email',
                                            className: 'customer-service-description',
                                        },
                                        {
                                            key: 'registeredDate',
                                            header: 'Registered Date',
                                            className: 'customer-service-date',
                                            render: (user) => formatDate(user.registeredDate),
                                        },
                                        {
                                            key: 'ordersCount',
                                            header: 'Orders Count',
                                            className: 'customer-service-date',
                                        },
                                        {
                                            key: 'totalSpent',
                                            header: 'Total Spent',
                                            className: 'customer-service-date',
                                            render: (user) => formatAmount(user.totalSpent),
                                        },
                                    ]}
                                    data={users}
                                    emptyMessage="No users found."
                                    itemsPerPage={10}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'pending' && (
                        <div>
                            <div className="customer-service-detail-card-header">
                                <h2 className="customer-service-detail-card-title">Pending Orders</h2>
                            </div>
                            <div className="customer-service-detail-card-body" style={{ padding: 0 }}>
                                <Table
                                    columns={[
                                        {
                                            key: 'name',
                                            header: 'Service Name',
                                            className: 'customer-service-name',
                                        },
                                        {
                                            key: 'type',
                                            header: 'Type',
                                            render: (order) => (
                                                <span className="customer-service-type-badge">
                                                    {getServiceTypeLabel(order.type)}
                                                </span>
                                            ),
                                        },
                                        {
                                            key: 'description',
                                            header: 'Description',
                                            className: 'customer-service-description',
                                        },
                                        {
                                            key: 'requestedDate',
                                            header: 'Requested Date',
                                            className: 'customer-service-date',
                                            render: (order) => formatDate(order.requestedDate),
                                        },
                                        {
                                            key: 'amount',
                                            header: 'Amount',
                                            className: 'customer-service-date',
                                            render: (order) => formatAmount(order.amount),
                                        },
                                    ]}
                                    data={pendingOrdersList}
                                    emptyMessage="No pending orders found."
                                    itemsPerPage={10}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

