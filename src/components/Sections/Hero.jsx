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
        <section className="relative flex flex-col items-center text-center px-4 pt-12 md:pt-20 pb-16">
            <motion.div
                variants={heroStagger}
                initial="hidden"
                animate="show"
                className="max-w-4xl mx-auto flex flex-col items-center"
            >
                <motion.div variants={fadeUp} className="mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-accent drop-shadow-glow">
                    {t.heroBadge}
                </motion.div>

                <motion.h1
                    variants={fadeUp}
                    className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tight drop-shadow-lg"
                >
                    {t.heroTitle}
                </motion.h1>

                <motion.div variants={fadeUp} className="max-w-2xl text-gray-300 text-sm md:text-base space-y-4 mb-10 leading-relaxed font-light">
                    <p>{t.heroP1}</p>
                    <p className="hidden md:block">{t.heroP2}</p>
                    <p className="hidden md:block">{t.heroP3}</p>
                </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a
                        href="#booking"
                        className="w-full sm:w-auto bg-accent text-black font-bold uppercase tracking-widest text-sm px-10 py-5 rounded-full hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(245,200,106,0.3)] hover:shadow-[0_0_30px_rgba(245,200,106,0.5)] hover:-translate-y-1 transform active:scale-95"
                    >
                        {t.orderNowCta}
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
