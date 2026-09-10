import React from 'react';
import { Home, Car, UserPlus, MessageCircle, ShieldCheck } from 'lucide-react';
import { whatsappNumber } from '../../constants/data';

const MobileBottomMenu = ({ t }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0d12]/95 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.6)]">

            {/* ── Nav Items (Driver only) ── */}
            <div className="flex justify-between items-center h-16 px-3">

                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center justify-center w-[60px] h-full text-gray-400 active:text-accent transition-colors">
                    <Home size={19} className="mb-1" />
                    <span className="text-[9px] font-medium tracking-wide uppercase">Главная</span>
                </button>

                <button onClick={() => { document.getElementById('driver-benefits')?.scrollIntoView({ behavior: 'smooth' }) }} className="flex flex-col items-center justify-center w-[60px] h-full text-gray-400 active:text-accent transition-colors">
                    <ShieldCheck size={19} className="mb-1" />
                    <span className="text-[9px] font-medium tracking-wide uppercase">Условия</span>
                </button>

                {/* Center CTA — Join */}
                <a href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                    target="_blank" rel="noreferrer"
                    className="flex flex-col items-center justify-center w-[70px] h-full relative text-accent">
                    <div className="absolute -top-5 bg-gradient-to-tr from-accent to-amber-400 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,200,106,0.4)] border-[3px] border-[#0a0d12]">
                        <UserPlus size={22} className="text-black" />
                    </div>
                    <span className="text-[9px] font-bold tracking-wide uppercase mt-8">Вступить</span>
                </a>

                <a href="https://t.me/Max_taxBot" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-[60px] h-full text-gray-400 active:text-[#2AABEE] transition-colors">
                    <svg viewBox="0 0 24 24" className="w-[19px] h-[19px] fill-current mb-0.5" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.62-.2-1.12-.31-1.09-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                    </svg>
                    <span className="text-[9px] font-medium tracking-wide uppercase">Telegram</span>
                </a>

                <a href={`https://wa.me/${whatsappNumber}?text=Здравствуйте!%20Я%20хочу%20зарегистрироваться%20в%20таксопарке%20MAX.`} target="_blank" rel="noreferrer"
                    className="flex flex-col items-center justify-center w-[60px] h-full text-gray-400 active:text-green-400 transition-colors">
                    <MessageCircle size={19} className="mb-1" />
                    <span className="text-[9px] font-medium tracking-wide uppercase">Чат</span>
                </a>
            </div>
        </div>
    );
};

export default MobileBottomMenu;
