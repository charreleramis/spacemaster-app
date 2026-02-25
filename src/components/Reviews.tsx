import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Review {
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    rating: number;
    comment: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: 'Sarah Johnson',
        role: 'CEO',
        company: 'TechStart Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Spacemaster transformed our brand identity completely. The team\'s creativity and attention to detail exceeded our expectations. Our conversion rates increased by 40% after the redesign!'
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Founder',
        company: 'GreenLeaf Co.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Outstanding work! They understood our vision from day one and delivered beyond what we imagined. The design process was smooth and collaborative.'
    },
    {
        id: 3,
        name: 'Emily Rodriguez',
        role: 'Marketing Director',
        company: 'Fashion Forward',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Professional, creative, and results-driven. Spacemaster helped us create a cohesive brand experience across all platforms. Highly recommend!'
    },
    {
        id: 4,
        name: 'David Thompson',
        role: 'Product Manager',
        company: 'Innovate Labs',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'The team at Spacemaster is incredibly talented. They delivered a stunning website that perfectly captures our brand essence. Our user engagement has doubled!'
    },
    {
        id: 5,
        name: 'Lisa Anderson',
        role: 'Creative Director',
        company: 'Studio Creative',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Working with Spacemaster was a game-changer. Their strategic approach to design and their ability to execute flawlessly made all the difference for our project.'
    },
    {
        id: 6,
        name: 'James Wilson',
        role: 'CEO',
        company: 'Digital Solutions',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Exceptional service from start to finish. Spacemaster delivered a world-class design that elevated our brand and helped us stand out in a competitive market.'
    }
];

export default function Reviews() {
    return (
        <section className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                    className="text-center mb-16"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-green-400">Clients Say</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Don't just take our word for it. Here's what our clients have to say about working with us.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className="relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 hover:scale-105"
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Quote className="absolute top-4 right-4 size-8 text-green-500/20" />
                            
                            <div className="flex items-center gap-2 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="size-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                "{review.comment}"
                            </p>

                            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="size-12 rounded-full border-2 border-green-500/50"
                                />
                                <div>
                                    <h4 className="font-semibold text-white">{review.name}</h4>
                                    <p className="text-sm text-gray-400">
                                        {review.role} at {review.company}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12 text-center"
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="inline-flex items-center gap-2 text-gray-400">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className="size-5 fill-yellow-400 text-yellow-400"
                                />
                            ))}
                        </div>
                        <span className="text-lg font-semibold text-white">4.9/5</span>
                        <span className="text-sm">from 200+ satisfied clients</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

