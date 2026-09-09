import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { whatsappNumber } from '../../constants/data';
import WeatherWidget from './WeatherWidget';

const Header = ({ language, setLanguage, t }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-base/70 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                <a href="#top" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="MAX Logo" className="h-10 md:h-16 w-auto object-contain drop-shadow-2xl" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <span className="font-serif text-3xl tracking-[0.2em] text-accent drop-shadow-glow" style={{ display: 'none' }}> MAX</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex gap-6 text-sm font-medium">
                        <a href="#for-drivers" className="text-gray-200 hover:text-accent transition-colors">{t.navWork || 'Работа в парке'}</a>
                        <a href="#trust" className="text-gray-200 hover:text-accent transition-colors">{t.navGuarantees || 'Гарантии'}</a>
                        <a href="#faq" className="text-gray-200 hover:text-accent transition-colors">{t.faqNav || 'FAQ'}</a>
                    </nav>

                    <div className="flex items-center gap-4 pl-6 border-l border-white/20">
                        <WeatherWidget language={language} />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent border border-white/20 rounded px-2 py-1 text-sm outline-none focus:border-accent cursor-pointer hover:border-white/40 transition"
                        >
                            <option value="ru" className="bg-surface text-white">РУ</option>
                            <option value="kk" className="bg-surface text-white">KK</option>
                        </select>

                        <a
                            href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-accent hover:bg-amber-400 text-black px-4 py-2 rounded-full font-semibold transition shadow-lg text-sm"
                        >
                            {t.headerCta || 'Стать партнёром'}
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex gap-3 items-center md:hidden">
                    <WeatherWidget language={language} />
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent border border-white/20 rounded px-1 py-1 text-xs outline-none focus:border-accent"
                    >
                        <option value="ru" className="bg-surface text-white">РУ</option>
                        <option value="kk" className="bg-surface text-white">KK</option>
                    </select>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white hover:text-accent transition"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Content */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop to close menu when clicking outside */}
                    <div
                        className="fixed inset-0 top-full bg-black/60 backdrop-blur-sm z-40 md:hidden h-[100vh] cursor-pointer"
                        onClick={() => setMobileMenuOpen(false)}
                    />

                    {/* Menu Panel */}
                    <div className="md:hidden absolute top-full left-0 right-0 bg-base/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-4 flex flex-col gap-3 animate-in slide-in-from-top-2 z-50 rounded-b-2xl">
                        <a href="#for-drivers" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-accent transition-colors block px-2 py-1">{t.navWork || 'Работа в парке'}</a>
                        <a href="#trust" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-accent transition-colors block px-2 py-1">{t.navGuarantees || 'Гарантии'}</a>
                        <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-white hover:text-accent transition-colors border-t border-white/10 pt-3 mt-1 block px-2 py-1">{t.faqNav || 'FAQ'}</a>

                        <div className="flex gap-3 mt-3">
                            <a href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62" target="_blank" rel="noreferrer" className="flex-1 bg-gradient-to-r from-accent to-amber-400 shadow-lg text-black font-bold rounded-xl py-2.5 flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                                {t.headerMenuCta || 'Заполнить анкету'}
                            </a>
                            <a href={`https://wa.me/${whatsappNumber}?text=Здравствуйте,%20я%20хочу%20работать%20в%20MAX%20Taxi!`} className="flex-1 bg-green-500/90 hover:bg-green-500 text-white font-bold rounded-xl py-2.5 flex items-center justify-center gap-1.5 transition-transform active:scale-95 text-sm">
                                <Phone size={16} /> WhatsApp
                            </a>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
};

export default Header;
