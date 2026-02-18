import { useState } from 'react';

export type InvoiceStatus = 'paid' | 'pending' | 'overdue' | 'cancelled';

export interface Invoice {
    id: string;
    invoiceNumber: string;
    amount: number;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
    description: string;
}

export const useInvoice = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([
        {
            id: '1',
            invoiceNumber: 'INV-2024-001',
            amount: 5000,
            status: 'paid',
            issueDate: '2024-01-15T10:30:00Z',
            dueDate: '2024-02-15T10:30:00Z',
            description: 'E-commerce Website Development',
        },
        {
            id: '2',
            invoiceNumber: 'INV-2024-002',
            amount: 1200,
            status: 'pending',
            issueDate: '2024-01-20T09:15:00Z',
            dueDate: '2024-02-20T09:15:00Z',
            description: 'UI/UX Design Package',
        },
        {
            id: '3',
            invoiceNumber: 'INV-2024-003',
            amount: 800,
            status: 'overdue',
            issueDate: '2023-12-10T14:20:00Z',
            dueDate: '2024-01-10T14:20:00Z',
            description: 'Portfolio Website',
        },
        {
            id: '4',
            invoiceNumber: 'INV-2024-004',
            amount: 6000,
            status: 'pending',
            issueDate: '2024-01-25T11:00:00Z',
            dueDate: '2024-02-25T11:00:00Z',
            description: 'Web Application Development',
        },
        {
            id: '5',
            invoiceNumber: 'INV-2024-005',
            amount: 500,
            status: 'paid',
            issueDate: '2024-01-05T08:00:00Z',
            dueDate: '2024-02-05T08:00:00Z',
            description: 'Logo Design',
        },
        {
            id: '6',
            invoiceNumber: 'INV-2024-006',
            amount: 8000,
            status: 'cancelled',
            issueDate: '2024-01-12T16:45:00Z',
            dueDate: '2024-02-12T16:45:00Z',
            description: 'Mobile App Development',
        },
    ]);

    const getStatusColor = (status: InvoiceStatus) => {
        switch (status) {
            case 'paid':
                return 'text-green-600 bg-green-100';
            case 'pending':
                return 'text-yellow-600 bg-yellow-100';
            case 'overdue':
                return 'text-red-600 bg-red-100';
            case 'cancelled':
                return 'text-gray-600 bg-gray-100';
            default:
                return 'text-gray-600 bg-gray-100';
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

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    };

    return {
        invoices,
        getStatusColor,
        formatDate,
        formatAmount,
    };
};

