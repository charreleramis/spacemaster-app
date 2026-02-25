import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminOrders } from './method';
import { GhostButton } from '../../../components/Buttons';
import { Table } from '../../../components/Table';
import '../../customer/style.scss';

export default function AdminOrders() {
    const navigate = useNavigate();
    const {
        orders,
        getStatusColor,
        getServiceTypeLabel,
        formatDate,
        formatAmount,
        updateOrderStatus,
    } = useAdminOrders();

    return (
        <>
            <div className="customer-support-header">
                <div>
                    <h1 className="customer-page-title">Orders</h1>
                    <p className="customer-page-description">
                        Manage and approve customer orders.
                    </p>
                </div>
            </div>

            {/* Orders Table */}
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
                            <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as 'pending' | 'approved' | 'delivered' | 'hold')}
                                className="customer-support-modal-input"
                                style={{
                                    padding: '0.375rem 0.75rem',
                                    fontSize: '0.875rem',
                                    borderRadius: '0.375rem',
                                    border: '1px solid rgba(0, 0, 0, 0.1)',
                                    backgroundColor: 'white',
                                    cursor: 'pointer',
                                    minWidth: '120px',
                                }}
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="delivered">Delivered</option>
                                <option value="hold">Hold</option>
                            </select>
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
                    {
                        key: 'action',
                        header: 'Action',
                        render: (order) => (
                            <GhostButton
                                onClick={() => navigate(`/admin/orders/${order.id}`)}
                                className="customer-service-view-button"
                            >
                                <Eye className="size-4" />
                                View
                            </GhostButton>
                        ),
                    },
                ]}
                data={orders}
                emptyMessage="No orders found."
                itemsPerPage={10}
            />
        </>
    );
}

