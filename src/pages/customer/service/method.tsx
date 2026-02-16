import { useState, useMemo } from 'react';

export type ServiceType = 'design' | 'website' | 'application';
export type ServiceStatus = 'pending' | 'delivered' | 'hold';

export interface Service {
    id: string;
    type: ServiceType;
    name: string;
    description: string;
    status: ServiceStatus;
    requestedDate: string;
    updatedDate: string;
}

export const useService = () => {
    const [services, setServices] = useState<Service[]>([
        {
            id: '1',
            type: 'design',
            name: 'Logo Design',
            description: 'Brand identity design package',
            status: 'pending',
            requestedDate: '2024-01-15T10:30:00Z',
            updatedDate: '2024-01-15T10:30:00Z',
        },
        {
            id: '2',
            type: 'website',
            name: 'E-commerce Website',
            description: 'Full-stack e-commerce platform',
            status: 'delivered',
            requestedDate: '2024-01-10T09:15:00Z',
            updatedDate: '2024-01-20T14:30:00Z',
        },
        {
            id: '3',
            type: 'application',
            name: 'Mobile App',
            description: 'iOS and Android mobile application',
            status: 'hold',
            requestedDate: '2024-01-12T11:20:00Z',
            updatedDate: '2024-01-18T16:45:00Z',
        },
        {
            id: '4',
            type: 'design',
            name: 'UI/UX Design',
            description: 'User interface and experience design',
            status: 'delivered',
            requestedDate: '2024-01-08T08:00:00Z',
            updatedDate: '2024-01-16T12:00:00Z',
        },
        {
            id: '5',
            type: 'website',
            name: 'Portfolio Website',
            description: 'Personal portfolio website',
            status: 'pending',
            requestedDate: '2024-01-14T13:30:00Z',
            updatedDate: '2024-01-14T13:30:00Z',
        },
        {
            id: '6',
            type: 'application',
            name: 'Web Application',
            description: 'Custom web application development',
            status: 'pending',
            requestedDate: '2024-01-13T10:00:00Z',
            updatedDate: '2024-01-13T10:00:00Z',
        },
    ]);

    // Calculate counts for each service type
    const serviceCounts = useMemo(() => {
        const counts = {
            design: 0,
            website: 0,
            application: 0,
        };

        services.forEach((service) => {
            counts[service.type]++;
        });

        return counts;
    }, [services]);

    const getStatusColor = (status: ServiceStatus) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/20';
            case 'delivered':
                return 'text-green-400 bg-green-400/20';
            case 'hold':
                return 'text-orange-400 bg-orange-400/20';
            default:
                return 'text-gray-400 bg-gray-400/20';
        }
    };

    const getServiceTypeLabel = (type: ServiceType) => {
        switch (type) {
            case 'design':
                return 'Design';
            case 'website':
                return 'Website';
            case 'application':
                return 'Application';
            default:
                return type;
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

    const getServiceById = (id: string): Service | undefined => {
        return services.find((service) => service.id === id);
    };

    return {
        services,
        serviceCounts,
        getStatusColor,
        getServiceTypeLabel,
        formatDate,
        getServiceById,
    };
};
