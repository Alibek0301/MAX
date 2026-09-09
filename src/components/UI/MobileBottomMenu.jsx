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

                <a href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-[60px] h-full text-gray-400 active:text-accent transition-colors">
                    <Car size={19} className="mb-1" />
                    <span className="text-[9px] font-medium tracking-wide uppercase">Анкета</span>
                </a>

                <a href={`https://wa.me/${whatsappNumber}?text=Здравствуйте,%20я%20хочу%20работать%20в%20MAX%20Taxi!`} target="_blank" rel="noreferrer"
                    className="flex flex-col items-center justify-center w-[60px] h-full text-gray-400 active:text-green-400 transition-colors">
                    <MessageCircle size={19} className="mb-1" />
                    <span className="text-[9px] font-medium tracking-wide uppercase">Чат</span>
                </a>
            </div>
        </div>
    );
};

export default MobileBottomMenu;
