import { ArrowLeft, Send, FileText, MessageSquare, Image as ImageIcon, Trash2, GripVertical, Receipt } from 'lucide-react';
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

                                    {/* Screen Images Upload Section */}
                                    {serviceType === 'design' && numberOfDesigns >= 1 && numberOfDesigns <= 100 && (
                                        <div style={{
                                            marginTop: '1.5rem',
                                            padding: '1.5rem',
                                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                            borderRadius: '0.75rem',
                                            border: '1px solid rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '1rem'
                                            }}>
                                                <h3 style={{
                                                    fontSize: '1rem',
                                                    fontWeight: '600',
                                                    color: '#111827',
                                                    margin: 0
                                                }}>
                                                    Upload Screen Images ({numberOfDesigns} {numberOfDesigns === 1 ? 'screen' : 'screens'})
                                                </h3>
                                                <label htmlFor="bulkScreenImages" className="customer-support-image-upload" style={{
                                                    padding: '0.5rem 1rem',
                                                    fontSize: '0.875rem',
                                                    cursor: 'pointer',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    backgroundColor: '#22c55e',
                                                    color: 'white',
                                                    borderRadius: '0.5rem',
                                                    border: 'none',
                                                    minHeight: 'auto'
                                                }}>
                                                    <ImageIcon className="size-4" />
                                                    <span>Upload All Images</span>
                                                    <input
                                                        id="bulkScreenImages"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        onChange={handleBulkScreenImagesChange}
                                                        className="customer-support-image-input"
                                                        style={{ display: 'none' }}
                                                    />
                                                </label>
                                            </div>
                                            
                                            <div style={{
                                                display: 'flex',
                                                gap: '1rem',
                                                overflowX: 'auto',
                                                overflowY: 'hidden',
                                                paddingBottom: '0.5rem',
                                                scrollbarWidth: 'thin',
                                                scrollbarColor: '#cbd5e1 transparent'
                                            }}>
                                                {screenImages.map((image, index) => (
                                                    <div 
                                                        key={index} 
                                                        draggable={!!image?.preview}
                                                        onDragStart={() => handleDragStart(index)}
                                                        onDragOver={(e) => handleDragOver(e, index)}
                                                        onDrop={(e) => handleDrop(e, index)}
                                                        onDragEnd={handleDragEnd}
                                                        style={{
                                                            flexShrink: 0,
                                                            width: '200px',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: '0.5rem',
                                                            cursor: image?.preview ? 'grab' : 'default',
                                                            opacity: draggedIndex === index ? 0.5 : 1,
                                                            transition: 'opacity 0.2s'
                                                        }}
                                                    >
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem'
                                                        }}>
                                                            {image?.preview && (
                                                                <GripVertical 
                                                                    className="size-4" 
                                                                    style={{ 
                                                                        color: '#9ca3af',
                                                                        cursor: 'grab'
                                                                    }} 
                                                                />
                                                            )}
                                                            <label style={{
                                                                fontSize: '0.875rem',
                                                                fontWeight: '500',
                                                                color: '#374151'
                                                            }}>
                                                                Screen {index + 1}
                                                            </label>
                                                        </div>
                                                        {!image?.preview ? (
                                                            <div className="customer-support-image-upload" style={{
                                                                minHeight: '150px',
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                gap: '0.5rem',
                                                                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                                                border: '2px dashed rgba(0, 0, 0, 0.2)',
                                                                borderRadius: '0.5rem'
                                                            }}>
                                                                <ImageIcon className="size-6" style={{ color: '#9ca3af' }} />
                                                                <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>No image</span>
                                                            </div>
                                                        ) : (
                                                            <div className="customer-support-image-preview-container" style={{
                                                                position: 'relative',
                                                                width: '200px',
                                                                height: '150px',
                                                                borderRadius: '0.5rem',
                                                                overflow: 'hidden',
                                                                flexShrink: 0,
                                                                border: draggedIndex === index ? '2px solid #22c55e' : 'none',
                                                                transition: 'border 0.2s'
                                                            }}>
                                                                <img
                                                                    src={image.preview!}
                                                                    alt={`Screen ${index + 1} preview`}
                                                                    className="customer-support-image-preview"
                                                                    style={{
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        objectFit: 'cover',
                                                                        pointerEvents: 'none'
                                                                    }}
                                                                    draggable={false}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeScreenImage(index)}
                                                                    className="customer-support-image-remove"
                                                                    aria-label={`Remove screen ${index + 1} image`}
                                                                    onMouseDown={(e) => e.stopPropagation()}
                                                                >
                                                                    <Trash2 className="size-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
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

                                    <div className="customer-support-modal-field">
                                        <label style={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '0.75rem',
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '500',
                                            color: '#374151'
                                        }}>
                                            <span>Add Branding</span>
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={addBranding}
                                                onClick={() => setAddBranding(!addBranding)}
                                                style={{
                                                    position: 'relative',
                                                    width: '3rem',
                                                    height: '1.5rem',
                                                    borderRadius: '9999px',
                                                    backgroundColor: addBranding ? '#22c55e' : '#d1d5db',
                                                    transition: 'background-color 0.2s',
                                                    cursor: 'pointer',
                                                    border: 'none',
                                                    outline: 'none',
                                                    padding: '0',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    paddingLeft: addBranding ? '1.5rem' : '0.25rem',
                                                    paddingRight: addBranding ? '0.25rem' : '1.5rem'
                                                }}
                                            >
                                                <span style={{
                                                    width: '1.25rem',
                                                    height: '1.25rem',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#ffffff',
                                                    transition: 'transform 0.2s',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                                                }} />
                                            </button>
                                        </label>
                                    </div>

                                    {/* Branding Section */}
                                    {addBranding && (
                                        <div style={{
                                            marginTop: '1.5rem',
                                            padding: '1.5rem',
                                            backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                            borderRadius: '0.75rem',
                                            border: '1px solid rgba(0, 0, 0, 0.1)'
                                        }}>
                                            <h3 style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#111827',
                                                marginBottom: '1rem'
                                            }}>
                                                Branding Details
                                            </h3>
                                            
                                            <div className="customer-support-modal-field">
                                                <label htmlFor="brandText" className="customer-support-modal-label">
                                                    Brand Text (Optional)
                                                </label>
                                                <input
                                                    id="brandText"
                                                    type="text"
                                                    value={brandText}
                                                    onChange={(e) => setBrandText(e.target.value)}
                                                    className="customer-support-modal-input"
                                                    placeholder="Enter brand text"
                                                />
                                            </div>

                                            <div className="customer-support-modal-field">
                                                <label htmlFor="brandLogo" className="customer-support-modal-label">
                                                    Brand Logo
                                                </label>
                                                {!brandLogoPreview ? (
                                                    <label htmlFor="brandLogo" className="customer-support-image-upload">
                                                        <ImageIcon className="size-5" />
                                                        <span>Upload Logo</span>
                                                        <input
                                                            id="brandLogo"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleBrandLogoChange}
                                                            className="customer-support-image-input"
                                                        />
                                                    </label>
                                                ) : (
                                                    <div className="customer-support-image-preview-container">
                                                        <img
                                                            src={brandLogoPreview}
                                                            alt="Brand logo preview"
                                                            className="customer-support-image-preview"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={removeBrandLogo}
                                                            className="customer-support-image-remove"
                                                            aria-label="Remove logo"
                                                        >
                                                            <Trash2 className="size-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

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

