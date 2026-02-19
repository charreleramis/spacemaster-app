import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useService } from './method';
import { GhostButton } from '../../../components/Buttons';
import { OrderForm } from './components/OrderForm';
import '../style.scss';

export default function ServiceDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        getServiceById,
        getServiceTypeLabel,
        formatAmount,
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
                {/* Order Form in View Mode */}
                <div className="customer-service-detail-card">
                    <div className="customer-service-detail-card-header">
                        <h2 className="customer-service-detail-card-title">Order Details</h2>
                    </div>
                    <div className="customer-service-detail-card-body">
                        <OrderForm
                            mode="view"
                            data={{
                                serviceName: service.name,
                                serviceType: service.type,
                                numberOfScreens: service.numberOfScreens,
                                numberOfScreensInput: service.numberOfScreens?.toString() || '',
                                serviceDescription: service.description,
                                serviceAmount: service.amount,
                                addBranding: service.addBranding || false,
                                brandText: service.brandText,
                                brandLogoPreview: service.brandLogo,
                                screenImages: service.screenImages?.map(img => ({ file: null, preview: img.preview })) || [],
                            }}
                            getServiceTypeLabel={getServiceTypeLabel}
                            formatAmount={formatAmount}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
