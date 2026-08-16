import React from 'react';
import { motion } from 'framer-motion';
import { getStandards } from '../../constants/data';

const cardMotionProps = (delay) => ({
    initial: { opacity: 0, x: -20 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay, ease: "easeOut" },
});

const Standards = ({ language, t }) => {
    const standardsData = getStandards(language);

    return (
        <section id="standards" className="max-w-7xl mx-auto px-4 scroll-mt-28 py-10 relative">

            <div className="text-center mb-16 relative z-10">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-accent/80 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
                >
                    Premium
                </motion.span>
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 tracking-wide drop-shadow-2xl">
                    {t.standardsTitleDesktop}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto opacity-80" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {standardsData.map((std, idx) => {
                    const Icon = std.icon;
                    return (
                        <motion.div
                            {...cardMotionProps(idx * 0.1)}
                            key={idx}
                            whileHover={{ scale: 1.02 }}
                            className="group relative flex flex-col items-start gap-5 p-6 sm:p-8 rounded-3xl bg-[#0a0d12]/60 hover:bg-[#11161d]/80 border border-white/5 hover:border-accent/20 transition-all duration-500 backdrop-blur-xl overflow-hidden"
                            style={{ WebkitTransform: 'translate3d(0,0,0)' }}
                        >
                            {/* Glow accent */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[40px] group-hover:bg-accent/15 transition-all duration-700 pointer-events-none" />

                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 relative z-10">
                                <Icon size={24} className="text-gray-300 group-hover:text-accent transition-colors duration-500" />
                            </div>

                            <div className="relative z-10">
                                <h4 className="font-bold text-lg md:text-xl mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {std.title}
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                    {std.desc}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Standards;
