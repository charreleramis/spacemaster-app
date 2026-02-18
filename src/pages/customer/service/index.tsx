import { Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useService } from './method';
import { GhostButton, PrimaryButton } from '../../../components/Buttons';
import '../style.scss';

export default function Service() {
    const navigate = useNavigate();
    const {
        services,
        getStatusColor,
        getServiceTypeLabel,
        formatDate,
        formatAmount,
    } = useService();

    return (
        <>
            <div className="customer-support-header">
                <div>
                    <h1 className="customer-page-title">Service</h1>
                    <p className="customer-page-description">
                        Manage your services and view service details.
                    </p>
                </div>
                <PrimaryButton onClick={() => navigate('/customer/service/create')} className="customer-support-create-button">
                    <Plus className="size-4" />
                    Create Order
                </PrimaryButton>
            </div>

            {/* Services Table */}
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
                        {services.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="customer-service-empty">
                                    No services found. Request a service to get started.
                                </td>
                            </tr>
                        ) : (
                            services.map((service) => (
                                <tr key={service.id}>
                                    <td className="customer-service-name">{service.name}</td>
                                    <td>
                                        <span className="customer-service-type-badge">
                                            {getServiceTypeLabel(service.type)}
                                        </span>
                                    </td>
                                    <td className="customer-service-description">{service.description}</td>
                                    <td>
                                        <span className={`customer-service-badge ${getStatusColor(service.status)}`}>
                                            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="customer-service-date">{formatDate(service.requestedDate)}</td>
                                    <td className="customer-service-date">{formatAmount(service.amount)}</td>
                                    <td>
                                        <GhostButton
                                            onClick={() => navigate(`/customer/service/${service.id}`)}
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
