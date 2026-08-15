import React from 'react';
import { motion } from 'framer-motion';
import { getReviews } from '../../constants/data';
import { User } from 'lucide-react';

const cardMotionProps = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay },
});

const Reviews = ({ language, t }) => {
    const reviews = getReviews(language);

    return (
        <section id="reviews" className="max-w-7xl mx-auto px-4 scroll-mt-28">
            <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{t.reviews}</h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-80 shadow-glow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map((rev, idx) => (
                    <motion.div
                        {...cardMotionProps(idx * 0.1)}
                        key={idx}
                        className="p-6 rounded-2xl bg-surface/40 hover:bg-surface/80 border border-white/5 transition-colors relative"
                    >
                        <div className="text-accent/20 text-6xl font-serif absolute top-4 right-6 leading-none select-none">"</div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                                <User size={20} className="text-accent" />
                            </div>
                            <h4 className="font-bold text-white text-lg">{rev.author}</h4>
                        </div>
                        <p className="text-gray-300 italic text-sm leading-relaxed relative z-10">{rev.text}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Reviews;
