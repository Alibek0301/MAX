import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Banknote, HeartHandshake } from 'lucide-react';

const Trust = ({ t }) => {
    return (
        <section id="trust" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20">
            <div className="relative rounded-[2.5rem] bg-black border border-white/10 overflow-hidden px-8 py-16 sm:px-16 lg:py-24 text-center">
                {/* Background Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {/* Center Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    <div className="mx-auto w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mb-8">
                        <ShieldCheck size={28} className="text-accent" />
                    </div>

                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                        Мы на вашей стороне
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                        Таксопарк MAX — это не просто подключение к агрегатору. Мы защищаем интересы каждого водителя и строим долгосрочное партнёрство.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-left max-w-5xl mx-auto">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0d12] p-5 md:p-8 rounded-2xl border border-white/10 transition-colors hover:border-accent/30 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 text-white"
                        >
                            <Banknote className="w-10 h-10 md:w-12 md:h-12 text-accent md:mb-6 shrink-0" />
                            <div>
                                <h3 className="text-white text-base md:text-xl font-bold mb-1 md:mb-3">Прозрачные выплаты</h3>
                                <p className="text-gray-300 text-xs md:text-sm leading-relaxed hidden md:block">Ежедневный вывод на любую карту без задержек. Вы всегда видите, сколько и за что получаете. Никаких скрытых списаний.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0d12] p-5 md:p-8 rounded-2xl border border-white/10 transition-colors hover:border-accent/30 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 text-white"
                        >
                            <HeartHandshake className="w-10 h-10 md:w-12 md:h-12 text-accent md:mb-6 shrink-0" />
                            <div>
                                <h3 className="text-white text-base md:text-xl font-bold mb-1 md:mb-3">Поддержка 24/7</h3>
                                <p className="text-gray-300 text-xs md:text-sm leading-relaxed hidden md:block">Спорный заказ, блокировка, проблема с диспетчерской Яндекса? Мы на связи и решим вопрос — не бросим один на один с системой.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0d12] p-5 md:p-8 rounded-2xl border border-white/10 transition-colors hover:border-accent/30 flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 text-white"
                        >
                            <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-accent md:mb-6 shrink-0" />
                            <div>
                                <h3 className="text-white text-base md:text-xl font-bold mb-1 md:mb-3">Официальный статус</h3>
                                <p className="text-gray-300 text-xs md:text-sm leading-relaxed hidden md:block">Сертифицированный партнёр Яндекс Go. Все документы в порядке — путевые листы, договор, разрешения. Работайте спокойно и легально.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA */}
                    <div className="mt-12">
                        <a
                            href="https://forms.fleet.yandex.kz/forms?ref_id=5648b43bf6d8468dbace31f458ae8d62"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 bg-accent text-black font-extrabold uppercase tracking-widest text-sm px-10 py-4 rounded-full hover:bg-amber-400 transition-all shadow-[0_0_30px_rgba(245,200,106,0.3)] hover:shadow-[0_0_50px_rgba(245,200,106,0.5)] active:scale-95"
                        >
                            Вступить в команду MAX
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Trust;
