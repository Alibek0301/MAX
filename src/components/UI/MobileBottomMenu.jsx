import React from 'react';
import { Home, Car, UserPlus } from 'lucide-react';
import { whatsappNumber } from '../../constants/data';

const MobileBottomMenu = ({ t }) => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0a0d12]/90 backdrop-blur-xl border-t border-white/10 pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
            <div className="flex justify-around items-center h-16">
                <a href="#top" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-accent transition-colors">
                    <Home size={20} className="mb-1" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">{t.home}</span>
                </a>

                <a href="#services" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-accent transition-colors">
                    <Car size={20} className="mb-1" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">{t.services}</span>
                </a>

                <a href="#booking" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-accent transition-colors relative">
                    <div className="absolute -top-5 bg-gradient-to-tr from-accent to-amber-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-accent/20 border-4 border-base">
                        <Car size={22} className="text-black" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider uppercase mt-6 text-accent">{t.booking}</span>
                </a>

                <a href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-white transition-colors">
                    <UserPlus size={20} className="mb-1" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">Партнёрам</span>
                </a>
            </div>
        </div>
    );
};

export default MobileBottomMenu;
