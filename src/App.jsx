import React, { useState, useEffect } from 'react';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import MobileBottomMenu from './components/UI/MobileBottomMenu';
import FloatingButtons from './components/UI/FloatingButtons';
import Home from './pages/Home';
import { translations } from './constants/data';

function App() {
  const [viewMode, setViewMode] = useState('client'); // 'client' or 'driver'
  const [language, setLanguage] = useState(() => {
    // 1. Check URL parameters (?lang=kk)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && translations[urlLang]) {
      return urlLang;
    }
    // 2. Check localStorage
    const savedLang = localStorage.getItem('max_taxi_lang');
    if (savedLang && translations[savedLang]) {
      return savedLang;
    }
    // 3. Fallback to default
    return 'ru';
  });

  const t = translations[language] || translations.ru;

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem('max_taxi_lang', language);

    // Dynamic SEO / Meta updates
    if (t.metaTitle) document.title = t.metaTitle;
    if (t.metaDescription) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', t.metaDescription);
    }
    if (t.metaKeywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) metaKeywords.setAttribute('content', t.metaKeywords);
    }

    // Update URL without reloading the page
    const url = new URL(window.location);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url);
  }, [language, t]);

  return (
    <div className="min-h-screen bg-base text-white font-sans selection:bg-accent selection:text-black pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header language={language} setLanguage={setLanguage} t={t} viewMode={viewMode} setViewMode={setViewMode} />

      <main className="pt-32 md:pt-40">
        <Home language={language} t={t} viewMode={viewMode} setViewMode={setViewMode} />
      </main>

      <Footer t={t} />
      <MobileBottomMenu t={t} />
      <FloatingButtons />
    </div>
  );
}

export default App;
