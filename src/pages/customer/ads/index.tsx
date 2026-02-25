import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import '../style.scss';

interface GalleryImage {
    id: string;
    url: string;
    title: string;
    category: string;
}

const galleryImages: GalleryImage[] = [
    {
        id: '1',
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        title: 'Modern E-commerce Banner',
        category: 'E-commerce',
    },
    {
        id: '2',
        url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        title: 'Tech Startup Landing',
        category: 'Technology',
    },
    {
        id: '3',
        url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop',
        title: 'Fashion Brand Campaign',
        category: 'Fashion',
    },
    {
        id: '4',
        url: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&h=600&fit=crop',
        title: 'Food & Beverage Ad',
        category: 'Food & Beverage',
    },
    {
        id: '5',
        url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        title: 'Healthcare Service',
        category: 'Healthcare',
    },
    {
        id: '6',
        url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        title: 'Real Estate Showcase',
        category: 'Real Estate',
    },
    {
        id: '7',
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
        title: 'Fitness & Wellness',
        category: 'Fitness',
    },
    {
        id: '8',
        url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        title: 'Education Platform',
        category: 'Education',
    },
    {
        id: '9',
        url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        title: 'Business Portfolio',
        category: 'Business',
    },
    {
        id: '10',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        title: 'Digital Marketing',
        category: 'Marketing',
    },
    {
        id: '11',
        url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        title: 'Retail Store Design',
        category: 'Retail',
    },
    {
        id: '12',
        url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop',
        title: 'Restaurant Branding',
        category: 'Food & Beverage',
    },
];

const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

    const filteredImages = selectedCategory === 'All' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === selectedCategory);

    return (
        <>
            <h1 className="customer-page-title">Ads</h1>
            <p className="customer-page-description">
                Browse through our collection of creative ad designs and campaigns.
            </p>

            {/* Category Filter */}
            <div style={{ 
                display: 'flex', 
                gap: '0.5rem', 
                flexWrap: 'wrap',
                marginTop: '1.5rem',
                marginBottom: '2rem'
            }}>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            backgroundColor: selectedCategory === category 
                                ? 'rgba(34, 197, 94, 0.1)' 
                                : 'rgba(255, 255, 255, 0.8)',
                            color: selectedCategory === category ? '#111827' : '#6b7280',
                            fontWeight: selectedCategory === category ? '600' : '400',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontSize: '0.875rem',
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
            }}>
                {filteredImages.map((image) => (
                    <div
                        key={image.id}
                        style={{
                            position: 'relative',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(0, 0, 0, 0.1)',
                            backgroundColor: '#ffffff',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                        onClick={() => setSelectedImage(image)}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-4px)';
                            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                            <img
                                src={image.url}
                                alt={image.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                backgroundColor: 'rgba(0, 0, 0, 0)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'background-color 0.3s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)';
                            }}
                            >
                                <ZoomIn className="size-8" style={{ 
                                    color: 'white', 
                                    opacity: 0,
                                    transition: 'opacity 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = '1';
                                }}
                                />
                            </div>
                        </div>
                        <div style={{ padding: '1rem' }}>
                            <h3 style={{ 
                                fontSize: '1rem', 
                                fontWeight: '600', 
                                color: '#111827',
                                marginBottom: '0.25rem'
                            }}>
                                {image.title}
                            </h3>
                            <p style={{ 
                                fontSize: '0.875rem', 
                                color: '#6b7280' 
                            }}>
                                {image.category}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '2rem',
                    }}
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        style={{
                            position: 'relative',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{
                                position: 'absolute',
                                top: '-2.5rem',
                                right: 0,
                                backgroundColor: 'transparent',
                                border: 'none',
                                color: 'white',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: '0.5rem',
                                transition: 'background-color 0.2s',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                        >
                            <X className="size-6" />
                        </button>
                        <img
                            src={selectedImage.url}
                            alt={selectedImage.title}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '90vh',
                                objectFit: 'contain',
                                borderRadius: '0.5rem',
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '-3rem',
                            left: 0,
                            right: 0,
                            textAlign: 'center',
                            color: 'white',
                        }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                {selectedImage.title}
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
                                {selectedImage.category}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

