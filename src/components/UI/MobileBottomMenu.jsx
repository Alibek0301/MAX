import React from 'react';
import { Home, Car, Calendar, UserPlus, MessageCircle } from 'lucide-react';
import { whatsappNumber } from '../../constants/data';

const MobileBottomMenu = ({ t, viewMode, setViewMode }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0d12]/95 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">

            {/* ── Mode Switcher (Клиент / Партнёр) ── */}
            <div className="flex justify-center pt-2 pb-0.5 px-4">
                <div className="relative flex bg-white/5 rounded-full p-0.5 border border-white/10 w-full max-w-[220px]">
                    <button
                        onClick={() => { setViewMode('client'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`relative z-10 flex-1 text-[10px] py-1.5 rounded-full font-bold transition-colors duration-200 ${viewMode === 'client' ? 'text-black' : 'text-gray-500'}`}
                    >
                        Клиент
                    </button>
                    <button
                        onClick={() => { setViewMode('driver'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`relative z-10 flex-1 text-[10px] py-1.5 rounded-full font-bold transition-colors duration-200 ${viewMode === 'driver' ? 'text-black' : 'text-gray-500'}`}
                    >
                        Партнёр
                    </button>
                    <div className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] bg-accent rounded-full shadow-md transition-transform duration-300 ease-in-out ${viewMode === 'driver' ? 'translate-x-[100%]' : 'translate-x-0'}`} />
                </div>
            </div>

            {/* ── Nav Items ── */}
            <div className="flex justify-around items-center h-14">
                {viewMode === 'client' ? (
                    <>
                        <a href="#top" className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-accent transition-colors">
                            <Home size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">{t.home || 'Главная'}</span>
                        </a>

                        <a href="#fleet" className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-accent transition-colors">
                            <Car size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">Авто</span>
                        </a>

                        {/* Center CTA — Booking */}
                        <a href="#booking" className="flex flex-col items-center justify-center w-full h-full relative text-accent">
                            <div className="absolute -top-5 bg-gradient-to-tr from-accent to-amber-400 w-13 h-13 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg shadow-accent/30 border-[3px] border-[#0a0d12]">
                                <Calendar size={22} className="text-black" />
                            </div>
                            <span className="text-[9px] font-bold tracking-wide uppercase mt-8">{t.booking || 'Заказать'}</span>
                        </a>

                        <a href="#services" className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-accent transition-colors">
                            <Car size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">Услуги</span>
                        </a>

                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"
                            className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-green-400 transition-colors">
                            <MessageCircle size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">Чат</span>
                        </a>
                    </>
                ) : (
                    <>
                        <a href="#top" className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-accent transition-colors">
                            <Home size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">Главная</span>
                        </a>

                        <a href="#for-drivers" className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-accent transition-colors">
                            <Car size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">Условия</span>
                        </a>

                        {/* Center CTA — Join */}
                        <a href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                            target="_blank" rel="noreferrer"
                            className="flex flex-col items-center justify-center w-full h-full relative text-accent">
                            <div className="absolute -top-5 bg-gradient-to-tr from-accent to-amber-400 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-lg shadow-accent/30 border-[3px] border-[#0a0d12]">
                                <UserPlus size={22} className="text-black" />
                            </div>
                            <span className="text-[9px] font-bold tracking-wide uppercase mt-8">Вступить</span>
                        </a>

                        <a href="#faq" className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-accent transition-colors">
                            <MessageCircle size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">FAQ</span>
                        </a>

                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer"
                            className="flex flex-col items-center justify-center w-full h-full text-gray-400 active:text-green-400 transition-colors">
                            <MessageCircle size={19} className="mb-1" />
                            <span className="text-[9px] font-medium tracking-wide uppercase">Чат</span>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
};

export default MobileBottomMenu;
