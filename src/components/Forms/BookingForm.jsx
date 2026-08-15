import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, CalendarDays, MapPin } from 'lucide-react';
import { whatsappNumber, getServices } from '../../constants/data';

const BookingForm = ({ language, t }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        date: '',
        address: '',
        comment: ''
    });

    const isValidPhone = (phone) => {
        if (!phone) return false;
        const cleaned = phone.replace(/[^\d]/g, '');
        return cleaned.length >= 10;
    };

    const updateField = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValidPhone(formData.phone)) {
            alert("Пожалуйста, введите корректный номер телефона (минимум 10 цифр)");
            return;
        }

        // Формирование текста для WhatsApp
        const lines = [
            `*${t.waMessageTitle}*`,
            `- *${t.waName}:* ${formData.name}`,
            `- *${t.waPhone}:* ${formData.phone}`,
            `- *${t.waService}:* ${formData.service}`,
            `- *${t.waDate}:* ${formData.date}`,
        ];

        if (formData.address) lines.push(`- *${t.waAddress}:* ${formData.address}`);
        if (formData.comment) lines.push(`- *${t.waComment}:* ${formData.comment}`);

        const text = encodeURIComponent(lines.join('\n'));
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    };

    const servicesList = getServices(language);

    return (
        <div className="bg-gradient-to-b from-surface to-black/90 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden ring-1 ring-accent/10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

            <div className="text-center mb-12 relative z-10">
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">{t.bookingTitle}</h2>
                <p className="text-gray-300 max-w-xl mx-auto font-light text-sm md:text-base">{t.bookingSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-300 ml-1">{t.nameLabel}</label>
                        <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={updateField}
                            placeholder={t.namePlaceholder}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition shadow-inner"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-300 ml-1">{t.phoneLabel}</label>
                        <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={updateField}
                            placeholder="+7"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition shadow-inner"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-300 ml-1">{t.serviceLabel}</label>
                        <select
                            required
                            name="service"
                            value={formData.service}
                            onChange={updateField}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition shadow-inner appearance-none"
                        >
                            <option value="" disabled className="bg-surface text-gray-400">-- Выберите --</option>
                            {servicesList.map((svc, i) => (
                                <option key={i} value={svc.title} className="bg-surface text-white">{svc.title}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-300 ml-1">{t.dateLabel}</label>
                        <div className="relative">
                            <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                            <input
                                required
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={updateField}
                                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition shadow-inner [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-300 ml-1">{t.addressLabel}</label>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input
                            name="address"
                            value={formData.address}
                            onChange={updateField}
                            placeholder={t.addressPlaceholder}
                            className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition shadow-inner"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-300 ml-1">{t.commentDesktopLabel}</label>
                    <textarea
                        name="comment"
                        value={formData.comment}
                        onChange={updateField}
                        placeholder={t.commentPlaceholder}
                        rows={3}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition shadow-inner resize-none"
                    />
                </div>

                <div className="pt-8 flex justify-center relative z-10">
                    <button
                        type="submit"
                        className="group relative w-full sm:w-auto bg-gradient-to-r from-accent to-amber-500 text-black font-extrabold uppercase tracking-[0.1em] text-sm px-14 py-5 rounded-full hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,200,106,0.2)] hover:shadow-[0_0_40px_rgba(245,200,106,0.6)] transform hover:-translate-y-1 active:scale-95 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 w-full h-full skew-x-[-20deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        {t.submitWhatsapp}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
