import { useState } from 'react';

export interface Ticket {
    id: string;
    subject: string;
    status: 'open' | 'pending' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    createdAt: string;
    updatedAt: string;
}

export const useSupport = () => {
    const [tickets, setTickets] = useState<Ticket[]>([
        {
            id: '1',
            subject: 'Unable to access dashboard',
            status: 'open',
            priority: 'high',
            createdAt: '2024-01-15T10:30:00Z',
            updatedAt: '2024-01-15T10:30:00Z',
        },
        {
            id: '2',
            subject: 'Billing question',
            status: 'pending',
            priority: 'medium',
            createdAt: '2024-01-14T14:20:00Z',
            updatedAt: '2024-01-14T15:45:00Z',
        },
        {
            id: '3',
            subject: 'Feature request',
            status: 'resolved',
            priority: 'low',
            createdAt: '2024-01-10T09:15:00Z',
            updatedAt: '2024-01-12T16:30:00Z',
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [attachedImage, setAttachedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSubject('');
        setMessage('');
        setAttachedImage(null);
        setImagePreview(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAttachedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setAttachedImage(null);
        setImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!subject.trim() || !message.trim()) {
            return;
        }

        const newTicket: Ticket = {
            id: Date.now().toString(),
            subject,
            status: 'open',
            priority: 'medium',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setTickets([newTicket, ...tickets]);
        closeModal();
    };

    const getStatusColor = (status: Ticket['status']) => {
        switch (status) {
            case 'open':
                return 'text-green-400 bg-green-400/20';
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/20';
            case 'resolved':
                return 'text-blue-400 bg-blue-400/20';
            case 'closed':
                return 'text-gray-400 bg-gray-400/20';
            default:
                return 'text-gray-400 bg-gray-400/20';
        }
    };

    const getPriorityColor = (priority: Ticket['priority']) => {
        switch (priority) {
            case 'high':
                return 'text-red-400 bg-red-400/20';
            case 'medium':
                return 'text-yellow-400 bg-yellow-400/20';
            case 'low':
                return 'text-green-400 bg-green-400/20';
            default:
                return 'text-gray-400 bg-gray-400/20';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return {
        tickets,
        isModalOpen,
        subject,
        setSubject,
        message,
        setMessage,
        attachedImage,
        imagePreview,
        openModal,
        closeModal,
        handleImageChange,
        removeImage,
        handleSubmit,
        getStatusColor,
        getPriorityColor,
        formatDate,
    };
};
