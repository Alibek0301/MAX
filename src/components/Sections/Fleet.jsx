import React from 'react';
import { motion } from 'framer-motion';
import { getFleet } from '../../constants/data';
import { Car, Crown, BriefcaseBusiness } from 'lucide-react';

const iconMap = {
    'Car': Car,
    'Crown': Crown,
    'BriefcaseBusiness': BriefcaseBusiness
};

const Fleet = ({ language, t }) => {
    const fleetList = getFleet(language);

    return (
        <section id="fleet" className="max-w-7xl mx-auto px-4 scroll-mt-28 py-10 relative">
            <div className="text-center mb-16 relative">
                <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-accent/80 text-xs font-bold tracking-[0.2em] uppercase mb-4 block"
                >
                    Premium
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6"
                >
                    {t.fleetTitle}
                </motion.h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto opacity-80" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                {fleetList.map((vehicle, idx) => {
                    const Icon = iconMap[vehicle.icon] || Car;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: idx * 0.15 }}
                            whileHover={{ y: -5 }}
                            className="group relative flex flex-col md:h-full rounded-2xl md:rounded-[2rem] p-[1px] bg-gradient-to-b from-white/10 to-transparent overflow-hidden"
                            style={{ WebkitTransform: 'translate3d(0,0,0)' }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="bg-[#0a0d12]/90 backdrop-blur-xl rounded-[calc(1rem-1px)] md:rounded-[calc(2rem-1px)] p-5 md:p-8 flex flex-col relative z-10 transition-colors duration-500 group-hover:bg-[#0a0d12]/70 h-full">
                                <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent/5 rounded-full blur-[40px] group-hover:bg-accent/20 transition-all duration-700" />

                                <div className="flex items-center gap-4 md:flex-col md:items-start mb-4 md:mb-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#1a1f26] to-[#0f1318] border border-white/5 flex items-center justify-center focus-within:ring group-hover:scale-110 md:group-hover:-rotate-3 group-hover:border-accent/30 transition-all duration-500 shadow-xl">
                                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-gray-400 group-hover:text-accent transition-colors duration-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                            {vehicle.class}
                                        </h3>
                                        <p className="text-xs md:text-sm font-semibold text-accent/80">{vehicle.models}</p>
                                    </div>
                                </div>

                                <p className="text-gray-400 text-xs sm:text-sm mb-4 md:mb-8 leading-relaxed font-light flex-grow">
                                    {vehicle.desc}
                                </p>

                                <div className="pt-4 md:pt-6 border-t border-white/5 mt-auto flex items-center justify-between group-hover:border-white/10 transition-colors">
                                    <span className="text-base md:text-lg text-gray-200 font-bold tracking-wide">
                                        {vehicle.price}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default Fleet;
