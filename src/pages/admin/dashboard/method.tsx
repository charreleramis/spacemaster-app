import { useState, useMemo } from 'react';
import { useAdminOrders } from '../orders/method';

export interface User {
    id: string;
    name: string;
    email: string;
    registeredDate: string;
    ordersCount: number;
    totalSpent: number;
}

export const useAdminDashboard = () => {
    const { orders, formatAmount, getServiceTypeLabel, formatDate } = useAdminOrders();
    const [activeTab, setActiveTab] = useState<'orders' | 'users' | 'pending'>('orders');

    // Mock users data
    const users: User[] = useMemo(() => [
        {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            registeredDate: '2024-01-05T10:00:00Z',
            ordersCount: 3,
            totalSpent: 6200,
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            registeredDate: '2024-01-10T14:30:00Z',
            ordersCount: 2,
            totalSpent: 5700,
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            registeredDate: '2024-01-12T09:15:00Z',
            ordersCount: 1,
            totalSpent: 800,
        },
        {
            id: '4',
            name: 'Sarah Williams',
            email: 'sarah.williams@example.com',
            registeredDate: '2024-01-08T11:20:00Z',
            ordersCount: 4,
            totalSpent: 10400,
        },
        {
            id: '5',
            name: 'David Brown',
            email: 'david.brown@example.com',
            registeredDate: '2024-01-15T16:45:00Z',
            ordersCount: 2,
            totalSpent: 4800,
        },
    ], []);

    // Calculate dashboard statistics
    const stats = useMemo(() => {
        const totalSales = orders.reduce((sum, order) => {
            // Only count approved and delivered orders in sales
            if (order.status === 'approved' || order.status === 'delivered') {
                return sum + order.amount;
            }
            return sum;
        }, 0);

        const approvedOrders = orders.filter(order => order.status === 'approved').length;
        const pendingOrders = orders.filter(order => order.status === 'pending').length;
        
        const registeredUsers = users.length;

        return {
            registeredUsers,
            totalSales,
            approvedOrders,
            pendingOrders,
        };
    }, [orders, users]);

    // Get pending orders
    const pendingOrdersList = useMemo(() => {
        return orders.filter(order => order.status === 'pending');
    }, [orders]);

    return {
        ...stats,
        activeTab,
        setActiveTab,
        orders,
        users,
        pendingOrdersList,
        formatAmount,
        getServiceTypeLabel,
        formatDate,
    };
};

