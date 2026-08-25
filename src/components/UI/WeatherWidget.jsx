import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudRain, Sun, Wind, CloudSnow, CloudLightning, X, MapPin, Search, RefreshCw } from 'lucide-react';

const API_KEY = 'cab938058b08dd85bf8e8815f2550820';
const REFRESH_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

// All popular Kazakhstan cities
const KZ_CITIES = [
    { name: 'Астана', lat: 51.1694, lon: 71.4491 },
    { name: 'Алматы', lat: 43.2220, lon: 76.8512 },
    { name: 'Шымкент', lat: 42.3000, lon: 69.5980 },
    { name: 'Қарағанды', lat: 49.8047, lon: 73.1094 },
    { name: 'Актобе', lat: 50.2797, lon: 57.2070 },
    { name: 'Тараз', lat: 42.9000, lon: 71.3667 },
    { name: 'Павлодар', lat: 52.2873, lon: 76.9674 },
    { name: 'Усть-Каменогорск', lat: 49.9480, lon: 82.6285 },
    { name: 'Семей', lat: 50.4111, lon: 80.2275 },
    { name: 'Атырау', lat: 47.1167, lon: 51.8833 },
    { name: 'Қостанай', lat: 53.2141, lon: 63.6251 },
    { name: 'Кызылорда', lat: 44.8482, lon: 65.5092 },
    { name: 'Уральск', lat: 51.2333, lon: 51.3667 },
    { name: 'Петропавловск', lat: 54.8667, lon: 69.1500 },
    { name: 'Актау', lat: 43.6500, lon: 51.1667 },
    { name: 'Темиртау', lat: 50.0576, lon: 72.9534 },
    { name: 'Туркестан', lat: 43.2975, lon: 68.2592 },
    { name: 'Экибастуз', lat: 51.7233, lon: 75.3667 },
    { name: 'Руднный', lat: 52.9667, lon: 63.1167 },
    { name: 'Жезқазған', lat: 47.7833, lon: 67.7000 },
    { name: 'Боровое (Щучинск)', lat: 52.9333, lon: 70.2000 },
    { name: 'Бурабай', lat: 53.0833, lon: 70.2833 },
    { name: 'Балқаш', lat: 46.8526, lon: 74.9958 },
    { name: 'Талдықорған', lat: 45.0000, lon: 78.3667 },
    { name: 'Кокшетау', lat: 53.2833, lon: 69.3833 },
];

const getWeatherIcon = (id, size = 'sm') => {
    const cls = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
    if (id >= 200 && id < 300) return <CloudLightning className={`${cls} text-yellow-400`} />;
    if (id >= 300 && id < 600) return <CloudRain className={`${cls} text-blue-400`} />;
    if (id >= 600 && id < 700) return <CloudSnow className={`${cls} text-blue-200`} />;
    if (id >= 700 && id < 800) return <Wind className={`${cls} text-gray-400`} />;
    if (id === 800) return <Sun className={`${cls} text-yellow-400`} />;
    return <Cloud className={`${cls} text-gray-300`} />;
};

const fetchWeatherData = async (city, langCode) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=${langCode}`
    );
    return res.json();
};

const fetchForecastData = async (city, langCode) => {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=${langCode}`
    );
    return res.json();
};

