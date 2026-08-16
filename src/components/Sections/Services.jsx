import React from 'react';
import { motion } from 'framer-motion';
import { getServices } from '../../constants/data';

const cardMotionProps = (delay) => ({
    initial: { opacity: 0, scale: 0.95, y: 30 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] },
});

const Services = ({ language, t }) => {
    const servicesList = getServices(language);

    return (
        <section id="services" className="max-w-7xl mx-auto px-4 scroll-mt-28 relative z-10">
            {/* Background ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center mb-16 relative">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-accent/80 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
                >
                    {t.services}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6"
                >
                    Ваш личный автопарк
                </motion.h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto opacity-80" />
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 pb-6 -mx-4 px-4 md:pb-0 md:mx-0 md:px-0">
                {servicesList.map((svc, idx) => {
                    const Icon = svc.icon;
                    return (
                        <motion.div
                            {...cardMotionProps(idx * 0.1)}
                            key={idx}
                            whileHover={{ y: -10 }}
                            className="group relative flex flex-col h-full rounded-[2rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden shrink-0 w-[85vw] snap-center md:w-auto md:shrink"
                            style={{ WebkitTransform: 'translate3d(0,0,0)' }} // Hardware acceleration
                        >
                            {/* Animated Inner Shine on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="bg-[#0a0d12]/90 backdrop-blur-xl rounded-[calc(2rem-1px)] p-6 sm:p-8 h-full flex flex-col relative z-10 transition-colors duration-500 group-hover:bg-[#0a0d12]/70">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/10 rounded-full blur-[40px] group-hover:bg-accent/20 transition-all duration-700" />

                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1f26] to-[#0f1318] border border-white/5 flex items-center justify-center mb-6 sm:mb-8 group-hover:scale-110 group-hover:-rotate-6 group-hover:border-accent/30 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                                    <Icon size={30} className="text-gray-300 group-hover:text-accent transition-colors duration-500" />
                                </div>

                                <h3 className="text-2xl font-serif font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {svc.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">
                                    {svc.subtitle}
                                </p>

                                <ul className="space-y-4 mb-8 flex-grow">
                                    {svc.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="flex items-start gap-4 text-sm text-gray-300/80 font-light group-hover:text-gray-200 transition-colors">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(245,200,106,0.6)]" />
                                            <span className="leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between group-hover:border-white/10 transition-colors">
                                    <span className="text-gray-200 font-semibold tracking-wide border-b border-transparent group-hover:border-accent/30 pr-2 transition-all">
                                        {svc.price}
                                    </span>
                                    <a
                                        href="#booking"
                                        className="relative overflow-hidden text-black bg-accent px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
                                    >
                                        <span className="relative z-10">{t.booking}</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Services;
