import { Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminOrders } from './method';
import { GhostButton } from '../../../components/Buttons';
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
            <div className="customer-service-table-container">
                <table className="customer-service-table">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Requested Date</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="customer-service-empty">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id}>
                                    <td className="customer-service-name">{order.name}</td>
                                    <td>
                                        <span className="customer-service-type-badge">
                                            {getServiceTypeLabel(order.type)}
                                        </span>
                                    </td>
                                    <td className="customer-service-description">{order.description}</td>
                                    <td>
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
                                    </td>
                                    <td className="customer-service-date">{formatDate(order.requestedDate)}</td>
                                    <td className="customer-service-date">{formatAmount(order.amount)}</td>
                                    <td>
                                        <GhostButton
                                            onClick={() => navigate(`/admin/orders/${order.id}`)}
                                            className="customer-service-view-button"
                                        >
                                            <Eye className="size-4" />
                                            View
                                        </GhostButton>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

