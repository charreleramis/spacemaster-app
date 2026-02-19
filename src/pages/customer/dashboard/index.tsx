import { Eye, Package, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useService } from '../service/method';
import { GhostButton } from '../../../components/Buttons';
import { Table } from '../../../components/Table';
import '../style.scss';

export default function Dashboard() {
    const navigate = useNavigate();
    const {
        services,
        getStatusColor,
        formatDate,
        formatAmount,
    } = useService();

    // Calculate statistics
    const totalDesignOrders = services.filter(s => s.type === 'design').length;
    const ordersInProgress = services.filter(s => s.status === 'pending' || s.status === 'hold').length;
    const finishedOrders = services.filter(s => s.status === 'delivered').length;

    return (
        <>
            <h1 className="customer-page-title">Dashboard</h1>
            <p className="customer-page-description">
                Welcome to your dashboard. Here you can view your account overview and recent activity.
            </p>

            {/* Statistics Cards */}
            <div className="customer-service-cards" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', marginTop: '2rem' }}>
                {/* Number of Design Orders Card */}
                <div className="customer-service-card">
                    <div className="customer-service-card-icon bg-gradient-to-br from-green-500 to-green-600" style={{ color: 'white' }}>
                        <Package className="size-6" style={{ color: 'white' }} />
                    </div>
                    <div className="customer-service-card-content">
                        <p className="customer-service-card-label">Design Orders</p>
                        <p className="customer-service-card-count">{totalDesignOrders}</p>
                    </div>
                </div>

                {/* Orders in Progress Card */}
                <div className="customer-service-card">
                    <div className="customer-service-card-icon bg-gradient-to-br from-yellow-500 to-yellow-600" style={{ color: 'white' }}>
                        <Clock className="size-6" style={{ color: 'white' }} />
                    </div>
                    <div className="customer-service-card-content">
                        <p className="customer-service-card-label">Orders in Progress</p>
                        <p className="customer-service-card-count">{ordersInProgress}</p>
                    </div>
                </div>

                {/* Finished Orders Card */}
                <div className="customer-service-card">
                    <div className="customer-service-card-icon bg-gradient-to-br from-green-500 to-green-600" style={{ color: 'white' }}>
                        <CheckCircle className="size-6" style={{ color: 'white' }} />
                    </div>
                    <div className="customer-service-card-content">
                        <p className="customer-service-card-label">Finished Orders</p>
                        <p className="customer-service-card-count">{finishedOrders}</p>
                    </div>
                </div>
            </div>

            {/* Services Table */}
            <div style={{ marginTop: '2rem' }}>
                <h2 className="customer-page-title" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                    Your Services
                </h2>
                <Table
                    columns={[
                        {
                            key: 'name',
                            header: 'Service Name',
                            className: 'customer-service-name',
                        },
                        {
                            key: 'description',
                            header: 'Description',
                            className: 'customer-service-description',
                        },
                        {
                            key: 'status',
                            header: 'Status',
                            render: (service) => (
                                <span className={`customer-service-badge ${getStatusColor(service.status)}`}>
                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                </span>
                            ),
                        },
                        {
                            key: 'requestedDate',
                            header: 'Requested Date',
                            className: 'customer-service-date',
                            render: (service) => formatDate(service.requestedDate),
                        },
                        {
                            key: 'amount',
                            header: 'Amount',
                            className: 'customer-service-date',
                            render: (service) => formatAmount(service.amount),
                        },
                        {
                            key: 'action',
                            header: 'Action',
                            render: (service) => (
                                <GhostButton
                                    onClick={() => navigate(`/customer/service/${service.id}`)}
                                    className="customer-service-view-button"
                                >
                                    <Eye className="size-4" />
                                    View
                                </GhostButton>
                            ),
                        },
                    ]}
                    data={services}
                    emptyMessage="No services found. Create a new order to get started."
                    itemsPerPage={10}
                />
            </div>
        </>
    );
}
