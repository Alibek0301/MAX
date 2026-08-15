import React from 'react';
import { motion } from 'framer-motion';
import { getStandards } from '../../constants/data';

const cardMotionProps = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay },
});

const Standards = ({ language, t }) => {
    const standardsData = getStandards(language);

    return (
        <section id="standards" className="max-w-7xl mx-auto px-4 scroll-mt-28">
            <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">{t.standardsTitleDesktop}</h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-80 shadow-glow" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {standardsData.map((std, idx) => {
                    const Icon = std.icon;
                    return (
                        <motion.div
                            {...cardMotionProps(idx * 0.1)}
                            key={idx}
                            className="group flex flex-col md:flex-row items-start gap-4 p-5 md:p-6 rounded-2xl bg-surface/40 hover:bg-surface/80 border border-white/5 hover:border-accent/20 transition-all duration-300 shadow-md"
                        >
                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-glow">
                                <Icon size={24} className="text-accent" />
                            </div>
                            <div>
                                <h4 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-white/95 group-hover:text-accent transition-colors">{std.title}</h4>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">{std.desc}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Standards;
