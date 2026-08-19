import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Car, Star } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const heroStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
};

const Hero = ({ t }) => {
    const [liveStats, setLiveStats] = useState({
        active: 45,
        completed: 12450,
        wait: 8,
        recent: 'S-Class в Аэропорт',
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const routes = ['в Аэропорт', 'в Алма-Арасан', 'на Медеу', 'в Центр', 'из Отеля Rixos', 'в Есентай'];
            const cars = ['S-Class', 'Comfort+', 'Maybach', 'Minivan V-Class', 'E-Class'];

            setLiveStats(prev => ({
                active: Math.floor(Math.random() * (54 - 38 + 1)) + 38,
                completed: prev.completed + Math.floor(Math.random() * 3),
                wait: Math.floor(Math.random() * (12 - 5 + 1)) + 5,
                recent: `${cars[Math.floor(Math.random() * cars.length)]} ${routes[Math.floor(Math.random() * routes.length)]}`
            }));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-6 md:pt-32 md:pb-10 overflow-hidden">
            {/* Cinematic Background Lighting */}
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-accent/5 blur-[150px] rounded-full pointer-events-none opacity-80 translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none opacity-50 -translate-x-1/3 translate-y-1/3" />

            {/* Very Top Thin Accent Line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 w-full relative z-10 flex flex-col items-center justify-center mt-6 mb-4 flex-grow">
                {/* Main Centered Content */}
                <motion.div
                    variants={heroStagger}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center text-center w-full"
                >
                    <motion.div variants={fadeUp} className="mb-5 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-xs font-bold uppercase tracking-[0.2em] text-gray-300 flex items-center gap-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        {t.heroBadge}
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        className="font-serif text-5xl sm:text-6xl lg:text-8xl font-bold mb-4 lg:mb-5 leading-[1.05] tracking-tight text-white drop-shadow-2xl"
                    >
                        {t.heroTitle.split(' — ')[0]} <br className="hidden sm:block" />
                        <span className="font-sans font-light text-gray-200 text-3xl sm:text-5xl lg:text-7xl mt-4 block tracking-normal drop-shadow-md">
                            {t.heroTitle.split(' — ')[1] || t.heroTitle}
                        </span>
                    </motion.h1>

                    <motion.div variants={fadeUp} className="max-w-3xl text-gray-200 text-base lg:text-xl space-y-4 mb-6 lg:mb-8 leading-relaxed font-light mx-auto">
                        <p>{t.heroP1}</p>
                    </motion.div>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-6 w-full sm:w-auto relative">
                        {/* Glowing effect behind CTA */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/20 blur-[50px] rounded-full pointer-events-none"></div>

                        <a
                            href="#booking"
                            className="group relative flex items-center justify-center bg-white text-black font-extrabold uppercase tracking-widest text-sm px-12 py-5 rounded-full overflow-hidden transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(245,200,106,0.4)] hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">{t.orderNowCta}</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 group-hover:translate-x-[100%] -translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        </a>
                        <a
                            href="#corporate"
                            className="flex items-center justify-center px-10 py-5 rounded-full border border-white/20 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/10 hover:border-white/40 transition-colors"
                        >
                            Для бизнеса
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Live Ticker / Global Platform Feel */}
            <div className="w-full mt-auto relative z-20 border-y border-white/5 bg-black/40 backdrop-blur-md py-4 overflow-hidden">
                <div className="flex whitespace-nowrap animate-marquee items-center">
                    {/* Repeat elements for seamless marquee */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-8 md:space-x-12 px-4 md:px-6">
                            <div className="flex items-center gap-3 text-gray-300 font-medium text-xs md:text-sm tracking-wide">
                                <span className="text-green-500 font-bold mx-2">●</span> LIVE
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 font-medium text-xs md:text-sm tracking-wide">
                                <Car size={16} className="text-accent" />
                                <span>{liveStats.active} Авто на линии</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 font-medium text-xs md:text-sm tracking-wide">
                                <Clock size={16} className="text-accent" />
                                <span>Подача: ~{liveStats.wait} мин</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 font-medium text-xs md:text-sm tracking-wide">
                                <Star size={16} className="text-accent" />
                                <span>Недавно завершен: {liveStats.recent}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300 font-medium text-xs md:text-sm tracking-wide">
                                <Shield size={16} className="text-accent" />
                                <span>{liveStats.completed.toLocaleString()} Успешных поездок</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Hero;
