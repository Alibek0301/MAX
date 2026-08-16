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

            <div className="max-w-7xl mx-auto px-4 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                {/* Left Content Area */}
                <motion.div
                    variants={heroStagger}
                    initial="hidden"
                    animate="show"
                    className="flex-1 flex flex-col items-start text-left"
                >
                    <motion.div variants={fadeUp} className="mb-6 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2 drop-shadow-[0_0_15px_rgba(245,200,106,0.3)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        {t.heroBadge}
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.05] tracking-tight text-white"
                    >
                        {t.heroTitle.split(' — ')[0]} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2 block">
                            — {t.heroTitle.split(' — ')[1] || t.heroTitle}
                        </span>
                    </motion.h1>

                    <motion.div variants={fadeUp} className="max-w-xl text-gray-400 text-base lg:text-lg space-y-4 mb-10 leading-relaxed font-light">
                        <p>{t.heroP1}</p>
                        <p className="hidden md:block">{t.heroP2}</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mt-2">
                        <a
                            href="#booking"
                            className="group relative flex items-center justify-center bg-white text-black font-extrabold uppercase tracking-widest text-sm px-10 py-5 rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">{t.orderNowCta}</span>
                        </a>
                        <a
                            href="#services"
                            className="flex items-center justify-center px-10 py-5 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-colors"
                        >
                            Подробнее
                        </a>
                    </motion.div>
                </motion.div>

                {/* Right Image Area (Premium Car) */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    className="flex-1 w-full relative"
                >
                    <div className="relative w-full aspect-[4/3] max-h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                        {/* Overlay Gradient for seamless dark mode integration */}
                        <div className="absolute inset-0 bg-gradient-to-t from-base via-transparent to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-base/80 z-10 lg:block hidden" />

                        {/* THE IMAGE: Replace this source with your premium Astana photo */}
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.8 }}
                            src="https://images.unsplash.com/photo-1549317661-bc32c68f4c53?q=80&w=1000&auto=format&fit=crop"
                            alt="Premium Mercedes Taxi in Astana"
                            className="w-full h-full object-cover object-center relative z-0 opacity-90"
                        />

                        {/* Floating Experience Badge */}
                        <div className="absolute bottom-8 right-8 z-20 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 shadow-2xl">
                            <div className="text-accent text-3xl font-serif font-bold">24/7</div>
                            <div className="text-xs text-gray-300 font-bold uppercase tracking-widest leading-tight">
                                Премиум <br /> Поддержка
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
