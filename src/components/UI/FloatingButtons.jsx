import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappNumber } from '../../constants/data';

const PARTNER_URL = 'https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62';
const WHATSAPP_URL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Здравствуйте! Хочу заказать трансфер MAX.')}`;
const TELEGRAM_URL = 'https://t.me/Max_taxBot';

const FloatingButtons = () => {
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed bottom-20 md:bottom-8 right-4 md:right-6 z-[90] flex flex-col items-end gap-3"
                >
                    {/* Sub-buttons — появляются при раскрытии */}
                    <AnimatePresence>
                        {expanded && (
                            <>
                                {/* Telegram Bot */}
                                <motion.a
                                    href={TELEGRAM_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: 0.05 }}
                                    className="flex items-center gap-2 bg-[#229ED9] hover:bg-[#1b80b0] text-white text-sm font-semibold px-4 py-3 rounded-full shadow-xl shadow-[#229ED9]/30 transition-all whitespace-nowrap"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.894-15.35c.298-1.405-.205-2.093-1.077-1.785l-11.45 4.398c-1.353.535-1.343 1.282-.249 1.622l2.943.916 6.815-4.28c.321-.192.616-.089.373.128l-5.516 4.966-.202 2.915c.294 0 .426-.135.592-.295l1.423-1.378 2.96 2.19c.545.303.938.147 1.074-.492l1.944-9.155z" />
                                    </svg>
                                    Заявка в Telegram
                                </motion.a>

                                {/* Стать партнером */}
                                <motion.a
                                    href={PARTNER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                    className="flex items-center gap-2 bg-[#1a222c] border border-white/20 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-xl hover:border-accent/50 hover:bg-[#1e2936] transition-all whitespace-nowrap"
                                >
                                    <span className="text-base">🚗</span>
                                    Стать партнером
                                </motion.a>

                                {/* Заказать трансфер */}
                                <motion.a
                                    href={WHATSAPP_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: 20, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-xl shadow-green-900/30 transition-all whitespace-nowrap"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.553 4.103 1.522 5.831L.057 23.943l6.263-1.64A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.014-1.376l-.36-.213-3.72.975.992-3.62-.234-.372A9.818 9.818 0 1112 21.818z" />
                                    </svg>
                                    Заказать трансфер
                                </motion.a>
                            </>
                        )}
                    </AnimatePresence>

                    {/* Main FAB toggle button */}
                    <motion.button
                        onClick={() => setExpanded(prev => !prev)}
                        whileTap={{ scale: 0.92 }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${expanded
                            ? 'bg-white/10 border border-white/20 text-white rotate-45'
                            : 'bg-accent text-black shadow-accent/30'
                            }`}
                        aria-label="Быстрые действия"
                    >
                        <motion.span
                            animate={{ rotate: expanded ? 45 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="text-2xl font-light leading-none"
                        >
                            +
                        </motion.span>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default FloatingButtons;
