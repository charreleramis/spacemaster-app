import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Package, FileText } from 'lucide-react';
import { useService } from './method';
import { GhostButton } from '../../../components/Buttons';
import '../style.scss';

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        getServiceById,
        getStatusColor,
        getServiceTypeLabel,
        formatDate,
    } = useService();

    const service = id ? getServiceById(id) : undefined;

    if (!service) {
        return (
            <div className="customer-service-detail">
                <div className="customer-service-detail-not-found">
                    <h2>Service Not Found</h2>
                    <p>The service you're looking for doesn't exist.</p>
                    <GhostButton onClick={() => navigate('/customer/service')}>
                        <ArrowLeft className="size-4" />
                        Back to Services
                    </GhostButton>
                </div>
            </div>
        );
    }

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="customer-service-detail">
            <div className="customer-service-detail-header">
                <GhostButton
                    onClick={() => navigate('/customer/service')}
                    className="customer-service-detail-back"
                >
                    <ArrowLeft className="size-4" />
                    Back
                </GhostButton>
                <h1 className="customer-page-title">{service.name}</h1>
            </div>

            <div className="customer-service-detail-content">
                {/* Main Info Card */}
                <div className="customer-service-detail-card">
                    <div className="customer-service-detail-card-header">
                        <h2 className="customer-service-detail-card-title">Service Information</h2>
                    </div>
                    <div className="customer-service-detail-card-body">
                        <div className="customer-service-detail-info-grid">
                            <div className="customer-service-detail-info-item">
                                <div className="customer-service-detail-info-label">
                                    <Package className="size-4" />
                                    Service Type
                                </div>
                                <div className="customer-service-detail-info-value">
                                    <span className="customer-service-type-badge">
                                        {getServiceTypeLabel(service.type)}
                                    </span>
                                </div>
                            </div>

                            <div className="customer-service-detail-info-item">
                                <div className="customer-service-detail-info-label">
                                    <FileText className="size-4" />
                                    Status
                                </div>
                                <div className="customer-service-detail-info-value">
                                    <span className={`customer-service-badge ${getStatusColor(service.status)}`}>
                                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="customer-service-detail-info-item">
                                <div className="customer-service-detail-info-label">
                                    <Calendar className="size-4" />
                                    Requested Date
                                </div>
                                <div className="customer-service-detail-info-value">
                                    {formatDateTime(service.requestedDate)}
                                </div>
                            </div>

                            <div className="customer-service-detail-info-item">
                                <div className="customer-service-detail-info-label">
                                    <Clock className="size-4" />
                                    Last Updated
                                </div>
                                <div className="customer-service-detail-info-value">
                                    {formatDateTime(service.updatedDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description Card */}
                <div className="customer-service-detail-card">
                    <div className="customer-service-detail-card-header">
                        <h2 className="customer-service-detail-card-title">Description</h2>
                    </div>
                    <div className="customer-service-detail-card-body">
                        <p className="customer-service-detail-description">{service.description}</p>
                    </div>
                </div>

                {/* Additional Details Card */}
                <div className="customer-service-detail-card">
                    <div className="customer-service-detail-card-header">
                        <h2 className="customer-service-detail-card-title">Additional Details</h2>
                    </div>
                    <div className="customer-service-detail-card-body">
                        <div className="customer-service-detail-additional">
                            <div className="customer-service-detail-additional-item">
                                <span className="customer-service-detail-additional-label">Service ID:</span>
                                <span className="customer-service-detail-additional-value">{service.id}</span>
                            </div>
                            <div className="customer-service-detail-additional-item">
                                <span className="customer-service-detail-additional-label">Service Type:</span>
                                <span className="customer-service-detail-additional-value">
                                    {getServiceTypeLabel(service.type)}
                                </span>
                            </div>
                            <div className="customer-service-detail-additional-item">
                                <span className="customer-service-detail-additional-label">Current Status:</span>
                                <span className="customer-service-detail-additional-value">
                                    {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
