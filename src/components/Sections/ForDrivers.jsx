import React from 'react';
import { motion } from 'framer-motion';
import { Car, Wallet, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const benefits = [
    {
        icon: <Wallet className="w-8 h-8 text-accent" />,
        titleKey: 'driverBenefit1Title',
        descKey: 'driverBenefit1Desc'
    },
    {
        icon: <Clock className="w-8 h-8 text-accent" />,
        titleKey: 'driverBenefit2Title',
        descKey: 'driverBenefit2Desc'
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-accent" />,
        titleKey: 'driverBenefit3Title',
        descKey: 'driverBenefit3Desc'
    },
    {
        icon: <Car className="w-8 h-8 text-accent" />,
        titleKey: 'driverBenefit4Title',
        descKey: 'driverBenefit4Desc'
    }
];

const ForDrivers = ({ t }) => {
    return (
        <section id="for-drivers" className="relative py-10 lg:py-16 px-4 overflow-hidden mt-6 lg:mt-12 bg-surface/30 border-y border-white/5">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                    className="flex flex-col lg:flex-row gap-16 items-center"
                >
                    {/* Left: Text & CTA */}
                    <div className="lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left">
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-[0.15em] uppercase shadow-[0_0_15px_rgba(245,200,106,0.15)] mx-auto lg:mx-0">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            {t.driverBadge}
                        </motion.div>

                        <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] text-white drop-shadow-md">
                            {t.partnerDriversTitle}
                        </motion.h2>

                        <motion.p variants={fadeIn} className="text-gray-300 text-lg leading-relaxed font-light">
                            {t.partnerDriversText}
                        </motion.p>

                        <motion.div variants={fadeIn} className="pt-4">
                            <a
                                href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 bg-gradient-to-br from-accent to-amber-500 text-black font-extrabold uppercase tracking-widest text-xs md:text-sm px-6 py-4 md:px-10 md:py-5 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-[0_0_30px_rgba(245,200,106,0.4)] active:scale-95 mx-auto lg:mx-0"
                            >
                                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                    {t.partnerDriversButton}
                                </span>
                                <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-8 lg:pt-0">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                className="bg-[#1a222c]/80 border border-white/5 rounded-2xl p-6 hover:bg-[#1a222c] hover:border-accent/30 transition-all duration-500 backdrop-blur-md group relative overflow-hidden text-left shadow-lg h-full"
                            >
                                {/* Hover glow effect inside card */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="p-3 bg-accent/10 rounded-xl w-fit mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500 shadow-[0_0_15px_rgba(245,200,106,0.1)]">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-3 text-white">
                                        {t[benefit.titleKey]}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light">
                                        {t[benefit.descKey]}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ForDrivers;
