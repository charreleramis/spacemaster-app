import { useInvoice } from './method';
import { Table } from '../../../components/Table';
import '../style.scss';

export default function Invoice() {
    const {
        invoices,
        getStatusColor,
        formatDate,
        formatAmount,
    } = useInvoice();

    return (
        <>
            <h1 className="customer-page-title">Invoice</h1>
            <p className="customer-page-description">
                View and manage your invoices and billing information.
            </p>

            <Table
                columns={[
                    {
                        key: 'invoiceNumber',
                        header: 'Invoice Number',
                        className: 'customer-support-subject',
                    },
                    {
                        key: 'description',
                        header: 'Description',
                        className: 'customer-support-subject',
                    },
                    {
                        key: 'amount',
                        header: 'Amount',
                        className: 'customer-support-date',
                        render: (invoice) => formatAmount(invoice.amount),
                    },
                    {
                        key: 'issueDate',
                        header: 'Issue Date',
                        className: 'customer-support-date',
                        render: (invoice) => formatDate(invoice.issueDate),
                    },
                    {
                        key: 'dueDate',
                        header: 'Due Date',
                        className: 'customer-support-date',
                        render: (invoice) => formatDate(invoice.dueDate),
                    },
                    {
                        key: 'status',
                        header: 'Status',
                        render: (invoice) => (
                            <span className={`customer-support-badge ${getStatusColor(invoice.status)}`}>
                                {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                            </span>
                        ),
                    },
                ]}
                data={invoices}
                emptyMessage="No invoices found."
                itemsPerPage={10}
            />
        </>
    );
}
