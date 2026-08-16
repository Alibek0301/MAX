import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getFaq } from '../../constants/data';
import { ChevronDown } from 'lucide-react';

const FAQ = ({ language, t }) => {
    const faqList = getFaq(language);
    const [openIndex, setOpenIndex] = useState(0); // First one open by default

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="max-w-4xl mx-auto px-4 py-16 scroll-mt-20">
            <div className="text-center mb-12">
                <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6">
                    {t.faqTitle}
                </h2>
                <div className="w-20 h-1 bg-accent mx-auto rounded-full opacity-80" />
            </div>

            <div className="space-y-4">
                {faqList.map((item, idx) => {
                    const isOpen = openIndex === idx;

                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className={`border ${isOpen ? 'border-accent/40 bg-white/5' : 'border-white/10 bg-transparent'} rounded-2xl overflow-hidden transition-colors duration-300`}
                        >
                            <button
                                onClick={() => toggleFaq(idx)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className={`text-lg font-medium pr-8 transition-colors ${isOpen ? 'text-accent' : 'text-white'}`}>
                                    {item.q}
                                </span>
                                <motion.div
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full ${isOpen ? 'bg-accent/20 text-accent' : 'bg-white/5 text-gray-400'}`}
                                >
                                    <ChevronDown size={20} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="px-6 pb-6 pt-0 text-gray-300 leading-relaxed">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default FAQ;
