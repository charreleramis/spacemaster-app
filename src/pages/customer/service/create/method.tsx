import { useState } from 'react';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

export const useCreateOrder = () => {
    const [activeTab, setActiveTab] = useState<'order' | 'conversation'>('order');
    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState<'design' | 'website' | 'application'>('design');
    const [serviceDescription, setServiceDescription] = useState('');
    const [numberOfDesigns, setNumberOfDesigns] = useState<number>(10);
    const [numberOfDesignsInput, setNumberOfDesignsInput] = useState<string>('10');
    
    // Calculate initial amount for design type
    const getInitialAmount = (type: 'design' | 'website' | 'application', designs: number): number => {
        if (type === 'design') {
            if (designs >= 1 && designs <= 5) return 100;
            if (designs >= 6 && designs <= 10) return 400;
            if (designs >= 11 && designs <= 20) return 700;
            if (designs >= 21 && designs <= 30) return 1000;
            if (designs >= 31 && designs <= 50) return 1800;
            if (designs >= 51 && designs <= 75) return 2800;
            if (designs >= 76 && designs <= 100) return 4000;
        }
        return 0;
    };
    
    const [serviceAmount, setServiceAmount] = useState<number>(getInitialAmount('design', 10));
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I\'m here to help you create a new order. Please fill out the order form, and feel free to ask me any questions.',
            sender: 'assistant',
            timestamp: new Date(),
        },
    ]);
    const [inputMessage, setInputMessage] = useState('');

    // Calculate amount based on number of designs
    const calculateDesignAmount = (count: number): number => {
        if (count >= 1 && count <= 5) {
            return 100;
        } else if (count >= 6 && count <= 10) {
            return 400;
        } else if (count >= 11 && count <= 20) {
            return 700;
        } else if (count >= 21 && count <= 30) {
            return 1000;
        } else if (count >= 31 && count <= 50) {
            return 1800;
        } else if (count >= 51 && count <= 75) {
            return 2800;
        } else if (count >= 76 && count <= 100) {
            return 4000;
        }
        return 0;
    };

    // Update amount when number of designs or service type changes
    const handleNumberOfDesignsChange = (value: string) => {
        setNumberOfDesignsInput(value);
        
        // Only update the numeric value and calculate amount if it's a valid number
        const numValue = parseInt(value);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
            setNumberOfDesigns(numValue);
            if (serviceType === 'design') {
                setServiceAmount(calculateDesignAmount(numValue));
            }
        } else if (value === '') {
            // Allow empty input for editing
            setServiceAmount(0);
        }
    };

    const handleServiceTypeChange = (type: 'design' | 'website' | 'application') => {
        setServiceType(type);
        if (type === 'design') {
            const numValue = parseInt(numberOfDesignsInput);
            if (!isNaN(numValue) && numValue >= 1 && numValue <= 100) {
                setServiceAmount(calculateDesignAmount(numValue));
            } else {
                setServiceAmount(0);
            }
        } else {
            setServiceAmount(0);
        }
    };


    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputMessage('');

        // Simulate assistant response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Thank you for your message. I\'ve noted your question. Please continue filling out the order form, and I\'ll be here to assist you.',
                sender: 'assistant',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        }, 1000);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!serviceName.trim() || !serviceDescription.trim()) {
            return;
        }

        // Validate amount
        if (serviceType === 'design') {
            const numValue = parseInt(numberOfDesignsInput);
            if (isNaN(numValue) || numValue < 1 || numValue > 100) {
                return;
            }
            if (serviceAmount <= 0) {
                return;
            }
        } else {
            if (serviceAmount <= 0) {
                return;
            }
        }

        // Add success message to conversation
        const designCount = serviceType === 'design' ? parseInt(numberOfDesignsInput) : numberOfDesigns;
        const successMessage: Message = {
            id: Date.now().toString(),
            text: `Order created successfully! Service: ${serviceName}, Type: ${serviceType}${serviceType === 'design' ? `, Designs: ${designCount}` : ''}, Amount: $${serviceAmount}`,
            sender: 'assistant',
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);

        // Here you would typically call an API to create the order
        // For now, we'll just show the success message
        return true;
    };

    return {
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
        setNumberOfDesigns: handleNumberOfDesignsChange,
        serviceAmount,
        setServiceAmount,
        calculateDesignAmount,
        messages,
        inputMessage,
        setInputMessage,
        handleSendMessage,
        handleSubmit,
    };
};

