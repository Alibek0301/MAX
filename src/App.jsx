import React, { useState, useEffect } from 'react';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import MobileBottomMenu from './components/UI/MobileBottomMenu';
import Home from './pages/Home';
import { translations } from './constants/data';

function App() {
  const [language, setLanguage] = useState('ru');
  const t = translations[language] || translations.ru;

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen bg-base text-white font-sans selection:bg-accent selection:text-black pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <Header language={language} setLanguage={setLanguage} t={t} />

      <main className="pt-20">
        <Home language={language} t={t} />
      </main>

      <Footer t={t} />
      <MobileBottomMenu t={t} />
    </div>
  );
}

export default App;
