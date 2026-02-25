import React from 'react';
import { Image as ImageIcon, GripVertical, Trash2 } from 'lucide-react';
import { PrimaryButton } from '../../../../components/Buttons';
import '../../style.scss';

export interface OrderFormData {
    serviceName: string;
    serviceType: 'design' | 'website' | 'application';
    numberOfScreens?: number;
    numberOfScreensInput?: string;
    serviceDescription: string;
    serviceAmount: number;
    addBranding: boolean;
    brandText?: string;
    brandLogo?: string;
    brandLogoPreview?: string;
    screenImages?: Array<{ file: File | null; preview: string | null }>;
}

export interface OrderFormProps {
    mode?: 'create' | 'view';
    data?: Partial<OrderFormData>;
    onSubmit?: (e: React.FormEvent) => void;
    onChange?: (data: Partial<OrderFormData>) => void;
    onRemoveScreenImage?: (index: number) => void;
    onBulkScreenImagesChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBrandLogoChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveBrandLogo?: () => void;
    onDragStart?: (index: number) => void;
    onDragOver?: (e: React.DragEvent, index: number) => void;
    onDrop?: (e: React.DragEvent, index: number) => void;
    onDragEnd?: () => void;
    draggedIndex?: number | null;
    calculateDesignAmount?: (count: number) => number;
    getServiceTypeLabel?: (type: 'design' | 'website' | 'application') => string;
    formatAmount?: (amount: number) => string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
    mode = 'create',
    data = {},
    onSubmit,
    onChange,
    onRemoveScreenImage,
    onBulkScreenImagesChange,
    onBrandLogoChange,
    onRemoveBrandLogo,
    onDragStart,
    onDragOver,
    onDrop,
    onDragEnd,
    draggedIndex = null,
    calculateDesignAmount,
    getServiceTypeLabel,
    formatAmount,
}) => {
    const isViewMode = mode === 'view';
    const {
        serviceName = '',
        serviceType = 'design',
        numberOfScreens = 0,
        numberOfScreensInput = '',
        serviceDescription = '',
        serviceAmount = 0,
        addBranding = false,
        brandText = '',
        brandLogoPreview = '',
        screenImages = [],
    } = data;

    const handleChange = (field: keyof OrderFormData, value: any) => {
        if (onChange && !isViewMode) {
            onChange({ [field]: value });
        }
    };

    const handleServiceTypeChange = (type: 'design' | 'website' | 'application') => {
        if (isViewMode) return;
        handleChange('serviceType', type);
        if (type === 'design' && numberOfScreensInput) {
            const numValue = parseInt(numberOfScreensInput);
            if (!isNaN(numValue) && numValue >= 1 && numValue <= 100 && calculateDesignAmount) {
                handleChange('serviceAmount', calculateDesignAmount(numValue));
            }
        } else if (type !== 'design') {
            handleChange('serviceAmount', 0);
        }
    };

    const handleNumberOfScreensChange = (value: string) => {
        if (isViewMode) return;
        handleChange('numberOfScreensInput', value);
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
            handleChange('numberOfScreens', numValue);
            if (serviceType === 'design' && calculateDesignAmount) {
                handleChange('serviceAmount', calculateDesignAmount(numValue));
            }
        } else if (value === '') {
            handleChange('serviceAmount', 0);
        }
    };

    const displayAmount = formatAmount ? formatAmount(serviceAmount) : `$${serviceAmount.toFixed(2)}`;

    return (
        <form onSubmit={onSubmit} className="customer-support-modal-form">
            <div className="customer-support-modal-field">
                <label htmlFor="serviceName" className="customer-support-modal-label">
                    Service Name
                </label>
                <input
                    id="serviceName"
                    type="text"
                    value={serviceName}
                    onChange={(e) => handleChange('serviceName', e.target.value)}
                    className="customer-support-modal-input"
                    placeholder="Enter service name"
                    required={!isViewMode}
                    readOnly={isViewMode}
                    disabled={isViewMode}
                    style={isViewMode ? { backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' } : {}}
                />
            </div>

            <div className="customer-support-modal-field">
                <label htmlFor="serviceType" className="customer-support-modal-label">
                    Service Type
                </label>
                {isViewMode ? (
                    <input
                        id="serviceType"
                        type="text"
                        value={getServiceTypeLabel ? getServiceTypeLabel(serviceType) : serviceType}
                        className="customer-support-modal-input"
                        readOnly
                        disabled
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' }}
                    />
                ) : (
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
                )}
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
                        value={numberOfScreensInput || numberOfScreens || ''}
                        onChange={(e) => handleNumberOfScreensChange(e.target.value)}
                        className="customer-support-modal-input"
                        placeholder="Enter number of screens"
                        required={!isViewMode}
                        readOnly={isViewMode}
                        disabled={isViewMode}
                        style={isViewMode ? { backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' } : {}}
                    />
                    {!isViewMode && (
                        <p style={{
                            fontSize: '0.75rem',
                            color: '#6b7280',
                            marginTop: '0.5rem',
                            marginBottom: 0
                        }}>
                            Pricing: 1-5 screens ($100), 6-10 screens ($400), 11-20 screens ($700), 21-30 screens ($1,000), 31-50 screens ($1,800), 51-75 screens ($2,800), 76-100 screens ($4,000)
                        </p>
                    )}
                </div>
            )}

            {/* Screen Images Upload Section */}
            {serviceType === 'design' && (numberOfScreens >= 1 && numberOfScreens <= 100) && (
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
                            {isViewMode ? 'Screen Images' : 'Upload Screen Images'} ({numberOfScreens} {numberOfScreens === 1 ? 'screen' : 'screens'})
                        </h3>
                        {!isViewMode && onBulkScreenImagesChange && (
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
                                    onChange={onBulkScreenImagesChange}
                                    className="customer-support-image-input"
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        paddingBottom: '0.5rem',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }} className="hide-scrollbar">
                        {Array.from({ length: numberOfScreens }, (_, index) => {
                            const image = screenImages[index];
                            return (
                                <div
                                    key={index}
                                    draggable={!isViewMode && !!image?.preview}
                                    onDragStart={!isViewMode && onDragStart ? () => onDragStart(index) : undefined}
                                    onDragOver={!isViewMode && onDragOver ? (e) => onDragOver(e, index) : undefined}
                                    onDrop={!isViewMode && onDrop ? (e) => onDrop(e, index) : undefined}
                                    onDragEnd={!isViewMode && onDragEnd ? onDragEnd : undefined}
                                    style={{
                                        flexShrink: 0,
                                        width: '200px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.5rem',
                                        cursor: !isViewMode && image?.preview ? 'grab' : 'default',
                                        opacity: draggedIndex === index ? 0.5 : 1,
                                        transition: 'opacity 0.2s'
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {!isViewMode && image?.preview && (
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
                                                src={image.preview}
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
                                            {!isViewMode && onRemoveScreenImage && (
                                                <button
                                                    type="button"
                                                    onClick={() => onRemoveScreenImage(index)}
                                                    className="customer-support-image-remove"
                                                    aria-label={`Remove screen ${index + 1} image`}
                                                    onMouseDown={(e) => e.stopPropagation()}
                                                >
                                                    <Trash2 className="size-4" />
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
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
                    onChange={(e) => handleChange('serviceDescription', e.target.value)}
                    className="customer-support-modal-textarea"
                    placeholder="Describe the service you need..."
                    rows={4}
                    required={!isViewMode}
                    readOnly={isViewMode}
                    disabled={isViewMode}
                    style={isViewMode ? { backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' } : {}}
                />
            </div>

            <div className="customer-support-modal-field">
                <label htmlFor="serviceAmount" className="customer-support-modal-label">
                    Amount (USD)
                </label>
                <input
                    id="serviceAmount"
                    type={serviceType === 'design' || isViewMode ? 'text' : 'number'}
                    min="0"
                    step="0.01"
                    value={serviceType === 'design' || isViewMode ? displayAmount : serviceAmount || ''}
                    onChange={(e) => !isViewMode && serviceType !== 'design' && handleChange('serviceAmount', parseFloat(e.target.value) || 0)}
                    className="customer-support-modal-input"
                    placeholder="Enter amount"
                    required={!isViewMode}
                    readOnly={serviceType === 'design' || isViewMode}
                    disabled={serviceType === 'design' || isViewMode}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' }}
                />
            </div>

            <div className="customer-support-modal-field">
                <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    cursor: isViewMode ? 'default' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                }}>
                    <span>Add Branding</span>
                    {isViewMode ? (
                        <span style={{ color: '#6b7280' }}>{addBranding ? 'Yes' : 'No'}</span>
                    ) : (
                        <button
                            type="button"
                            role="switch"
                            aria-checked={addBranding}
                            onClick={() => handleChange('addBranding', !addBranding)}
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
                    )}
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
                            Brand Text {!isViewMode && '(Optional)'}
                        </label>
                        <input
                            id="brandText"
                            type="text"
                            value={brandText || ''}
                            onChange={(e) => handleChange('brandText', e.target.value)}
                            className="customer-support-modal-input"
                            placeholder="Enter brand text"
                            readOnly={isViewMode}
                            disabled={isViewMode}
                            style={isViewMode ? { backgroundColor: 'rgba(0, 0, 0, 0.03)', cursor: 'not-allowed' } : {}}
                        />
                    </div>

                    <div className="customer-support-modal-field">
                        <label htmlFor="brandLogo" className="customer-support-modal-label">
                            Brand Logo
                        </label>
                        {!brandLogoPreview ? (
                            isViewMode ? (
                                <div style={{
                                    padding: '2rem',
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(0, 0, 0, 0.03)',
                                    borderRadius: '0.5rem',
                                    color: '#9ca3af',
                                    fontSize: '0.875rem'
                                }}>
                                    No logo uploaded
                                </div>
                            ) : (
                                <label htmlFor="brandLogo" className="customer-support-image-upload">
                                    <ImageIcon className="size-5" />
                                    <span>Upload Logo</span>
                                    <input
                                        id="brandLogo"
                                        type="file"
                                        accept="image/*"
                                        onChange={onBrandLogoChange}
                                        className="customer-support-image-input"
                                    />
                                </label>
                            )
                        ) : (
                            <div className="customer-support-image-preview-container">
                                <img
                                    src={brandLogoPreview}
                                    alt="Brand logo preview"
                                    className="customer-support-image-preview"
                                />
                                {!isViewMode && onRemoveBrandLogo && (
                                    <button
                                        type="button"
                                        onClick={onRemoveBrandLogo}
                                        className="customer-support-image-remove"
                                        aria-label="Remove logo"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {!isViewMode && onSubmit && (
                <div className="customer-support-modal-actions">
                    <PrimaryButton type="submit" className="customer-support-modal-submit">
                        Create Order
                    </PrimaryButton>
                </div>
            )}
        </form>
    );
};

