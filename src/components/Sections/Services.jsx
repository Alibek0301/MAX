import React from 'react';
import { motion } from 'framer-motion';
import { getServices } from '../../constants/data';

const cardMotionProps = (delay) => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-50px' },
    transition: { duration: 0.5, delay },
});

const Services = ({ language, t }) => {
    const servicesList = getServices(language);

    return (
        <section id="services" className="max-w-7xl mx-auto px-4 scroll-mt-28">
            <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-4">{t.services}</h2>
                <div className="w-24 h-1 bg-accent mx-auto rounded-full opacity-80 shadow-glow" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesList.map((svc, idx) => {
                    const Icon = svc.icon;
                    return (
                        <motion.div
                            {...cardMotionProps(idx * 0.1)}
                            key={idx}
                            className="bg-gradient-to-br from-surface to-black border border-white/5 rounded-2xl p-8 hover:border-accent/40 hover:from-surface/80 hover:to-surface transition-all duration-500 group flex flex-col h-full shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-[50px] group-hover:bg-accent/10 transition-colors pointer-events-none" />
                            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-glow relative z-10">
                                <Icon size={32} className="text-accent" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold mb-3 group-hover:text-accent transition-colors relative z-10">{svc.title}</h3>
                            <p className="text-gray-400 text-sm mb-6 min-h-[40px] leading-relaxed relative z-10">{svc.subtitle}</p>

                            <ul className="space-y-3 mb-6 flex-grow">
                                {svc.details.map((detail, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-3 text-sm text-gray-300">
                                        <span className="text-accent mt-0.5 opacity-70 flex-shrink-0">✦</span>
                                        <span className="leading-snug">{detail}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4 border-t border-white/5 mt-auto">
                                <p className="text-white font-semibold flex items-center justify-between">
                                    {svc.price}
                                    <a href="#booking" className="text-accent text-xs uppercase tracking-widest font-bold hover:underline">
                                        {t.booking}
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Services;
