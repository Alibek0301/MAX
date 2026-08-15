import React, { useState } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { whatsappNumber } from '../../constants/data';

const Header = ({ language, setLanguage, t }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-base/70 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
                <a href="#top" className="flex items-center gap-2 group hover:opacity-90 transition-opacity">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="MAX Logo" className="h-16 md:h-24 w-auto object-contain drop-shadow-2xl" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                    <span className="font-serif text-3xl tracking-[0.2em] text-accent drop-shadow-glow" style={{ display: 'none' }}> MAX</span>
                </a>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <nav className="flex gap-6 text-sm font-medium">
                        <a href="#services" className="hover:text-accent transition-colors">{t.services}</a>
                        <a href="#standards" className="hover:text-accent transition-colors">{t.standards}</a>
                        <a href="#booking" className="hover:text-accent transition-colors">{t.booking}</a>
                    </nav>

                    <div className="flex items-center gap-4 pl-6 border-l border-white/20">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-transparent border border-white/20 rounded px-2 py-1 text-sm outline-none focus:border-accent cursor-pointer hover:border-white/40 transition"
                        >
                            <option value="ru" className="bg-surface text-white">РУ</option>
                            <option value="kk" className="bg-surface text-white">KK</option>
                            <option value="en" className="bg-surface text-white">EN</option>
                        </select>

                        <a
                            href={`https://wa.me/${whatsappNumber}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition shadow-lg text-sm"
                        >
                            WhatsApp
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex gap-4 items-center md:hidden">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="bg-transparent border border-white/20 rounded px-1 py-1 text-xs outline-none focus:border-accent"
                    >
                        <option value="ru" className="bg-surface text-white">РУ</option>
                        <option value="kk" className="bg-surface text-white">KK</option>
                        <option value="en" className="bg-surface text-white">EN</option>
                    </select>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-white hover:text-accent transition"
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-base/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-6 flex flex-col gap-5 animate-in slide-in-from-top-2">
                    <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium hover:text-accent transition-colors">{t.services}</a>
                    <a href="#standards" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium hover:text-accent transition-colors">{t.standards}</a>
                    <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="text-xl font-medium hover:text-accent transition-colors">{t.booking}</a>

                    <a href={`https://wa.me/${whatsappNumber}`} className="mt-4 bg-gradient-to-r from-green-500 to-green-600 shadow-xl shadow-green-900/20 text-white text-center py-4 rounded-xl font-bold text-lg transition-transform active:scale-95">
                        Написать в WhatsApp
                    </a>
                    <a href={`tel:+${whatsappNumber}`} className="bg-accent text-black text-center py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                        <Phone size={18} />
                        Позвонить
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;
