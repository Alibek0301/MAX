import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LockKeyhole, EyeOff } from 'lucide-react';

const Trust = ({ t }) => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-16 scroll-mt-20">
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
                    <div className="mx-auto w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                        <LockKeyhole size={28} className="text-gray-300" />
                    </div>

                    <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 tracking-wide">
                        Абсолютная конфиденциальность
                    </h2>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-light">
                        Для нас безопасность ваших данных и маршрутов так же важна, как и комфорт в пути. Мы соблюдаем строгие стандарты приватности для всех категорий клиентов.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0d12] p-8 rounded-2xl border border-white/5 transition-colors hover:border-white/20"
                        >
                            <ShieldCheck size={32} className="text-accent mb-6" />
                            <h3 className="text-white text-xl font-bold mb-3">Защита данных</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Вся информация о бронированиях защищена современными протоколами шифрования. Мы не передаем контакты третьим лицам.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0d12] p-8 rounded-2xl border border-white/5 transition-colors hover:border-white/20"
                        >
                            <EyeOff size={32} className="text-accent mb-6" />
                            <h3 className="text-white text-xl font-bold mb-3">NDA протокол</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">С каждым корпоративным клиентом мы готовы подписать соглашение о неразглашении (NDA). Ваши маршруты — это коммерческая тайна.</p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-[#0a0d12] p-8 rounded-2xl border border-white/5 transition-colors hover:border-white/20"
                        >
                            <LockKeyhole size={32} className="text-accent mb-6" />
                            <h3 className="text-white text-xl font-bold mb-3">Анонимность поездок</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">Для VIP-гостей мы предоставляем автомобили без опознавательных знаков такси и водителей, соблюдающих строгий протокол тишины.</p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Trust;
