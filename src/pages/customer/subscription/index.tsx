import { useInvoice } from './method';
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

            <div className="customer-support-table-container">
                <table className="customer-support-table">
                    <thead>
                        <tr>
                            <th>Invoice Number</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Issue Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="customer-support-empty">
                                    No invoices found.
                                </td>
                            </tr>
                        ) : (
                            invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className="customer-support-subject">{invoice.invoiceNumber}</td>
                                    <td className="customer-support-subject">{invoice.description}</td>
                                    <td className="customer-support-date">{formatAmount(invoice.amount)}</td>
                                    <td className="customer-support-date">{formatDate(invoice.issueDate)}</td>
                                    <td className="customer-support-date">{formatDate(invoice.dueDate)}</td>
                                    <td>
                                        <span className={`customer-support-badge ${getStatusColor(invoice.status)}`}>
                                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
