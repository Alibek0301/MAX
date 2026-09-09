import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Car, Wallet, Clock,
    ShieldCheck, ArrowRight,
    UserPlus, Star, Phone, MessageCircle, CheckCircle2
} from 'lucide-react';
import { whatsappNumber } from '../constants/data';
import FAQ from '../components/Sections/FAQ';
import TeamCalculator from '../components/Sections/TeamCalculator';

const benefits = [
    { icon: Wallet, title: 'Выплаты каждый день', desc: 'Моментальный вывод средств на любую банковскую карту в любое время суток, без задержек и праздников.' },
    { icon: Clock, title: 'Свободный график', desc: 'Работайте тогда, когда вам удобно. Вы сами определяете свои выходные и рабочие часы.' },
    { icon: ShieldCheck, title: 'Поддержка парка 24/7', desc: 'Решаем вопросы с заказами, приоритетом и диспетчерской Яндекса за вас.' },
    { icon: Car, title: 'Помощь с авто', desc: 'Скидки на мойку и аренду. Помощь с оформлением документов и путевых листов.' },
    { icon: Star, title: 'Бонусы для Бизнеса', desc: 'Еженедельно упаковка брендированной воды в подарок для водителей тарифов Бизнес+.' }
];

/* ─────────────────────────────────────────────
   DRIVER VIEW (Premium Recruitment Style)
───────────────────────────────────────────── */
const DriverView = ({ t }) => {
    return (
        <div className="pb-[calc(5rem+env(safe-area-bottom))] bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">

            {/* HERO DRIVER */}
            <div id="for-drivers" className="relative min-h-[70vh] flex flex-col justify-end px-5 pb-12 pt-20 overflow-hidden scroll-mt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-[#050505]/90 to-[#050505] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[80%] h-[50%] bg-white/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/4 -translate-y-1/4" />
                <div className="absolute top-0 right-0 w-[60%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
                        <CheckCircle2 size={12} className="text-green-400" />
                        <span className="text-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase">Официальный партнер Яндекс Go</span>
                    </div>

                    <h1 className="text-[11vw] xs:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tighter">
                        Зарабатывай<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-300 to-amber-100">больше.</span>
                    </h1>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-[90%]">
                        Надёжный сертифицированный таксопарк MAX. Официальный партнёр Яндекс.Такси с прозрачными условиями, низкими комиссиями и стабильными ежедневными выплатами.
                    </p>

                    <div className="flex flex-col gap-2 mt-4 w-full">
                        <a
                            href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62" target="_blank" rel="noreferrer"
                            className="w-full bg-accent text-black font-extrabold uppercase tracking-widest rounded-xl py-3.5 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-[12px] shadow-[0_0_30px_rgba(245,200,106,0.3)]"
                        >
                            <UserPlus size={16} /> Заполнить анкету Яндекс Pro
                        </a>
                        <div className="flex gap-2 w-full">
                            <a
                                href="https://t.me/Max_taxBot" target="_blank" rel="noreferrer"
                                className="flex-1 bg-[#2AABEE] text-white font-extrabold uppercase tracking-wider rounded-xl py-3 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-[11px]"
                            >
                                <MessageCircle size={15} /> Telegram Bot
                            </a>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Здравствуйте,%20я%20хочу%20работать%20в%20MAX%20Taxi!`} target="_blank" rel="noreferrer"
                                className="flex-1 bg-[#25D366] text-white font-extrabold uppercase tracking-wider rounded-xl py-3 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-[11px]"
                            >
                                <Phone size={15} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* STATS BAR */}
            <div className="px-5 -mt-4 relative z-20">
                <div className="flex bg-[#0f1115] border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl divide-x divide-white/10">
                    {[
                        { val: '4.9★', label: 'Рейтинг парка' },
                        { val: 'Ежедн.', label: 'Выплаты' },
                        { val: '24/7', label: 'Поддержка' }
                    ].map((b, i) => (
                        <div key={i} className="flex-1 py-4 flex flex-col items-center justify-center text-center">
                            <span className="text-white font-bold text-lg leading-none mb-1">{b.val}</span>
                            <span className="text-gray-500 text-[9px] uppercase tracking-wider">{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CALCULATOR */}
            <div className="border-b border-white/5 px-5 pb-8 mb-8 mt-8">
                <TeamCalculator />
            </div>

            {/* BENEFITS */}
            <div id="driver-benefits" className="px-5 mt-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-5 tracking-tight">Условия для своих</h2>
                <div className="grid grid-cols-1 gap-3">
                    {benefits.map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <div key={i} className="bg-[#0f1115] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex items-center justify-center shrink-0">
                                    <Icon size={20} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-[14px] leading-tight mb-1.5">{b.title}</p>
                                    <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* HOW TO START */}
            <div id="trust" className="px-5 mt-10 mb-6 scroll-mt-24">
                <div className="bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] pointer-events-none" />
                    <h2 className="text-xl font-bold text-white mb-6 relative z-10 tracking-tight">Простой старт</h2>

                    <div className="space-y-4 relative z-10">
                        <div className="absolute top-4 bottom-6 left-[18px] w-px bg-accent/20" />
                        {[
                            { step: '01', text: 'Заполните анкету по ссылке ниже' },
                            { step: '02', text: 'Дождитесь быстрого подтверждения' },
                            { step: '03', text: 'Получайте заказы VIP и Бизнес' },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-4 relative bg-[#050505]/50 backdrop-blur-sm p-3.5 rounded-2xl border border-white/5">
                                <div className="bg-[#0f1115] border border-accent/30 w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg z-10">
                                    <span className="text-accent text-[11px] font-bold">{s.step}</span>
                                </div>
                                <p className="text-gray-300 text-[13px] font-medium leading-snug">{s.text}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 mt-6">
                        <a
                            href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62" target="_blank" rel="noreferrer"
                            className="w-full bg-accent text-black font-extrabold uppercase tracking-widest rounded-xl py-3.5 flex items-center justify-center active:scale-[0.98] transition-transform text-[11px]"
                        >
                            Заполнить анкету
                        </a>
                        <div className="flex gap-2">
                            <a
                                href="https://t.me/Max_taxBot" target="_blank" rel="noreferrer"
                                className="flex-1 bg-white/10 border border-white/10 text-white font-extrabold uppercase tracking-wider rounded-xl py-2.5 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform text-[10px]"
                            >
                                <MessageCircle size={14} className="text-[#2AABEE]" /> Telegram
                            </a>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Здравствуйте,%20я%20хочу%20работать%20в%20MAX%20Taxi!`} target="_blank" rel="noreferrer"
                                className="flex-1 bg-white/10 border border-white/10 text-white font-extrabold uppercase tracking-wider rounded-xl py-2.5 flex items-center justify-center gap-1.5 active:scale-[0.98] transition-transform text-[10px]"
                            >
                                <Phone size={14} className="text-[#25D366]" /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4">
                <FAQ language="ru" t={t} viewMode="driver" />
            </div>

            {/* Terms link */}
            <div className="px-5 pb-4">
                <a href="./drivers-offer.html" target="_blank"
                    className="block text-center text-gray-500 text-[10px] underline uppercase tracking-widest">
                    Условия сотрудничества и инструкция
                </a>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────
   ROOT EXPORT
───────────────────────────────────────────── */
const MobileApp = ({ language, t }) => {
    return <DriverView t={t} />;
};

export default MobileApp;