const WeatherWidget = ({ language }) => {
    const langCode = language === 'kk' ? 'ru' : language;

    const [currentCity, setCurrentCity] = useState(KZ_CITIES[0]);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [forecastLoading, setForecastLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [lastUpdated, setLastUpdated] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const refreshTimerRef = useRef(null);

    // --- Fetch current weather ---
    const loadCurrentWeather = async (city, lang, silent = false) => {
        if (!silent) setLoading(true);
        else setIsRefreshing(true);
        try {
            const data = await fetchWeatherData(city, lang);
            if (data?.main && data?.weather) {
                setCurrentWeather(data);
                setLastUpdated(new Date());
            }
        } catch (e) {
            console.error('Weather fetch error:', e);
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    };

    // --- Fetch 5-day forecast ---
    const loadForecast = async (city, lang) => {
        setForecastLoading(true);
        setForecast(null);
        try {
            const data = await fetchForecastData(city, lang);
            if (data?.list) {
                const daily = [];
                const seen = new Set();
                for (const item of data.list) {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (!seen.has(date) && daily.length < 5) {
                        daily.push(item);
                        seen.add(date);
                    }
                }
                setForecast(daily);
            }
        } catch (e) {
            console.error('Forecast fetch error:', e);
        } finally {
            setForecastLoading(false);
        }
    };

    // Initial load + auto-refresh every 10 min
    useEffect(() => {
        loadCurrentWeather(currentCity, langCode);

        refreshTimerRef.current = setInterval(() => {
            loadCurrentWeather(currentCity, langCode, true); // silent refresh
        }, REFRESH_INTERVAL_MS);

        return () => clearInterval(refreshTimerRef.current);
    }, [currentCity, langCode]);

    // Load forecast when modal opens
    useEffect(() => {
        if (isOpen) {
            loadForecast(currentCity, langCode);
        }
    }, [isOpen, currentCity, langCode]);

    // City change handler
    const handleCityChange = (city) => {
        setCurrentCity(city);
        setSearchQuery('');
    };

    // Manual refresh
    const handleRefresh = () => {
        loadCurrentWeather(currentCity, langCode, true);
        if (isOpen) loadForecast(currentCity, langCode);
    };

    // Filtered city list
    const filteredCities = searchQuery.trim()
        ? KZ_CITIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : KZ_CITIES;

    const formatLastUpdated = () => {
        if (!lastUpdated) return '';
        return lastUpdated.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* ---- Header Mini Button ---- */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-accent hover:bg-white/10 px-2.5 py-1.5 rounded-full transition-all duration-300"
                title="Прогноз погоды"
            >
                {loading || !currentWeather?.main ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-accent animate-spin" />
                ) : (
                    <>
                        {getWeatherIcon(currentWeather.weather[0].id)}
                        <span className="text-white text-xs font-bold tracking-wide">
                            {Math.round(currentWeather.main.temp)}°
                        </span>
                        <span className="text-gray-400 text-xs hidden sm:inline">
                            {currentCity.name.split(' ')[0]}
                        </span>
                    </>
                )}
            </button>

            {/* ---- Modal via Portal ---- */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {isOpen && (
                        <div className="fixed inset-0 z-[9999] flex items-start justify-center sm:items-center p-4 pt-20 sm:pt-4">
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
                                onMouseDown={() => setIsOpen(false)}
                                onTouchStart={() => setIsOpen(false)}
                            />

                            {/* Modal */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                className="relative w-full max-w-md bg-[#0c0f16] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                                onMouseDown={e => e.stopPropagation()}
                                onTouchStart={e => e.stopPropagation()}
                            >
                                {/* Close button */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="absolute top-4 right-4 z-20 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <X size={18} />
                                </button>

                                {/* === Top: Current Weather === */}
                                <div className="px-6 pt-6 pb-4 bg-gradient-to-br from-accent/10 via-transparent to-blue-900/10">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2 text-accent">
                                            <MapPin size={16} />
                                            <span className="text-xs font-bold uppercase tracking-widest text-white">Погода на маршруте</span>
                                        </div>
                                        <button
                                            onClick={handleRefresh}
                                            className="text-gray-500 hover:text-accent transition-colors pr-8"
                                            title="Обновить"
                                        >
                                            <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
                                        </button>
                                    </div>

                                    {loading || !currentWeather?.main ? (
                                        <div className="h-24 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-accent animate-spin" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-between">
                                            <div>
                                                {/* City name */}
                                                <p className="text-accent text-sm font-semibold mb-1 flex items-center gap-1">
                                                    <MapPin size={13} />
                                                    {currentCity.name}
                                                </p>
                                                <div className="text-7xl font-extralight text-white tracking-tighter leading-none">
                                                    {Math.round(currentWeather.main.temp)}<span className="text-4xl text-gray-500">°C</span>
                                                </div>
                                                <p className="text-gray-400 text-sm mt-2 capitalize">{currentWeather.weather[0].description}</p>
                                                <div className="flex gap-4 mt-2 text-xs text-gray-500">
                                                    <span>💧 {currentWeather.main.humidity}%</span>
                                                    <span>💨 {Math.round(currentWeather.wind.speed)} м/с</span>
                                                    <span>Ощущается {Math.round(currentWeather.main.feels_like)}°</span>
                                                </div>
                                            </div>
                                            <div className="opacity-90 scale-[3] origin-right mr-8">
                                                {getWeatherIcon(currentWeather.weather[0].id, 'lg')}
                                            </div>
                                        </div>
                                    )}

                                    {lastUpdated && (
                                        <p className="text-gray-600 text-[10px] mt-3">
                                            Обновлено в {formatLastUpdated()} · авто-обновление каждые 10 мин
                                        </p>
                                    )}
                                </div>

                                {/* === City Search === */}
                                <div className="px-6 py-3 border-t border-white/5">
                                    <div className="relative">
                                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                        <input
                                            type="text"
                                            placeholder="Поиск города Казахстана..."
                                            value={searchQuery}
                                            onChange={e => setSearchQuery(e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl pl-8 pr-4 py-2.5 outline-none focus:border-accent/50 transition placeholder-gray-600"
                                        />
                                    </div>

                                    {/* City list */}
                                    <div className="flex flex-wrap gap-1.5 mt-2.5 max-h-24 overflow-y-auto">
                                        {filteredCities.map(city => (
                                            <button
                                                key={city.name}
                                                onClick={() => handleCityChange(city)}
                                                className={`px-3 py-1 text-xs rounded-full border transition-all ${currentCity.name === city.name
                                                        ? 'bg-accent text-black border-accent font-semibold'
                                                        : 'border-white/10 text-gray-400 hover:border-accent/50 hover:text-white'
                                                    }`}
                                            >
                                                {city.name.split(' ')[0]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* === 5-Day Forecast === */}
                                <div className="px-6 pb-6 pt-3 border-t border-white/5">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                                        Прогноз на 5 дней · {currentCity.name}
                                    </h4>

                                    {forecastLoading ? (
                                        <div className="flex justify-center items-center py-4">
                                            <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-accent animate-spin" />
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {forecast?.map((day, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between py-2 border-t border-white/5 text-sm"
                                                >
                                                    <span className="text-gray-300 w-20 font-medium">
                                                        {idx === 0 ? 'Сегодня' : idx === 1 ? 'Завтра'
                                                            : new Date(day.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' })}
                                                    </span>
                                                    <span className="text-gray-500 flex-1 capitalize text-xs px-2 hidden sm:block">
                                                        {day.weather[0].description}
                                                    </span>
                                                    <div className="flex items-center gap-3">
                                                        {getWeatherIcon(day.weather[0].id)}
                                                        <div className="flex gap-2 font-mono w-16 justify-end">
                                                            <span className="text-white font-semibold">{Math.round(day.main.temp_max)}°</span>
                                                            <span className="text-gray-600">{Math.round(day.main.temp_min)}°</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default WeatherWidget;
