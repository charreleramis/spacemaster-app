import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../pages/customer/style.scss';

export interface TableColumn<T> {
    key: string;
    header: string;
    render?: (item: T, index: number) => React.ReactNode;
    className?: string;
}

export interface TableProps<T> {
    columns: TableColumn<T>[];
    data: T[];
    emptyMessage?: string;
    itemsPerPage?: number;
    className?: string;
}

export function Table<T extends { id?: string | number }>({
    columns,
    data,
    emptyMessage = 'No data found.',
    itemsPerPage = 10,
    className = '',
}: TableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = useMemo(() => {
        return data.slice(startIndex, endIndex);
    }, [data, startIndex, endIndex]);

    const handlePrevious = () => {
        setCurrentPage((prev) => Math.max(1, prev - 1));
    };

    const handleNext = () => {
        setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    };

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
    };

    // Reset to page 1 when data changes
    React.useEffect(() => {
        setCurrentPage(1);
    }, [data.length]);

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }

        return pages;
    };

    return (
        <div className={`customer-support-table-container ${className}`}>
            <table className="customer-support-table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className={column.className}>
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="customer-support-empty">
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map((item, index) => (
                            <tr key={item.id || index}>
                                {columns.map((column) => (
                                    <td key={column.key} className={column.className}>
                                        {column.render
                                            ? column.render(item, startIndex + index)
                                            : (item as any)[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            {data.length > itemsPerPage && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 1.5rem',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.02)'
                }}>
                    <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                    }}>
                        Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '0.375rem',
                                backgroundColor: currentPage === 1 ? 'rgba(0, 0, 0, 0.05)' : 'white',
                                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: currentPage === 1 ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                            aria-label="Previous page"
                        >
                            <ChevronLeft className="size-4" />
                        </button>

                        {getPageNumbers().map((page, index) => (
                            page === '...' ? (
                                <span key={`ellipsis-${index}`} style={{
                                    padding: '0 0.5rem',
                                    color: '#6b7280'
                                }}>
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={page}
                                    onClick={() => handlePageClick(page as number)}
                                    style={{
                                        padding: '0.5rem 0.75rem',
                                        border: '1px solid rgba(0, 0, 0, 0.1)',
                                        borderRadius: '0.375rem',
                                        backgroundColor: currentPage === page ? '#22c55e' : 'white',
                                        color: currentPage === page ? 'white' : '#374151',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                        fontWeight: currentPage === page ? '600' : '400',
                                        transition: 'all 0.2s',
                                        minWidth: '2.5rem'
                                    }}
                                >
                                    {page}
                                </button>
                            )
                        ))}

                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            style={{
                                padding: '0.5rem',
                                border: '1px solid rgba(0, 0, 0, 0.1)',
                                borderRadius: '0.375rem',
                                backgroundColor: currentPage === totalPages ? 'rgba(0, 0, 0, 0.05)' : 'white',
                                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: currentPage === totalPages ? 0.5 : 1,
                                transition: 'all 0.2s'
                            }}
                            aria-label="Next page"
                        >
                            <ChevronRight className="size-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

