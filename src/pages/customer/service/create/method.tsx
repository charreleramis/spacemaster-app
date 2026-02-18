import { useState } from 'react';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'assistant';
    timestamp: Date;
}

export const useCreateOrder = () => {
    const [activeTab, setActiveTab] = useState<'order' | 'conversation' | 'receipt'>('order');
    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState<'design' | 'website' | 'application'>('design');
    const [serviceDescription, setServiceDescription] = useState('');
    const [numberOfDesigns, setNumberOfDesigns] = useState<number>(10);
    const [numberOfDesignsInput, setNumberOfDesignsInput] = useState<string>('10');
    const [addBranding, setAddBranding] = useState<boolean>(true);
    const [brandText, setBrandText] = useState<string>('');
    const [brandLogo, setBrandLogo] = useState<File | null>(null);
    const [brandLogoPreview, setBrandLogoPreview] = useState<string | null>(null);
    
    // Screen images: array of { file: File | null, preview: string | null }
    const [screenImages, setScreenImages] = useState<Array<{ file: File | null; preview: string | null }>>(
        Array(10).fill(null).map(() => ({ file: null, preview: null }))
    );
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    
    // Receipt form fields
    const [receiptNumber, setReceiptNumber] = useState<string>('');
    const [receiptDate, setReceiptDate] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [receiptAmount, setReceiptAmount] = useState<number>(0);
    const [receiptDescription, setReceiptDescription] = useState<string>('');
    const [receiptFile, setReceiptFile] = useState<File | null>(null);
    const [receiptFilePreview, setReceiptFilePreview] = useState<string | null>(null);
    const [receiptNotes, setReceiptNotes] = useState<string>('');
    
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
                // Adjust screen images array to match new count
                setScreenImages((prev) => {
                    const newImages = [...prev];
                    if (numValue > newImages.length) {
                        // Add empty slots
                        while (newImages.length < numValue) {
                            newImages.push({ file: null, preview: null });
                        }
                    } else if (numValue < newImages.length) {
                        // Remove extra slots
                        return newImages.slice(0, numValue);
                    }
                    return newImages;
                });
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
                // Initialize screen images array
                setScreenImages(Array(numValue).fill(null).map(() => ({ file: null, preview: null })));
            } else {
                setServiceAmount(0);
            }
        } else {
            setServiceAmount(0);
            setScreenImages([]);
        }
    };

    const handleBrandLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBrandLogo(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBrandLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeBrandLogo = () => {
        setBrandLogo(null);
        setBrandLogoPreview(null);
    };

    const handleBulkScreenImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Process files up to the number of screens
        const maxFiles = Math.min(files.length, numberOfDesigns);
        const filesToProcess = files.slice(0, maxFiles);

        filesToProcess.forEach((file, index) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenImages((prev) => {
                    const newImages = [...prev];
                    // Find the first empty slot or use the current index
                    const targetIndex = newImages.findIndex(img => !img.preview) !== -1 
                        ? newImages.findIndex(img => !img.preview)
                        : index;
                    if (targetIndex < numberOfDesigns) {
                        newImages[targetIndex] = { file, preview: reader.result as string };
                    }
                    return newImages;
                });
            };
            reader.readAsDataURL(file);
        });
    };

    const removeScreenImage = (index: number) => {
        setScreenImages((prev) => {
            const newImages = [...prev];
            newImages[index] = { file: null, preview: null };
            return newImages;
        });
    };

    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (draggedIndex === null || draggedIndex === dropIndex) {
            setDraggedIndex(null);
            return;
        }

        setScreenImages((prev) => {
            const newImages = [...prev];
            const draggedItem = newImages[draggedIndex];
            
            // Remove the dragged item
            newImages.splice(draggedIndex, 1);
            // Insert at the new position
            newImages.splice(dropIndex, 0, draggedItem);
            
            return newImages;
        });

        setDraggedIndex(null);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleReceiptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setReceiptFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceiptFilePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeReceiptFile = () => {
        setReceiptFile(null);
        setReceiptFilePreview(null);
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
        addBranding,
        setAddBranding,
        brandText,
        setBrandText,
        brandLogo,
        brandLogoPreview,
        handleBrandLogoChange,
        removeBrandLogo,
        screenImages,
        handleBulkScreenImagesChange,
        removeScreenImage,
        draggedIndex,
        handleDragStart,
        handleDragOver,
        handleDrop,
        handleDragEnd,
        receiptNumber,
        setReceiptNumber,
        receiptDate,
        setReceiptDate,
        paymentMethod,
        setPaymentMethod,
        receiptAmount,
        setReceiptAmount,
        receiptDescription,
        setReceiptDescription,
        receiptFile,
        receiptFilePreview,
        handleReceiptFileChange,
        removeReceiptFile,
        receiptNotes,
        setReceiptNotes,
        messages,
        inputMessage,
        setInputMessage,
        handleSendMessage,
        handleSubmit,
    };
};

