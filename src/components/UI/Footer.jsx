import React from 'react';
import { maxPhoneLabel, alibekPhoneLabel, whatsappNumber, maxPhoneNumber, alibekPhoneNumber } from '../../constants/data';

/* ── Social icon SVGs ─────────────────────────────────────────────────────── */
const InstagramIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.79a4.85 4.85 0 01-1.02-.1z" />
    </svg>
);

const ThreadsIcon = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.026 3.086.717 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.233 1.33-2.948.82-.638 1.93-.987 3.21-1.013.854-.018 1.65.074 2.384.27.073-.367.11-.747.108-1.138 0-.84-.273-1.5-.787-1.91-.53-.423-1.33-.626-2.43-.614h-.064c-.776.012-2.034.213-2.677 1.33l-1.786-1.025c.852-1.51 2.418-2.292 4.504-2.327h.087c3.237 0 5.082 1.595 5.082 4.256 0 .364-.032.724-.093 1.077.592.302 1.123.693 1.569 1.17.85.907 1.47 2.138 1.672 3.513.222 1.505-.12 3.239-1.347 4.567C17.97 22.806 15.538 23.98 12.187 24z" />
    </svg>
);

const socials = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/max_taxi.fleet?igsh=Nmo3bmNyanNxMTJ6',
        icon: <InstagramIcon />,
        hoverClass: 'hover:text-pink-400 hover:border-pink-400/30',
    },
    {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@max_taxi.fleet?_r=1&_t=ZS-990bR26AHJP',
        icon: <TikTokIcon />,
        hoverClass: 'hover:text-white hover:border-white/30',
    },
    {
        label: 'Threads',
        href: 'https://www.threads.com/@max_taxi.fleet',
        icon: <ThreadsIcon />,
        hoverClass: 'hover:text-purple-400 hover:border-purple-400/30',
    },
];

const Footer = ({ t }) => {
    return (
        <footer className="bg-surface border-t border-white/5 py-12 mt-20 text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

                {/* Brand */}
                <div>
                    <h3 className="font-serif text-2xl text-accent mb-4 tracking-widest drop-shadow-glow">MAX</h3>
                    <p className="text-gray-300 max-w-xs mb-5">{t.footerTagline}</p>

                    {/* Social icons */}
                    <div className="flex items-center gap-3 mb-5">
                        {socials.map(s => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className={`w-9 h-9 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 ${s.hoverClass} transition-all duration-200`}
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 opacity-80">
                        <a href={`tel:${maxPhoneNumber}`} className="text-gray-300 hover:text-amber-300 transition">
                            {maxPhoneLabel}
                        </a>
                        <a href={`tel:${alibekPhoneNumber}`} className="text-gray-300 hover:text-amber-300 transition">
                            {alibekPhoneLabel}
                        </a>
                    </div>
                </div>

                {/* Nav */}
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">{t.menu}</h4>
                    <nav className="flex flex-col gap-3 text-gray-300">
                        <a href="#services" className="hover:text-white transition w-max">{t.services}</a>
                        <a href="#standards" className="hover:text-white transition w-max">{t.standards}</a>
                        <a href="#booking" className="hover:text-white transition w-max">{t.booking}</a>
                        <a href="#faq" className="hover:text-white transition w-max">FAQ</a>
                        <a href="#for-drivers" className="hover:text-white transition w-max">Партнёрам</a>
                    </nav>
                </div>

                {/* Contacts */}
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider">{t.contacts}</h4>
                    <p className="text-gray-300 mb-1">Астана, Казахстан</p>
                    <p className="text-gray-300 mb-6">Работаем 24/7</p>
                    <a
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block px-6 py-2 border border-green-500 text-green-400 rounded-full hover:bg-green-500 hover:text-white transition"
                    >
                        WhatsApp
                    </a>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
                    <p>© {new Date().getFullYear()} MAX Taxi Park. Все права защищены.</p>
                    <span className="hidden sm:inline text-gray-600">|</span>
                    <p>Проект принадлежит ТОО &quot;Vigil Agency&quot;</p>
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
