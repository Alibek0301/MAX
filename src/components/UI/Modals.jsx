import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, MessageCircle, Copy, Phone } from 'lucide-react';
import * as QRCode from 'qrcode';



const ExitIntentPopup = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black border-t border-accent/30 p-6 rounded-t-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-accent">⏰ Не уходите!</h3>
          <button onClick={onClose} className="p-1">
            <X size={20} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <p className="text-white mb-6">
          Не нашли ответ на вопрос? Спросите нашего менеджера в WhatsApp — ответ за 30 секунд!
        </p>

        <div className="flex gap-3">
          <a
            href={`https://wa.me/77781556699?text=${encodeURIComponent('Привет! 👋 У меня есть вопрос...')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 transition"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
          <button
            onClick={onClose}
            className="px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Закрыть
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export { WhatsAppQRModal, ExitIntentPopup };
