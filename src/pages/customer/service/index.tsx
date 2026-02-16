import { Palette, Globe, Smartphone, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useService } from './method';
import { GhostButton } from '../../../components/Buttons';
import '../style.scss';

export default function Service() {
    const navigate = useNavigate();
    const {
        services,
        serviceCounts,
        getStatusColor,
        getServiceTypeLabel,
        formatDate,
    } = useService();

    const countCards = [
        {
            type: 'design' as const,
            label: 'Design',
            count: serviceCounts.design,
            icon: Palette,
            color: 'from-purple-500 to-purple-600',
        },
        {
            type: 'website' as const,
            label: 'Website',
            count: serviceCounts.website,
            icon: Globe,
            color: 'from-blue-500 to-blue-600',
        },
        {
            type: 'application' as const,
            label: 'Application',
            count: serviceCounts.application,
            icon: Smartphone,
            color: 'from-indigo-500 to-indigo-600',
        },
    ];

    return (
        <>
            <h1 className="customer-page-title">Service</h1>
            <p className="customer-page-description">
                Manage your services and view service details.
            </p>

            {/* Service Count Cards */}
            <div className="customer-service-cards">
                {countCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.type} className="customer-service-card">
                            <div className={`customer-service-card-icon bg-gradient-to-br ${card.color}`}>
                                <Icon className="size-6" />
                            </div>
                            <div className="customer-service-card-content">
                                <p className="customer-service-card-label">{card.label}</p>
                                <p className="customer-service-card-count">{card.count}</p>
                            </div>
                        </div>
                    );
                })}
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
                            <th>Last Updated</th>
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
                                    <td className="customer-service-date">{formatDate(service.updatedDate)}</td>
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
