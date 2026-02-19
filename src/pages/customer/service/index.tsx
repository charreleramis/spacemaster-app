import { Eye, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useService } from './method';
import { GhostButton, PrimaryButton } from '../../../components/Buttons';
import { Table } from '../../../components/Table';
import '../style.scss';

export default function Service() {
    const navigate = useNavigate();
    const {
        services,
        getStatusColor,
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
                emptyMessage="No services found. Request a service to get started."
                itemsPerPage={10}
            />
        </>
    );
}
