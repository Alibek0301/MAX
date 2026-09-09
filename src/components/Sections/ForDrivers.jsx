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

                            <div className="mt-4 lg:text-left text-center">
                                <a href="./drivers-offer.html" target="_blank" className="text-gray-400 hover:text-white underline text-xs transition duration-300">
                                    {t.partnerDriversButton.includes('Қосылу')
                                        ? 'Жүргізушілермен ынтымақтастық шарттары'
                                        : 'Условия сотрудничества и инструкция по подключению'
                                    }
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-8 lg:pt-0">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                variants={fadeIn}
                                className="bg-[#1a222c] border border-white/10 rounded-2xl p-6 hover:bg-[#1e2936] hover:border-accent/30 transition-all duration-500 group relative overflow-hidden text-left shadow-lg h-full text-white"
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
                                    <p className="text-sm md:text-base text-gray-200 leading-relaxed">
                                        {t[benefit.descKey]}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* APPS DOWNLOAD */}
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}
                    variants={staggerContainer}
                    className="mt-16 pt-12 border-t border-white/5"
                >
                    <motion.h3 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-white mb-2 text-center lg:text-left">
                        {t.appsTitle || 'Приложения для работы'}
                    </motion.h3>
                    <motion.p variants={fadeIn} className="text-gray-400 mb-8 text-center lg:text-left">
                        {t.appsSubtitle || 'Скачайте нужные приложения для старта — всё в одном месте.'}
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Yandex Pro */}
                        <motion.div variants={fadeIn} className="bg-[#0f1115] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-[#FF5C01]/30 transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#FF5C01]/10 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-[#FF5C01] flex items-center justify-center shrink-0 shadow-lg shadow-[#FF5C01]/30">
                                    <span className="text-white font-black text-2xl">Я</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-tight">Яндекс Про</p>
                                    <p className="text-gray-400 text-sm">{t.yandexProSub || 'Основное приложение водителя'}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                {t.yandexProDesc || 'Принимайте заказы через официальное приложение Яндекс Про — удобный интерфейс, встроенный навигатор и полная история поездок.'}
                            </p>
                            <div className="flex gap-3">
                                <a href="https://apps.apple.com/kz/app/yandex-pro/id1496904594" target="_blank" rel="noreferrer"
                                    className="flex-1 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-wider rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all text-[11px]">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    App Store (iPhone)
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=ru.yandex.taximeter" target="_blank" rel="noreferrer"
                                    className="flex-1 bg-[#FF5C01]/15 border border-[#FF5C01]/30 text-[#FF5C01] font-bold uppercase tracking-wider rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-[#FF5C01]/25 active:scale-95 transition-all text-[11px]">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.18 23.76c.37.2.8.22 1.19.04l12.44-6.53-2.67-2.68-10.96 9.17zM.5 1.52C.19 1.94 0 2.5 0 3.22v17.56c0 .72.19 1.28.5 1.7l.09.08 9.84-9.84v-.23L.59 1.44.5 1.52zM20.33 10.75l-2.67-1.4-2.99 3 2.99 2.99 2.68-1.4c.77-.42.77-1.11 0-1.52l-.01-.67zM4.37.2L16.81 6.73 14.14 9.4 3.18.25c.39-.19.83-.17 1.19-.05z" />
                                    </svg>
                                    Google Play (Android)
                                </a>
                            </div>
                        </motion.div>

                        {/* Alaman */}
                        <motion.div variants={fadeIn} className="bg-[#0f1115] border border-white/5 rounded-2xl p-6 relative overflow-hidden group hover:border-accent/30 transition-colors duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center shrink-0 shadow-lg shadow-accent/30">
                                    <span className="text-black font-black text-2xl">A</span>
                                </div>
                                <div>
                                    <p className="text-white font-bold text-lg leading-tight">Alaman</p>
                                    <p className="text-gray-400 text-sm">{t.alamanSub || 'Платформа мотивации водителей'}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                {t.alamanDesc || 'Платформа для управления доходом и мотивацией водителей. Отслеживайте заработок, бонусы и статистику прямо в приложении.'}
                            </p>
                            <div className="flex gap-3">
                                <a href="https://apps.apple.com/kz/app/alaman/id6804622782" target="_blank" rel="noreferrer"
                                    className="flex-1 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-wider rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-white/10 active:scale-95 transition-all text-[11px]">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    App Store (iPhone)
                                </a>
                                <a href="https://play.google.com/store/apps/details?id=app.alaman.mobile" target="_blank" rel="noreferrer"
                                    className="flex-1 bg-accent/10 border border-accent/20 text-accent font-bold uppercase tracking-wider rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-accent/20 active:scale-95 transition-all text-[11px]">
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.18 23.76c.37.2.8.22 1.19.04l12.44-6.53-2.67-2.68-10.96 9.17zM.5 1.52C.19 1.94 0 2.5 0 3.22v17.56c0 .72.19 1.28.5 1.7l.09.08 9.84-9.84v-.23L.59 1.44.5 1.52zM20.33 10.75l-2.67-1.4-2.99 3 2.99 2.99 2.68-1.4c.77-.42.77-1.11 0-1.52l-.01-.67zM4.37.2L16.81 6.73 14.14 9.4 3.18.25c.39-.19.83-.17 1.19-.05z" />
                                    </svg>
                                    Google Play (Android)
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ForDrivers;
