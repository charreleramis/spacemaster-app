import { ArrowLeft, Send, FileText, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder } from './method';
import { GhostButton, PrimaryButton } from '../../../../components/Buttons';
import '../../style.scss';

export default function CreateOrder() {
    const navigate = useNavigate();
    const {
        activeTab,
        setActiveTab,
        serviceName,
        setServiceName,
        serviceType,
        setServiceType,
        handleServiceTypeChange,
        serviceDescription,
        setServiceDescription,
        numberOfDesigns,
        numberOfDesignsInput,
        setNumberOfDesigns,
        serviceAmount,
        setServiceAmount,
        calculateDesignAmount,
        messages,
        inputMessage,
        setInputMessage,
        handleSendMessage,
        handleSubmit,
    } = useCreateOrder();

    const onSubmit = (e: React.FormEvent) => {
        const success = handleSubmit(e);
        if (success) {
            setTimeout(() => {
                navigate('/customer/service');
            }, 2000);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
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
                <h1 className="customer-page-title">Create New Order</h1>
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
                        onClick={() => setActiveTab('order')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'order' ? '2px solid #22c55e' : '2px solid transparent',
                            color: activeTab === 'order' ? '#111827' : '#6b7280',
                            fontWeight: activeTab === 'order' ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <FileText className="size-4" />
                        Order Details
                    </button>
                    <button
                        onClick={() => setActiveTab('conversation')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'conversation' ? '2px solid #22c55e' : '2px solid transparent',
                            color: activeTab === 'conversation' ? '#111827' : '#6b7280',
                            fontWeight: activeTab === 'conversation' ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <MessageSquare className="size-4" />
                        Conversation
                    </button>
                </div>

                {/* Tab Content */}
                <div className="customer-service-detail-card">
                    {activeTab === 'order' && (
                        <div>
                            <div className="customer-service-detail-card-header">
                                <h2 className="customer-service-detail-card-title">Order Details</h2>
                            </div>
                            <div className="customer-service-detail-card-body">
                                <form onSubmit={onSubmit} className="customer-support-modal-form">
                                    <div className="customer-support-modal-field">
                                        <label htmlFor="serviceName" className="customer-support-modal-label">
                                            Service Name
                                        </label>
                                        <input
                                            id="serviceName"
                                            type="text"
                                            value={serviceName}
                                            onChange={(e) => setServiceName(e.target.value)}
                                            className="customer-support-modal-input"
                                            placeholder="Enter service name"
                                            required
                                        />
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="serviceType" className="customer-support-modal-label">
                                            Service Type
                                        </label>
                                        <select
                                            id="serviceType"
                                            value={serviceType}
                                            onChange={(e) => handleServiceTypeChange(e.target.value as 'design' | 'website' | 'application')}
                                            className="customer-support-modal-input"
                                            required
                                        >
                                            <option value="design">Design</option>
                                            <option value="website">Website</option>
                                            <option value="application">Application</option>
                                        </select>
                                    </div>

                                    {serviceType === 'design' && (
                                        <div className="customer-support-modal-field">
                                            <label htmlFor="numberOfDesigns" className="customer-support-modal-label">
                                                Number of Screens (1-100)
                                            </label>
                                            <input
                                                id="numberOfDesigns"
                                                type="number"
                                                min="1"
                                                max="100"
                                                value={numberOfDesignsInput}
                                                onChange={(e) => setNumberOfDesigns(e.target.value)}
                                                className="customer-support-modal-input"
                                                placeholder="Enter number of screens"
                                                required
                                            />
                                            <p style={{ 
                                                fontSize: '0.75rem', 
                                                color: '#6b7280', 
                                                marginTop: '0.5rem',
                                                marginBottom: 0 
                                            }}>
                                                Pricing: 1-5 screens ($100), 6-10 screens ($400), 11-20 screens ($700), 21-30 screens ($1,000), 31-50 screens ($1,800), 51-75 screens ($2,800), 76-100 screens ($4,000)
                                            </p>
                                        </div>
                                    )}

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="serviceDescription" className="customer-support-modal-label">
                                            Description
                                        </label>
                                        <textarea
                                            id="serviceDescription"
                                            value={serviceDescription}
                                            onChange={(e) => setServiceDescription(e.target.value)}
                                            className="customer-support-modal-textarea"
                                            placeholder="Describe the service you need..."
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="serviceAmount" className="customer-support-modal-label">
                                            Amount (USD)
                                        </label>
                                        {serviceType === 'design' ? (
                                            <input
                                                id="serviceAmount"
                                                type="text"
                                                value={`$${serviceAmount.toFixed(2)}`}
                                                className="customer-support-modal-input"
                                                readOnly
                                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' }}
                                            />
                                        ) : (
                                            <input
                                                id="serviceAmount"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={serviceAmount || ''}
                                                onChange={(e) => setServiceAmount(parseFloat(e.target.value) || 0)}
                                                className="customer-support-modal-input"
                                                placeholder="Enter amount"
                                                required
                                            />
                                        )}
                                    </div>

                                    <div className="customer-support-modal-actions">
                                        <PrimaryButton type="submit" className="customer-support-modal-submit">
                                            Create Order
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === 'conversation' && (
                        <div>
                            <div className="customer-service-detail-card-header">
                                <h2 className="customer-service-detail-card-title">Conversation</h2>
                            </div>
                            <div className="customer-service-detail-card-body" style={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                height: '100%',
                                padding: 0,
                                minHeight: '500px'
                            }}>
                                {/* Messages */}
                                <div style={{ 
                                    flex: 1, 
                                    overflowY: 'auto', 
                                    padding: '1.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1rem',
                                }}>
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    padding: '0.75rem 1rem',
                                                    borderRadius: '0.75rem',
                                                    maxWidth: '80%',
                                                    backgroundColor: message.sender === 'user' 
                                                        ? 'rgba(34, 197, 94, 0.1)' 
                                                        : 'rgba(0, 0, 0, 0.05)',
                                                    color: message.sender === 'user' 
                                                        ? '#111827' 
                                                        : '#374151',
                                                    border: message.sender === 'user'
                                                        ? '1px solid rgba(34, 197, 94, 0.2)'
                                                        : '1px solid rgba(0, 0, 0, 0.1)',
                                                }}
                                            >
                                                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: '1.5' }}>
                                                    {message.text}
                                                </p>
                                            </div>
                                            <span style={{ 
                                                fontSize: '0.75rem', 
                                                color: '#6b7280', 
                                                marginTop: '0.25rem',
                                                paddingLeft: message.sender === 'user' ? 0 : '0.5rem',
                                                paddingRight: message.sender === 'user' ? '0.5rem' : 0,
                                            }}>
                                                {formatTime(message.timestamp)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Input */}
                                <form onSubmit={handleSendMessage} style={{ 
                                    padding: '1.5rem',
                                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                                    display: 'flex',
                                    gap: '0.5rem'
                                }}>
                                    <input
                                        type="text"
                                        value={inputMessage}
                                        onChange={(e) => setInputMessage(e.target.value)}
                                        placeholder="Type your message..."
                                        className="customer-support-modal-input"
                                        style={{ flex: 1, margin: 0 }}
                                    />
                                    <PrimaryButton type="submit">
                                        <Send className="size-4" />
                                    </PrimaryButton>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

