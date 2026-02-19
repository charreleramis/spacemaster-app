import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface AdDesign {
    id: number;
    title: string;
    image: string;
    category: string;
    rating: number;
}

const adDesigns: AdDesign[] = [
    {
        id: 1,
        title: 'Modern E-commerce Banner',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        category: 'E-commerce',
        rating: 5
    },
    {
        id: 2,
        title: 'Tech Startup Landing',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        category: 'Technology',
        rating: 5
    },
    {
        id: 3,
        title: 'Fashion Brand Campaign',
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop',
        category: 'Fashion',
        rating: 4
    },
    {
        id: 4,
        title: 'Food & Beverage Ad',
        image: 'https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=800&h=600&fit=crop',
        category: 'Food & Beverage',
        rating: 5
    },
    {
        id: 5,
        title: 'Healthcare Service',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
        category: 'Healthcare',
        rating: 5
    },
    {
        id: 6,
        title: 'Real Estate Showcase',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        category: 'Real Estate',
        rating: 4
    },
    {
        id: 7,
        title: 'Fitness & Wellness',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
        category: 'Fitness',
        rating: 5
    },
    {
        id: 8,
        title: 'Education Platform',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
        category: 'Education',
        rating: 4
    }
];

export default function AdsCarousel() {
    // Duplicate items for seamless loop
    const duplicatedAds = [...adDesigns, ...adDesigns];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-400">Creative Portfolio</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore our collection of stunning ad designs that drive engagement and conversions
                    </p>
                </motion.div>

                <div className="relative overflow-hidden">
                    {/* Gradient overlays for smooth fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-950 to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-950 to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-6 animate-scroll">
                        {duplicatedAds.map((ad, index) => (
                            <motion.div
                                key={`${ad.id}-${index}`}
                                className="flex-shrink-0 w-80 md:w-96 group"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 group-hover:scale-105">
                                    <div className="aspect-[4/3] relative overflow-hidden">
                                        <img
                                            src={ad.image}
                                            alt={ad.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center gap-2 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`size-4 ${i < ad.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-300">{ad.category}</p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                                            {ad.title}
                                        </h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">
                                                {ad.category}
                                            </span>
                                            <div className="flex items-center gap-1">
                                                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-xs text-gray-400">{ad.rating}.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
}

