import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane, Building2, MapPin, Car, Wallet, Clock,
    ShieldCheck, ArrowRight, X, ChevronRight,
    UserPlus, Star, Phone, MessageCircle, Crown, CheckCircle2
} from 'lucide-react';
import { whatsappNumber, getFleet, getServices } from '../constants/data';
import FAQ from '../components/Sections/FAQ';
import TeamCalculator from '../components/Sections/TeamCalculator';

/* ─────────────────────────────────────────────
   QUICK SERVICES (клиент)
───────────────────────────────────────────── */
const quickServices = [
    { id: 'airport', icon: Plane, label: 'Аэропорт', desc: 'NQZ, встреча с табличкой', color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/20' },
    { id: 'business', icon: Building2, label: 'Бизнес', desc: 'Корпоративные поездки', color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/20' },
    { id: 'city', icon: MapPin, label: 'По городу', desc: 'Astana, 24/7', color: 'from-accent/20 to-amber-600/5', border: 'border-accent/20' },
    { id: 'transfer', icon: Car, label: 'Трансфер', desc: 'Межгород и VIP', color: 'from-green-500/20 to-green-600/5', border: 'border-green-500/20' },
];

const benefits = [
    { icon: Wallet, title: 'Выплаты каждый день', desc: 'Возможность вывода денег на карту Kaspi ежедневно без задержек и праздников.' },
    { icon: Clock, title: 'Свободный график', desc: 'Работайте тогда, когда вам удобно. Вы сами определяете свои выходные и рабочие часы.' },
    { icon: ShieldCheck, title: 'Поддержка парка 24/7', desc: 'Решаем вопросы с заказами, приоритетом и диспетчерской Яндекса за вас.' },
    { icon: Car, title: 'Помощь с авто', desc: 'Скидки на мойку и аренду. Помощь с оформлением документов и путевых листов.' },
    { icon: MapPin, title: 'Заказы трансфера', desc: 'Доступ к эксклюзивным межгородним заказам трансфера по высоким тарифам от парка.' },
    { icon: Star, title: 'Бонусы для Бизнеса', desc: 'Еженедельно упаковка брендированной воды в подарок для водителей тарифов Бизнес+.' }
];

/* ─────────────────────────────────────────────
   BOOKING BOTTOM SHEET
───────────────────────────────────────────── */
const BookingSheet = ({ open, onClose, t, language }) => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', phone: '', service: '', date: '' });
    const services = getServices(language);

    const update = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    const send = () => {
        if (!form.phone || form.phone.replace(/\D/g, '').length < 10) return;
        const text = encodeURIComponent(
            `*Новый заказ MAX*\n- Имя: ${form.name}\n- Телефон: ${form.phone}\n- Услуга: ${form.service}\n- Дата: ${form.date}`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        onClose();
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Sheet */}
                    <motion.div
                        initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[201] bg-[#0f1318] rounded-t-3xl border-t border-white/10 shadow-2xl pb-[env(safe-area-inset-bottom)]"
                    >
                        {/* Handle */}
                        <div className="flex justify-center pt-3 pb-2">
                            <div className="w-10 h-1 bg-white/20 rounded-full" />
                        </div>

                        <div className="px-5 pb-6 pt-2">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-bold text-white">Куда едем?</h2>
                                <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400">
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Progress dots */}
                            <div className="flex gap-1.5 mb-5">
                                {[1, 2, 3].map(s => (
                                    <div key={s} className={`h-1 rounded-full flex-1 transition-all duration-300 ${step >= s ? 'bg-accent' : 'bg-white/10'}`} />
                                ))}
                            </div>

                            {step === 1 && (
                                <div className="space-y-3">
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Шаг 1 — Ваши данные</p>
                                    <input
                                        name="name" value={form.name} onChange={update}
                                        placeholder="Ваше имя"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-gray-500 text-[16px] focus:outline-none focus:border-accent/50"
                                    />
                                    <input
                                        name="phone" value={form.phone} onChange={update}
                                        placeholder="+7 ___ ___ __ __" type="tel" inputMode="tel"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-gray-500 text-[16px] focus:outline-none focus:border-accent/50"
                                    />
                                    <button
                                        onClick={() => form.name && form.phone.replace(/\D/g, '').length >= 10 && setStep(2)}
                                        className="w-full bg-accent text-black font-bold rounded-2xl py-4 text-sm active:scale-95 transition-transform"
                                    >
                                        Далее →
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-3">
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Шаг 2 — Услуга и дата</p>
                                    <select
                                        name="service" value={form.service} onChange={update}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-[16px] focus:outline-none focus:border-accent/50 appearance-none"
                                    >
                                        <option value="" disabled className="bg-[#0f1318]">— Выберите услугу —</option>
                                        {services.map((s, i) => <option key={i} value={s.title} className="bg-[#0f1318]">{s.title}</option>)}
                                    </select>
                                    <input
                                        type="datetime-local" name="date" value={form.date} onChange={update}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white text-[16px] focus:outline-none focus:border-accent/50 [color-scheme:dark]"
                                    />
                                    <div className="flex gap-2">
                                        <button onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 text-white font-bold rounded-2xl py-4 text-sm active:scale-95 transition-transform">← Назад</button>
                                        <button
                                            onClick={() => form.service && form.date && setStep(3)}
                                            className="flex-[2] bg-accent text-black font-bold rounded-2xl py-4 text-sm active:scale-95 transition-transform"
                                        >
                                            Далее →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-3">
                                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-2">Шаг 3 — Подтвердить</p>
                                    <div className="bg-white/5 rounded-2xl p-4 space-y-2 border border-white/10 text-sm text-gray-300">
                                        <div className="flex justify-between"><span className="text-gray-500">Имя</span><span className="text-white font-medium">{form.name}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Телефон</span><span className="text-white font-medium">{form.phone}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Услуга</span><span className="text-white font-medium text-right max-w-[55%]">{form.service}</span></div>
                                        <div className="flex justify-between"><span className="text-gray-500">Дата</span><span className="text-white font-medium">{new Date(form.date).toLocaleString('ru')}</span></div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => setStep(2)} className="flex-1 bg-white/5 border border-white/10 text-white font-bold rounded-2xl py-4 text-sm active:scale-95 transition-transform">← Назад</button>
                                        <button onClick={send} className="flex-[2] bg-green-500 text-white font-bold rounded-2xl py-4 text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                                            <MessageCircle size={16} /> Отправить
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

/* ─────────────────────────────────────────────
   CLIENT VIEW (Premium Landing Style)
───────────────────────────────────────────── */
const ClientView = ({ t, language }) => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const fleet = getFleet(language);

    return (
        <div className="pb-[calc(6.5rem+env(safe-area-inset-bottom))] bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">

            {/* 1. HERO SECTION */}
            <div id="booking" className="relative min-h-[75vh] flex flex-col justify-end px-5 pb-12 pt-20 overflow-hidden scroll-mt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-[#050505]/80 to-[#050505] pointer-events-none" />
                <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-accent/20 blur-[120px] rounded-full pointer-events-none translate-x-1/4 -translate-y-1/4" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 rounded-full px-3 py-1.5 backdrop-blur-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent text-[10px] font-bold tracking-[0.2em] uppercase">Astana · NQZ</span>
                    </div>

                    <h1 className="text-[11vw] xs:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tighter">
                        Ваш статус.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-300 to-amber-100">
                            Ваш комфорт.
                        </span>
                    </h1>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-[90%]">
                        Персональный автопарк бизнес и VIP-класса. Идеально для важных встреч, бизнес-трансферов и тех, кто ценит абсолютный уровень.
                    </p>

                    <button
                        onClick={() => setSheetOpen(true)}
                        className="w-full bg-accent text-black font-extrabold uppercase tracking-widest rounded-2xl py-4 active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(245,200,106,0.25)] flex items-center justify-center gap-2"
                    >
                        Забронировать авто <ChevronRight size={16} strokeWidth={3} />
                    </button>
                </div>
            </div>

            {/* 2. NUMBERS / TRUST */}
            <div className="px-5 -mt-4 relative z-20 scroll-mt-24">
                <div className="flex bg-[#0f1115] border border-white/10 rounded-2xl shadow-xl backdrop-blur-xl divide-x divide-white/10">
                    {[
                        { val: '24/7', label: 'Подача авто' },
                        { val: 'VIP', label: 'Протокол NDA' },
                        { val: '4.9', label: 'Рейтинг парка' }
                    ].map((b, i) => (
                        <div key={i} className="flex-1 py-4 flex flex-col items-center justify-center text-center">
                            <span className="text-white font-bold text-lg leading-none mb-1">{b.val}</span>
                            <span className="text-gray-500 text-[9px] uppercase tracking-wider">{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. SERVICES (ELEGANT GRID) */}
            <div id="services" className="px-5 mt-10 scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-5 tracking-tight">Наши услуги</h2>
                <div className="grid grid-cols-2 gap-3">
                    {quickServices.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.id} onClick={() => setSheetOpen(true)} className="group relative bg-[#0f1115] border border-white/5 rounded-2xl p-4 overflow-hidden active:scale-[0.97] transition-all cursor-pointer min-h-[140px] flex flex-col justify-end">
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.color} blur-[50px] opacity-20`} />
                                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Icon size={18} className="text-white relative z-10" />
                                </div>
                                <div className="relative z-10 mt-12">
                                    <h3 className="text-white text-[15px] font-bold leading-tight mb-1">{s.label}</h3>
                                    <p className="text-gray-400 text-[11px] leading-tight">{s.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. PREMIUM FLEET CAROUSEL */}
            <div id="fleet" className="mt-12 scroll-mt-24">
                <div className="px-5 mb-5 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Элитный парк</h2>
                    <div className="flex items-center gap-1.5 border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full text-accent text-[9px] font-bold uppercase tracking-widest">
                        <Star size={10} className="fill-accent" /> Premium
                    </div>
                </div>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-5 pb-4 scrollbar-none">
                    {fleet.map((car, i) => (
                        <div key={i} className="snap-center shrink-0 w-[85vw] bg-[#0f1115] border border-white/5 rounded-3xl overflow-hidden flex flex-col relative group">
                            {/* Overlay Glow */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-accent/5 blur-[50px]" />

                            {/* Top Photo Area (Abstract representation) */}
                            <div className="h-32 bg-gradient-to-br from-white/5 to-transparent relative flex items-center justify-center border-b border-white/5">
                                <Crown size={48} className="text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth={1} />
                                <div className="absolute bottom-3 left-4 bg-[#0a0d12]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                    <span className="text-white text-[10px] font-bold tracking-[0.15em] uppercase">{car.class}</span>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col grow relative z-10">
                                <h3 className="text-accent font-bold text-lg mb-2">{car.models}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6">{car.desc}</p>
                                <div className="mt-auto flex items-end justify-between">
                                    <div>
                                        <p className="text-gray-500 text-[9px] uppercase tracking-wider mb-1">Подача от</p>
                                        <p className="text-white font-extrabold text-xl leading-none">{car.price}</p>
                                    </div>
                                    <button onClick={() => setSheetOpen(true)} className="w-11 h-11 rounded-full bg-accent flex items-center justify-center shadow-[0_0_20px_rgba(245,200,106,0.25)] active:scale-95 transition-transform">
                                        <ChevronRight size={20} className="text-black" strokeWidth={3} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="shrink-0 w-1" />
                </div>
            </div>

            {/* 5. STANDARDS / WHY US */}
            <div id="standards" className="px-5 mt-8 pb-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-5 tracking-tight">Безупречность в деталях</h2>
                <div className="space-y-3">
                    {[
                        { title: 'Точность до минуты', desc: 'Автомобиль подается за 15 минут до старта. Никаких ожиданий.', icon: Clock },
                        { title: 'Абсолютная безопасность', desc: 'Авторизованный сервис, профессиональные водители-телохранители.', icon: ShieldCheck },
                        { title: 'Полная приватность', desc: 'Строгое соблюдение NDA. Скрытые маршруты и конфиденциальность.', icon: Building2 }
                    ].map((s, i) => (
                        <div key={i} className="bg-[#0f1115] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-accent/5 border border-accent/20 flex flex-col items-center justify-center shrink-0">
                                <s.icon size={20} className="text-accent" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-[14px] leading-tight mb-1.5">{s.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed max-w-[95%]">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 border-t border-white/5 pt-4">
                <FAQ language={language} t={t} viewMode="client" />
            </div>

            <BookingSheet open={sheetOpen} onClose={() => setSheetOpen(false)} t={t} language={language} />
        </div>
    );
};

/* ─────────────────────────────────────────────
   DRIVER VIEW (Premium Recruitment Style)
───────────────────────────────────────────── */
const DriverView = ({ t }) => {
    return (
        <div className="pb-[calc(6.5rem+env(safe-area-bottom))] bg-[#050505] min-h-screen text-white selection:bg-accent selection:text-black">

            {/* HERO DRIVER */}
            <div id="for-drivers" className="relative min-h-[70vh] flex flex-col justify-end px-5 pb-12 pt-20 overflow-hidden scroll-mt-20">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-[#050505]/90 to-[#050505] pointer-events-none" />
                <div className="absolute top-0 left-0 w-[80%] h-[50%] bg-white/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/4 -translate-y-1/4" />

                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3 py-1.5 backdrop-blur-md">
                        <CheckCircle2 size={12} className="text-green-400" />
                        <span className="text-gray-300 text-[10px] font-bold tracking-[0.2em] uppercase">Официальный партнер</span>
                    </div>

                    <h1 className="text-[11vw] xs:text-5xl md:text-6xl font-extrabold leading-[1.05] tracking-tighter">
                        Зарабатывай<br />
                        <span className="text-white">больше.</span>
                    </h1>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-[90%]">
                        Элитный таксопарк MAX. Эксклюзивные клиенты Яндекс.Такси, абсолютный приоритет и выплаты день в день.
                    </p>

                    <div className="flex flex-col gap-2 mt-4 w-full">
                        <a
                            href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62" target="_blank" rel="noreferrer"
                            className="w-full bg-white text-black font-extrabold uppercase tracking-widest rounded-xl py-3.5 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-[12px]"
                        >
                            <UserPlus size={16} /> Форма Яндекс Pro
                        </a>
                        <div className="flex gap-2 w-full">
                            <a
                                href="https://t.me/Max_taxBot" target="_blank" rel="noreferrer"
                                className="flex-1 bg-[#2AABEE] text-white bg-opacity-90 hover:bg-opacity-100 font-extrabold uppercase tracking-wider rounded-xl py-3 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-[11px]"
                            >
                                <MessageCircle size={15} /> Telegram Bot
                            </a>
                            <a
                                href={`https://wa.me/${whatsappNumber}?text=Здравствуйте,%20я%20хочу%20работать%20в%20MAX%20Taxi!`} target="_blank" rel="noreferrer"
                                className="flex-1 bg-[#25D366] text-white bg-opacity-90 hover:bg-opacity-100 font-extrabold uppercase tracking-wider rounded-xl py-3 active:scale-[0.98] transition-transform flex items-center justify-center gap-2 text-[11px]"
                            >
                                <Phone size={15} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* BENEFITS FOCUS */}
            <div id="driver-benefits" className="px-5 mt-4 scroll-mt-24">
                <h2 className="text-2xl font-bold text-white mb-5 tracking-tight">Условия для своих</h2>
                <div className="grid grid-cols-1 gap-3">
                    {benefits.map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <div key={i} className="bg-[#0f1115] border border-white/5 rounded-2xl p-5 flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <Icon size={20} className="text-white" />
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

            {/* STEPS PRESTIGE */}
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

            <div className="mt-8 border-t border-white/5 px-5 pt-4">
                <TeamCalculator />
            </div>

            <div className="mt-8 border-t border-white/5 pt-4">
                <FAQ language="ru" t={t} viewMode="driver" />
            </div>

            {/* ── Terms link ── */}
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
const MobileApp = ({ language, t, viewMode }) => {
    if (viewMode === 'driver') return <DriverView t={t} />;
    return <ClientView t={t} language={language} />;
};

export default MobileApp;
