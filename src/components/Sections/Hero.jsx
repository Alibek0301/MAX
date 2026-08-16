import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const heroStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
};

const Hero = ({ t }) => {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden">
            {/* Cinematic Background Lighting */}
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-accent/10 blur-[150px] rounded-full pointer-events-none opacity-60 translate-x-1/3 -translate-y-1/3" />

            {/* Very Top Thin Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            <div className="max-w-5xl mx-auto px-4 w-full relative z-10 flex flex-col items-center justify-center mt-12 mb-8">

                {/* Main Centered Content */}
                <motion.div
                    variants={heroStagger}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center text-center"
                >
                    <motion.div variants={fadeUp} className="mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2 drop-shadow-[0_0_15px_rgba(245,200,106,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {t.heroBadge}
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="font-serif text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 leading-[1.1] tracking-tight text-white"
                    >
                        {t.heroTitle.split(' — ')[0]} <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2 block">
                            — {t.heroTitle.split(' — ')[1] || t.heroTitle}
                        </span>
                    </motion.h1>

                    <motion.div variants={fadeUp} className="max-w-2xl text-gray-400 text-sm sm:text-base lg:text-lg space-y-3 sm:space-y-4 mb-8 lg:mb-10 leading-relaxed font-light mx-auto">
                        <p>{t.heroP1}</p>
                        <p className="hidden md:block">{t.heroP2}</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 w-full sm:w-auto mt-2">
                        <a
                            href="#booking"
                            className="group relative flex items-center justify-center bg-white text-black font-extrabold uppercase tracking-widest text-xs sm:text-sm px-8 sm:px-10 py-4 sm:py-5 rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">{t.orderNowCta}</span>
                        </a>
                        <a
                            href="#services"
                            className="flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-white/10 transition-colors"
                        >
                            Подробнее
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
