import { ArrowLeft, Send, FileText, MessageSquare, Receipt, Image as ImageIcon, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrder } from './method';
import { GhostButton, PrimaryButton } from '../../../../components/Buttons';
import { OrderForm } from '../components/OrderForm';
import { useService } from '../method';
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
        addBranding,
        setAddBranding,
        brandText,
        setBrandText,
        brandLogo,
        brandLogoPreview,
        handleBrandLogoChange,
        removeBrandLogo,
        screenImages,
        handleBulkScreenImagesChange,
        removeScreenImage,
        draggedIndex,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDragEnd,
        receiptNumber,
        setReceiptNumber,
        receiptDate,
        setReceiptDate,
        paymentMethod,
        setPaymentMethod,
        receiptAmount,
        setReceiptAmount,
        receiptDescription,
        setReceiptDescription,
        receiptFile,
        receiptFilePreview,
        handleReceiptFileChange,
        removeReceiptFile,
        receiptNotes,
        setReceiptNotes,
        messages,
        inputMessage,
        setInputMessage,
        handleSendMessage,
        handleSubmit,
    } = useCreateOrder();
    
    const { getServiceTypeLabel, formatAmount } = useService();

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
                    <button
                        onClick={() => setActiveTab('receipt')}
                        style={{
                            padding: '0.75rem 1.5rem',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: activeTab === 'receipt' ? '2px solid #22c55e' : '2px solid transparent',
                            color: activeTab === 'receipt' ? '#111827' : '#6b7280',
                            fontWeight: activeTab === 'receipt' ? '600' : '400',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Receipt className="size-4" />
                        Receipt
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
                                <OrderForm
                                    mode="create"
                                    data={{
                                        serviceName,
                                        serviceType,
                                        numberOfScreens: numberOfDesigns,
                                        numberOfScreensInput: numberOfDesignsInput,
                                        serviceDescription,
                                        serviceAmount,
                                        addBranding,
                                        brandText,
                                        brandLogoPreview: brandLogoPreview || undefined,
                                        screenImages,
                                    }}
                                    onSubmit={onSubmit}
                                    onChange={(data) => {
                                        if (data.serviceName !== undefined) setServiceName(data.serviceName);
                                        if (data.serviceType !== undefined) handleServiceTypeChange(data.serviceType);
                                        if (data.numberOfScreensInput !== undefined) setNumberOfDesigns(data.numberOfScreensInput);
                                        if (data.serviceDescription !== undefined) setServiceDescription(data.serviceDescription);
                                        if (data.serviceAmount !== undefined) setServiceAmount(data.serviceAmount);
                                        if (data.addBranding !== undefined) setAddBranding(data.addBranding);
                                        if (data.brandText !== undefined) setBrandText(data.brandText);
                                    }}
                                    onRemoveScreenImage={removeScreenImage}
                                    onBulkScreenImagesChange={handleBulkScreenImagesChange}
                                    onBrandLogoChange={handleBrandLogoChange}
                                    onRemoveBrandLogo={removeBrandLogo}
                                    onDragStart={handleDragStart}
                                    onDragOver={handleDragOver}
                                    onDrop={handleDrop}
                                    onDragEnd={handleDragEnd}
                                    draggedIndex={draggedIndex}
                                    calculateDesignAmount={calculateDesignAmount}
                                    getServiceTypeLabel={getServiceTypeLabel}
                                    formatAmount={formatAmount}
                                />
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

                    {activeTab === 'receipt' && (
                        <div>
                            <div className="customer-service-detail-card-header">
                                <h2 className="customer-service-detail-card-title">Receipt Information</h2>
                            </div>
                            <div className="customer-service-detail-card-body">
                                <form className="customer-support-modal-form">
                                    <div className="customer-support-modal-field">
                                        <label htmlFor="receiptNumber" className="customer-support-modal-label">
                                            Receipt Number
                                        </label>
                                        <input
                                            id="receiptNumber"
                                            type="text"
                                            value={receiptNumber}
                                            onChange={(e) => setReceiptNumber(e.target.value)}
                                            className="customer-support-modal-input"
                                            placeholder="Enter receipt number"
                                        />
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="receiptDate" className="customer-support-modal-label">
                                            Receipt Date
                                        </label>
                                        <input
                                            id="receiptDate"
                                            type="date"
                                            value={receiptDate}
                                            onChange={(e) => setReceiptDate(e.target.value)}
                                            className="customer-support-modal-input"
                                        />
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="paymentMethod" className="customer-support-modal-label">
                                            Payment Method
                                        </label>
                                        <select
                                            id="paymentMethod"
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="customer-support-modal-input"
                                        >
                                            <option value="">Select payment method</option>
                                            <option value="credit_card">Credit Card</option>
                                            <option value="debit_card">Debit Card</option>
                                            <option value="bank_transfer">Bank Transfer</option>
                                            <option value="paypal">PayPal</option>
                                            <option value="cash">Cash</option>
                                            <option value="check">Check</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="receiptAmount" className="customer-support-modal-label">
                                            Amount (USD)
                                        </label>
                                        <input
                                            id="receiptAmount"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={receiptAmount || ''}
                                            onChange={(e) => setReceiptAmount(parseFloat(e.target.value) || 0)}
                                            className="customer-support-modal-input"
                                            placeholder="Enter amount"
                                        />
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="receiptDescription" className="customer-support-modal-label">
                                            Description
                                        </label>
                                        <textarea
                                            id="receiptDescription"
                                            value={receiptDescription}
                                            onChange={(e) => setReceiptDescription(e.target.value)}
                                            className="customer-support-modal-textarea"
                                            placeholder="Enter receipt description..."
                                            rows={4}
                                        />
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="receiptFile" className="customer-support-modal-label">
                                            Receipt File (Image/PDF)
                                        </label>
                                        {!receiptFilePreview ? (
                                            <label htmlFor="receiptFile" className="customer-support-image-upload">
                                                <ImageIcon className="size-5" />
                                                <span>Upload Receipt</span>
                                                <input
                                                    id="receiptFile"
                                                    type="file"
                                                    accept="image/*,.pdf"
                                                    onChange={handleReceiptFileChange}
                                                    className="customer-support-image-input"
                                                />
                                            </label>
                                        ) : (
                                            <div className="customer-support-image-preview-container">
                                                {receiptFilePreview.startsWith('data:image') ? (
                                                    <img
                                                        src={receiptFilePreview}
                                                        alt="Receipt preview"
                                                        className="customer-support-image-preview"
                                                    />
                                                ) : (
                                                    <div style={{
                                                        padding: '2rem',
                                                        textAlign: 'center',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                                        borderRadius: '0.5rem'
                                                    }}>
                                                        <FileText className="size-8" style={{ color: '#6b7280', margin: '0 auto' }} />
                                                        <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                                                            {receiptFile?.name || 'Receipt file'}
                                                        </p>
                                                    </div>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={removeReceiptFile}
                                                    className="customer-support-image-remove"
                                                    aria-label="Remove receipt file"
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className="customer-support-modal-field">
                                        <label htmlFor="receiptNotes" className="customer-support-modal-label">
                                            Notes (Optional)
                                        </label>
                                        <textarea
                                            id="receiptNotes"
                                            value={receiptNotes}
                                            onChange={(e) => setReceiptNotes(e.target.value)}
                                            className="customer-support-modal-textarea"
                                            placeholder="Enter any additional notes..."
                                            rows={3}
                                        />
                                    </div>

                                    <div className="customer-support-modal-actions">
                                        <PrimaryButton type="button" className="customer-support-modal-submit">
                                            Save Receipt
                                        </PrimaryButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

