import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="customer-support-modal-overlay" onClick={onClose}>
            <div className="customer-support-modal" onClick={(e) => e.stopPropagation()}>
                <div className="customer-support-modal-header">
                    <h2 className="customer-support-modal-title">{title}</h2>
                    <button
                        onClick={onClose}
                        className="customer-support-modal-close"
                        aria-label="Close modal"
                    >
                        <X className="size-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

