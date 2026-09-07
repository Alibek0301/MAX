import React, { useState } from 'react';
import { Users, Coins, ChevronRight, X, MessageCircle } from 'lucide-react';
import { whatsappNumber } from '../../constants/data';

// Настройка процента вознаграждения администратором (например, 1.5% = 0.015)
const TEAM_BONUS_PERCENT = 0.015;

const TeamCalculator = () => {
    const [driversCount, setDriversCount] = useState(10);
    const [avgIncome, setAvgIncome] = useState(50000);

    const [modalOpen, setModalOpen] = useState(false);
    const [form, setForm] = useState({ name: '', phone: '', telegram: '', plannedDrivers: '' });
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const presetCounts = [10, 50, 100, 200, 500];

    const turnover = driversCount * avgIncome;
    const potentialIncome = turnover * TEAM_BONUS_PERCENT;

    const handleFormUpdate = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        const text = encodeURIComponent(
            `🚀 *Заявка "СТАТЬ КОМАНДИРОМ"*\n\n` +
            `Имя: ${form.name}\n` +
            `Телефон: ${form.phone}\n` +
            `Telegram: ${form.telegram}\n` +
            `Планирует пригласить: ${form.plannedDrivers} водителей`
        );
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        setSubmitSuccess(true);
        setTimeout(() => {
            setSubmitSuccess(false);
            setModalOpen(false);
            setForm({ name: '', phone: '', telegram: '', plannedDrivers: '' });
        }, 3000);
    };

    return (
        <section className="py-8 md:py-16 scroll-mt-20 relative overflow-hidden" id="team-calculator">
            <div className="absolute inset-0 bg-base z-0 pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                {/* Header Subtitle/Badge */}
                <div className="flex flex-col items-center text-center space-y-4 mb-10">
                    <div className="inline-flex items-center justify-center gap-2 border border-accent/30 bg-accent/10 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(245,200,106,0.15)]">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">
                            Командир — 0% комиссии
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
                        Создай свою команду — <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-300 to-amber-100">
                            получай больше
                        </span>
                    </h2>

                    <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                        Приглашай водителей в MAX, формируй команду и получай процент от их выполненных заказов.
                    </p>
                </div>

                {/* Calculator Area */}
                <div className="bg-[#0f1115]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">

                        {/* Inputs */}
                        <div className="space-y-8 z-10">
                            {/* Driver Count */}
                            <div className="space-y-4">
                                <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                                            Водителей в команде
                                        </label>
                                        <div className="flex items-center gap-3">
                                            <Users size={18} className="text-accent" />
                                            <input
                                                type="number"
                                                value={driversCount}
                                                onChange={e => setDriversCount(Number(e.target.value) || 0)}
                                                className="bg-transparent text-white text-3xl font-extrabold w-32 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Custom Range Scale Visualizer */}
                                <div className="relative pt-2 pb-6">
                                    <input
                                        type="range"
                                        min="1" max="500"
                                        value={driversCount}
                                        onChange={e => setDriversCount(Number(e.target.value))}
                                        className="w-full appearance-none bg-white/10 h-2 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-[0_0_15px_rgba(245,200,106,0.6)]"
                                    />
                                    <div className="flex justify-between absolute w-full top-6 text-gray-500 text-[10px] font-bold">
                                        <span>10</span>
                                        <span>50</span>
                                        <span>100</span>
                                        <span>200</span>
                                        <span>500+</span>
                                    </div>
                                </div>

                                {/* Quick Presets */}
                                <div className="flex flex-wrap gap-2">
                                    {presetCounts.map(count => (
                                        <button
                                            key={count}
                                            onClick={() => setDriversCount(count)}
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-accent hover:border-accent/40 transition-colors active:scale-95"
                                        >
                                            {count}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Average Income */}
                            <div className="space-y-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <label className="block text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                                        Средний заработок одного водителя / мес
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <Coins size={18} className="text-gray-400" />
                                        <input
                                            type="number"
                                            value={avgIncome}
                                            onChange={e => setAvgIncome(Number(e.target.value) || 0)}
                                            className="bg-transparent text-white text-2xl font-bold w-full focus:outline-none"
                                        />
                                        <span className="text-gray-500 font-bold">₸</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="flex flex-col justify-center space-y-6 z-10 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-10">
                            <div>
                                <p className="text-gray-400 text-sm font-medium mb-1">Оборот команды ({driversCount} водителей):</p>
                                <p className="text-xl md:text-2xl text-white font-bold opacity-80 line-through decoration-white/20">
                                    {turnover.toLocaleString('ru')} ₸ / мес
                                </p>
                            </div>

                            <div className="relative">
                                <div className="absolute -inset-4 bg-accent/10 blur-2xl rounded-full pointer-events-none" />
                                <p className="text-accent uppercase tracking-widest text-xs font-bold mb-2 relative z-10">Ваш командный доход:</p>
                                <p className="text-4xl md:text-[54px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-300 drop-shadow-xl leading-none relative z-10">
                                    {Math.round(potentialIncome).toLocaleString('ru')} <span className="text-2xl text-gray-400">₸</span>
                                </p>
                            </div>

                            <p className="text-[10px] text-gray-500 leading-tight border-l-2 border-accent/50 pl-3 mt-4 max-w-sm">
                                * Расчёт является ориентировочным ({TEAM_BONUS_PERCENT * 100}% от оборота). Фактический доход зависит от количества активных водителей и их фактического оборота.
                            </p>

                            <div className="flex flex-col gap-3 mt-8">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="w-full bg-accent text-black font-extrabold uppercase tracking-widest rounded-xl py-4 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_0_20px_rgba(245,200,106,0.3)]"
                                >
                                    Стать командиром <ChevronRight size={18} />
                                </button>
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="w-full bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-white/5 active:scale-[0.98] transition-all text-xs"
                                >
                                    Получить ссылку для приглашения
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => !submitSuccess && setModalOpen(false)} />
                    <div className="bg-[#13161c] border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-md relative z-10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

                        <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white">
                            <X size={16} />
                        </button>

                        {submitSuccess ? (
                            <div className="text-center py-10">
                                <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                                <p className="text-gray-400 text-sm">Мы свяжемся с вами в ближайшее время для активации статуса командира.</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-white mb-1">Статус командира</h3>
                                <p className="text-gray-400 text-sm mb-6">Оставьте заявку, и мы вышлем вам персональную ссылку для приглашения.</p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        required name="name" value={form.name} onChange={handleFormUpdate} placeholder="Ваше полное имя"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50"
                                    />
                                    <input
                                        required name="phone" value={form.phone} onChange={handleFormUpdate} placeholder="+7 (___) ___ __ __" type="tel"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50"
                                    />
                                    <input
                                        name="telegram" value={form.telegram} onChange={handleFormUpdate} placeholder="Ваш Telegram (например: @username)"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50"
                                    />
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-2 ml-1">Сколько водителей планируете пригласить?</label>
                                        <input
                                            required name="plannedDrivers" value={form.plannedDrivers} onChange={handleFormUpdate} placeholder="Пример: 15" type="number"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent/50"
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-accent text-black font-extrabold uppercase tracking-widest rounded-xl py-4 mt-2 hover:brightness-110 transition-all shadow-lg active:scale-95">
                                        Отправить заявку
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default TeamCalculator;
