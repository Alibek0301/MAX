import React from 'react';
import { maxPhoneLabel, alibekPhoneLabel, whatsappNumber, maxPhoneNumber, alibekPhoneNumber } from '../../constants/data';

const Footer = ({ t }) => {
    return (
        <footer className="bg-surface border-t border-white/5 py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
                <div>
                    <h3 className="font-serif text-2xl text-accent mb-4 tracking-widest drop-shadow-glow">MAX</h3>
                    <p className="text-gray-400 max-w-xs">{t.footerTagline}</p>
                    <div className="mt-6 flex flex-col gap-2 opacity-80">
                        <a href={`tel:${maxPhoneNumber}`} className="hover:text-amber-300 transition">
                            {maxPhoneLabel}
                        </a>
                        <a href={`tel:${alibekPhoneNumber}`} className="hover:text-amber-300 transition">
                            {alibekPhoneLabel}
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">{t.menu}</h4>
                    <nav className="flex flex-col gap-3 text-gray-400">
                        <a href="#services" className="hover:text-white transition w-max">{t.services}</a>
                        <a href="#standards" className="hover:text-white transition w-max">{t.standards}</a>
                        <a href="#booking" className="hover:text-white transition w-max">{t.booking}</a>
                    </nav>
                </div>

                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">{t.contacts}</h4>
                    <p className="text-gray-400 mb-2">Астана, Казахстан</p>
                    <p className="text-gray-400 mb-6">Работаем 24/7</p>
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-6 py-2 border border-green-500 text-green-500 rounded-full hover:bg-green-500 hover:text-white transition"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                    <p>© {new Date().getFullYear()} MAX Taxi Park. Все права защищены.</p>
                    <span className="hidden sm:inline text-gray-600">|</span>
                    <p>Проект принадлежит ТОО "Vigil Agency"</p>
                </div>
                <div className="flex gap-4">
                    <a href="./privacy.html" target="_blank" className="hover:text-white transition">{t.privacyPolicyLabel}</a>
                    <a href="./terms.html" target="_blank" className="hover:text-white transition">{t.termsLabel}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
