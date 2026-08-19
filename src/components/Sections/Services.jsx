import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getServices } from '../../constants/data';
import { X, ChevronRight } from 'lucide-react';

const cardMotionProps = (delay) => ({
    initial: { opacity: 0, scale: 0.95, y: 20 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay, ease: "easeOut" },
});

const Services = ({ language, t }) => {
    const servicesList = getServices(language);
    const [selectedService, setSelectedService] = useState(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedService) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedService]);

    return (
        <section id="services" className="max-w-7xl mx-auto px-4 scroll-mt-28 relative z-10">
            {/* Background ambient light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="text-center mb-10 md:mb-16 relative">
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
                    className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-md"
                >
                    Ваш личный автопарк
                </motion.h2>
                <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto opacity-80" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
                {servicesList.map((svc, idx) => {
                    const Icon = svc.icon;
                    return (
                        <motion.div
                            {...cardMotionProps(idx * 0.1)}
                            key={idx}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedService(svc)}
                            className="group cursor-pointer relative flex flex-col h-full rounded-2xl md:rounded-[2rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
                            style={{ WebkitTransform: 'translate3d(0,0,0)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="bg-[#0a0d12]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] md:rounded-[calc(2rem-1px)] p-4 sm:p-6 md:p-8 h-full flex flex-col relative transition-colors duration-500 group-hover:bg-[#0a0d12]/70 items-center text-center transform-gpu isolate">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-[40px] group-hover:bg-accent/20 transition-all duration-700 pointer-events-none -z-10" />

                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1a1f26] to-[#0f1318] border border-white/5 flex items-center justify-center mb-4 md:mb-6 md:group-hover:scale-110 md:group-hover:-rotate-3 md:group-hover:border-accent/30 transition-all duration-500 shadow-lg relative z-10">
                                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-gray-300 md:group-hover:text-accent transition-colors duration-500" />
                                </div>

                                <h3 className="text-[13px] leading-tight sm:text-base md:text-xl font-serif font-bold text-white md:group-hover:text-amber-400 transition-colors duration-300 h-[2.5em] md:h-auto flex items-center justify-center">
                                    {svc.title}
                                </h3>

                                <div className="mt-4 opacity-50 group-hover:opacity-100 flex items-center justify-center group-hover:text-accent transition-colors">
                                    <span className="text-[10px] md:text-sm tracking-widest uppercase font-bold mr-1 hidden sm:block">Подробнее</span>
                                    <ChevronRight size={14} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedService && (
                    <motion.div
                        key="modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedService(null)}
                    >
                        <motion.div
                            key="modal-content"
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gradient-to-b from-[#121820] to-[#0a0d12] w-full max-w-lg rounded-3xl border border-white/10 p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                        >
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedService(null);
                                }}
                                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-white/50 hover:text-white transition-colors hover:bg-white/10 z-[101]"
                            >
                                <X size={24} />
                            </button>

                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[60px] pointer-events-none transform translate-x-1/2 -translate-y-1/2" />

                            <div className="flex items-center gap-4 mb-6 relative z-10 pt-2">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1a1f26] to-[#0f1318] border border-white/5 flex items-center justify-center shadow-lg shrink-0">
                                    {selectedService.icon && React.createElement(selectedService.icon, { size: 28, className: "text-accent" })}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white pr-6">
                                    {selectedService.title}
                                </h3>
                            </div>

                            <div className="overflow-y-auto pr-2 relative z-10 flex-grow hide-scrollbar">
                                <p className="text-accent/80 text-sm font-semibold mb-6">
                                    {selectedService.subtitle}
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {selectedService.details.map((detail, dIdx) => (
                                        <li key={dIdx} className="flex items-start gap-4 text-sm text-gray-300 font-light">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(245,200,106,0.5)]" />
                                            <span className="leading-relaxed">{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="pt-6 border-t border-white/10 mt-4 shrink-0 flex items-center justify-between relative z-10">
                                <span className="text-gray-200 font-bold tracking-wide">
                                    {selectedService.price}
                                </span>
                                <a
                                    href="#booking"
                                    onClick={() => setSelectedService(null)}
                                    className="relative flex items-center gap-2 text-black bg-gradient-to-r from-accent to-yellow-500 px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-transform"
                                >
                                    <span>{t.booking}</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Services;
