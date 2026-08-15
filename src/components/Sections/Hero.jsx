import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0 },
};

const heroStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
};

const Hero = ({ t }) => {
    return (
        <section className="relative flex flex-col items-center text-center px-4 pt-16 md:pt-32 pb-24 overflow-hidden">
            {/* Background glowing effects for premium feel */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-[100%] pointer-events-none opacity-50" />
            <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <motion.div
                variants={heroStagger}
                initial="hidden"
                animate="show"
                className="max-w-4xl mx-auto flex flex-col items-center relative z-10"
            >
                <motion.div variants={fadeUp} className="mb-8 px-5 py-2 rounded-full border border-accent/40 bg-accent/10 backdrop-blur-md text-xs font-bold uppercase tracking-[0.15em] text-accent drop-shadow-glow shadow-[0_0_15px_rgba(245,200,106,0.15)]">
                    {t.heroBadge}
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400"
                >
                    {t.heroTitle}
                </motion.h1>

                <motion.div variants={fadeUp} className="max-w-2xl text-gray-300 text-base md:text-lg space-y-5 mb-14 leading-relaxed font-light">
                    <p>{t.heroP1}</p>
                    <p className="hidden md:block">{t.heroP2}</p>
                    <p className="hidden md:block opacity-80">{t.heroP3}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-accent to-amber-600 rounded-full blur opacity-25 group-hover:opacity-70 transition duration-1000 group-hover:duration-200"></div>
                    <a
                        href="#booking"
                        className="relative w-full sm:w-auto bg-gradient-to-br from-accent to-amber-500 text-black font-extrabold uppercase tracking-widest text-sm px-12 py-5 rounded-full hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl transform active:scale-95 flex items-center justify-center"
                    >
                        {t.orderNowCta}
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
