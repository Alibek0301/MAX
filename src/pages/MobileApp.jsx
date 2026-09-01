import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plane, Building2, MapPin, Car, Wallet, Clock,
    ShieldCheck, ArrowRight, X, ChevronRight,
    UserPlus, Star, Phone, MessageCircle
} from 'lucide-react';
import { whatsappNumber, getFleet, getServices } from '../constants/data';

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
   CLIENT VIEW
───────────────────────────────────────────── */
const ClientView = ({ t, language }) => {
    const [sheetOpen, setSheetOpen] = useState(false);
    const fleet = getFleet(language);

    return (
        <div className="pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-16 bg-[#0a0d12] min-h-screen">

            {/* ── Hero Card ── */}
            <div className="px-4 pt-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-br from-[#161d28] to-[#0f1318] rounded-3xl p-5 border border-white/8 overflow-hidden"
                >
                    {/* Glow */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                            </span>
                            <span className="text-green-400 text-xs font-bold tracking-widest uppercase">MAX · Astana</span>
                        </div>

                        <h1 className="text-2xl font-bold text-white mb-1 leading-snug">
                            Куда едем?
                        </h1>
                        <p className="text-gray-400 text-sm mb-4">VIP-трансфер, аэропорт, бизнес</p>

                        {/* Fake search bar as CTA */}
                        <button
                            onClick={() => setSheetOpen(true)}
                            className="w-full flex items-center gap-3 bg-white/8 border border-white/10 rounded-2xl px-4 py-3.5 active:scale-[0.98] transition-transform"
                        >
                            <MapPin size={17} className="text-accent shrink-0" />
                            <span className="text-gray-400 text-sm text-left">Куда, когда и с кем...</span>
                            <span className="ml-auto bg-accent text-black text-xs font-bold px-3 py-1.5 rounded-full shrink-0">Заказать</span>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* ── Quick Services Grid ── */}
            <div id="services" className="px-4 mt-5">
                <p className="text-[11px] text-gray-500 uppercase tracking-[0.15em] font-semibold mb-3">Популярные услуги</p>
                <div className="grid grid-cols-2 gap-2.5">
                    {quickServices.map((s, i) => {
                        const Icon = s.icon;
                        return (
                            <motion.button
                                key={s.id}
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.07 }}
                                onClick={() => setSheetOpen(true)}
                                className={`relative flex flex-col items-start p-4 rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} active:scale-[0.97] transition-transform text-left overflow-hidden`}
                            >
                                <div className="w-9 h-9 rounded-xl bg-white/8 flex items-center justify-center mb-2.5">
                                    <Icon size={18} className="text-white" />
                                </div>
                                <span className="text-white text-sm font-bold leading-tight">{s.label}</span>
                                <span className="text-gray-400 text-[11px] mt-0.5 leading-tight">{s.desc}</span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* ── Fleet Carousel ── */}
            <div id="fleet" className="mt-6 scroll-mt-20">
                <div className="px-4 mb-3 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Управляйте с комфортом</h2>
                    <span className="text-[11px] text-accent">Premium</span>
                </div>
                <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 pb-2 scrollbar-none">
                    {fleet.map((car, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="snap-center shrink-0 w-[72vw] bg-[#131820] border border-white/8 rounded-2xl p-4 flex flex-col gap-2"
                        >
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <Car size={18} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm">{car.class}</p>
                                    <p className="text-accent text-xs">{car.models}</p>
                                </div>
                            </div>
                            <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">{car.desc}</p>
                            <div className="pt-2 mt-auto border-t border-white/5 flex items-center justify-between">
                                <span className="text-white font-bold text-base">{car.price}</span>
                                <button onClick={() => setSheetOpen(true)} className="text-[11px] text-accent font-bold flex items-center gap-1">
                                    Заказать <ChevronRight size={12} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    <div className="shrink-0 w-1" />
                </div>
            </div>

            {/* ── Trust Badges ── */}
            <div className="px-4 mt-6">
                <div className="flex overflow-x-auto gap-2.5 scrollbar-none pb-1">
                    {[
                        { icon: '⭐', val: '4.9', label: 'Рейтинг' },
                        { icon: '🕐', val: '24/7', label: 'Работаем' },
                        { icon: '✈️', val: 'NQZ', label: 'Аэропорт' },
                        { icon: '🔒', val: 'NDA', label: 'VIP протокол' },
                        { icon: '🚗', val: 'S/E/V', label: 'Mercedes' },
                    ].map((b, i) => (
                        <div key={i} className="shrink-0 flex flex-col items-center gap-1 bg-white/4 border border-white/8 rounded-2xl px-4 py-3 min-w-[76px]">
                            <span className="text-lg leading-none">{b.icon}</span>
                            <span className="text-white font-bold text-sm">{b.val}</span>
                            <span className="text-gray-500 text-[10px]">{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Standards ── */}
            <div id="standards" className="px-4 mt-8 scroll-mt-20">
                <h2 className="text-xl font-bold text-white mb-4">Наши стандарты</h2>
                <div className="grid grid-cols-1 gap-3">
                    {[
                        { title: 'Пунктуальность', desc: 'Автомобиль подается за 10-15 минут до назначенного времени. Мы бережем ваше время.', icon: Clock },
                        { title: 'Безопасность', desc: 'Все водители проходят строгий отбор и регулярную проверку. Автомобили обслуживаются у официальных дилеров.', icon: ShieldCheck },
                        { title: 'Конфиденциальность', desc: 'Мы соблюдаем NDA и обеспечиваем полную тайну ваших маршрутов и разговоров в салоне.', icon: Building2 }
                    ].map((s, i) => (
                        <div key={i} onClick={() => setSheetOpen(true)} className="bg-[#131820] border border-white/8 rounded-2xl p-4 flex items-start gap-4 active:scale-[0.98] transition-transform cursor-pointer">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                <s.icon size={18} className="text-accent" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-sm leading-tight">{s.title}</p>
                                <p className="text-gray-400 text-xs mt-1 leading-relaxed">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Call to WhatsApp ── */}
            <div className="px-4 mt-5">
                <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-2xl px-4 py-4 active:scale-[0.98] transition-transform"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                            <MessageCircle size={18} className="text-green-400" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Написать нам</p>
                            <p className="text-gray-400 text-xs">WhatsApp — ответим за 2 минуты</p>
                        </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-500" />
                </a>
            </div>

            <BookingSheet open={sheetOpen} onClose={() => setSheetOpen(false)} t={t} language={language} />
        </div>
    );
};

/* ─────────────────────────────────────────────
   DRIVER VIEW
───────────────────────────────────────────── */
const DriverView = ({ t }) => {
    return (
        <div className="pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-16 bg-[#0a0d12] min-h-screen">

            {/* ── Driver Hero ── */}
            <div className="px-4 pt-4">
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-br from-[#1a1608] to-[#0f1318] rounded-3xl p-5 border border-accent/15 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-accent/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-accent text-[11px] font-bold tracking-widest uppercase">Партнёрам</span>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-1 leading-snug">Работайте<br />в MAX Taxi Park</h1>
                        <p className="text-gray-400 text-sm mb-5">Ежедневные выплаты, поддержка 24/7, свободный график и эксклюзивные межгородние заказы</p>
                        <a
                            href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-accent text-black font-bold rounded-2xl py-3.5 px-6 text-sm active:scale-95 transition-transform"
                        >
                            <UserPlus size={16} />
                            Оставить заявку
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* ── Benefits Grid ── */}
            <div id="driver-benefits" className="mt-8 px-4 scroll-mt-20">
                <h2 className="text-xl font-bold text-white mb-4">Почему мы лучше</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {benefits.map((b, i) => {
                        const Icon = b.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-[#131820] border border-white/8 rounded-2xl p-4 flex items-start gap-4"
                            >
                                <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                                    <Icon size={20} className="text-accent" />
                                </div>
                                <div>
                                    <p className="text-white font-bold text-sm leading-tight mb-1.5">{b.title}</p>
                                    <p className="text-gray-400 text-xs leading-relaxed">{b.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* ── Steps ── */}
            <div className="px-4 mt-8">
                <h2 className="text-xl font-bold text-white mb-4">Как начать</h2>
                <div className="bg-[#131820] border border-white/8 rounded-2xl p-4 pl-6 space-y-4 relative">
                    {/* Vertical tracking line */}
                    <div className="absolute top-8 bottom-8 left-9 w-px bg-white/10" />
                    {[
                        { step: '1', text: 'Заполните короткую анкету на Яндекс.Такси' },
                        { step: '2', text: 'Мы подтвердим ваше подключение в течение 10 минут' },
                        { step: '3', text: 'Выходите на линию, выполняйте заказы и получайте выплаты' },
                    ].map((s, i) => (
                        <div key={i} className="flex items-center gap-4 relative z-10">
                            <div className="w-8 h-8 rounded-full bg-accent/15 border-[2px] border-accent/40 flex items-center justify-center shrink-0 shadow-lg bg-[#131820]">
                                <span className="text-accent text-[13px] font-bold">{s.step}</span>
                            </div>
                            <p className="text-gray-300 text-sm leading-snug">{s.text}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Join CTA ── */}
            <div className="px-4 mt-8">
                <a
                    href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                    target="_blank" rel="noreferrer"
                    className="flex items-center justify-between bg-accent/10 border border-accent/20 rounded-2xl px-4 py-4 active:scale-[0.98] transition-transform"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
                            <UserPlus size={18} className="text-accent" />
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Подать заявку</p>
                            <p className="text-gray-400 text-xs">Яндекс.Такси — займёт 2 мин</p>
                        </div>
                    </div>
                    <ArrowRight size={16} className="text-accent" />
                </a>
            </div>

            {/* ── Terms link ── */}
            <div className="px-4 mt-3 pb-2">
                <a href="./drivers-offer.html" target="_blank"
                    className="block text-center text-gray-600 text-xs underline">
                    Условия сотрудничества и инструкция по подключению
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
