import React from 'react';
import { motion } from 'framer-motion';
import { Building2, FileText, Headphones, CreditCard, ChevronRight } from 'lucide-react';

const Corporate = ({ t }) => {
    return (
        <section id="corporate" className="max-w-7xl mx-auto px-4 py-8 md:py-16 scroll-mt-20">
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-[#121820] to-[#0a0d12] border border-white/5 overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-full h-[500px] bg-accent/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[300px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 p-6 sm:p-12 lg:p-16 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold tracking-widest uppercase mb-6">
                            {t.corpSubtitle || 'B2B'}
                        </span>

                        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {t.corporateTitle}
                        </h2>

                        <p className="text-gray-400 text-base md:text-lg mb-8 leading-relaxed max-w-lg">
                            {t.corpP1}
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                { icon: FileText, text: t.corpBen1 },
                                { icon: Headphones, text: t.corpBen2 },
                                { icon: CreditCard, text: t.corpBen3 }
                            ].map((ben, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                        <ben.icon size={18} className="text-accent" />
                                    </div>
                                    <span className="text-gray-200 font-medium">{ben.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        <a
                            href="#booking"
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors"
                        >
                            <Building2 size={20} />
                            <span>{t.orderNowCta}</span>
                            <ChevronRight size={18} className="ml-2" />
                        </a>
                    </motion.div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent rounded-[2rem] transform rotate-3 scale-[1.02]" />
                        <div className="bg-[#1a212b] border border-white/10 rounded-[2rem] p-8 shadow-2xl relative">
                            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                                        <Building2 className="text-white w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg">MAX Business</div>
                                        <div className="text-green-400 text-sm">Active Contract</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-black/20 rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-2 h-2 rounded-full bg-accent" />
                                            <div className="text-sm text-gray-300">Transfer #{9120 + i}</div>
                                        </div>
                                        <div className="text-sm font-medium text-white text-right">Completed</div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-end mt-8 pt-6 border-t border-white/5">
                                <div>
                                    <div className="text-xs text-gray-400 mb-1">Monthly Total</div>
                                    <div className="text-2xl font-bold text-white">450,000 ₸</div>
                                </div>
                                <button className="text-accent text-sm font-medium hover:underline pb-1">
                                    Download Invoice
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Corporate;
