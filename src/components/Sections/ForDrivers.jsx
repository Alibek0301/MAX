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

                        <motion.h2 variants={fadeIn} className="text-3xl md:text-5xl font-serif font-bold leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                            {t.partnerDriversTitle}
                        </motion.h2>

                        <motion.p variants={fadeIn} className="text-gray-300 text-lg leading-relaxed font-light">
                            {t.partnerDriversText}
                        </motion.p>

                        <motion.div variants={fadeIn} className="pt-4">
                            <button
                                onClick={() => {
                                    const iframe = document.getElementById('yandex-fleet-iframe');
                                    if (iframe) iframe.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 md:gap-3 bg-gradient-to-br from-accent to-amber-500 text-black font-extrabold uppercase tracking-widest text-xs md:text-sm px-6 py-4 md:px-10 md:py-5 rounded-full overflow-hidden transition-all shadow-xl hover:shadow-[0_0_30px_rgba(245,200,106,0.4)] active:scale-95 mx-auto lg:mx-0"
                            >
                                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                                    {t.partnerDriversButton}
                                </span>
                                <ArrowRight className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform rotate-90" />
                            </button>
                        </motion.div>
                    </div>

                    <div className="hidden lg:w-1/2 md:flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 sm:grid sm:grid-cols-2 md:gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                className="bg-[#1a222c]/80 border border-white/5 rounded-2xl p-6 hover:bg-[#1a222c] hover:border-accent/30 transition-all duration-500 backdrop-blur-md group relative overflow-hidden shrink-0 w-[85vw] snap-center sm:w-auto sm:shrink text-left"
                            >
                                {/* Hover glow effect inside card */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative z-10">
                                    <div className="p-3 bg-accent/10 rounded-xl w-fit mb-5 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-500 shadow-[0_0_15px_rgba(245,200,106,0.1)]">
                                        {benefit.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold mb-3 text-white">
                                        {t[benefit.titleKey]}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed font-light">
                                        {t[benefit.descKey]}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Yandex Fleet Driver Registration Form */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className="mt-16 flex flex-col items-center justify-center relative z-10"
                >
                    <div id="yandex-fleet-iframe" className="w-full max-w-[600px] h-[600px] bg-surface rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative scroll-mt-28">
                        <div className="absolute inset-0 bg-accent/5 animate-pulse" /> {/* Loading placeholder effect */}
                        <iframe
                            title="Регистрация водителей Yandex"
                            width="100%"
                            height="100%"
                            src="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62&iframe=true&lang=ru"
                            className="border-none relative z-10 bg-white"
                        ></iframe>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ForDrivers;
