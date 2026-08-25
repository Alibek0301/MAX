import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudRain, Sun, Wind, CloudSnow, CloudLightning, X, MapPin } from 'lucide-react';

const API_KEY = 'cab938058b08dd85bf8e8815f2550820';

const getIcon = (weatherId) => {
    if (weatherId >= 200 && weatherId < 300) return <CloudLightning className="w-5 h-5 text-yellow-400" />;
    if (weatherId >= 300 && weatherId < 600) return <CloudRain className="w-5 h-5 text-blue-400" />;
    if (weatherId >= 600 && weatherId < 700) return <CloudSnow className="w-5 h-5 text-white" />;
    if (weatherId >= 700 && weatherId < 800) return <Wind className="w-5 h-5 text-gray-400" />;
    if (weatherId === 800) return <Sun className="w-5 h-5 text-yellow-500" />;
    return <Cloud className="w-5 h-5 text-gray-300" />;
};

const CITIES = [
    { name: 'Астана', lat: 51.1694, lon: 71.4491 },
    { name: 'Алматы', lat: 43.222, lon: 76.8512 },
    { name: 'Боровое (Щучинск)', lat: 52.9333, lon: 70.2000 }
];

const WeatherWidget = ({ language }) => {
    const [currentCity, setCurrentCity] = useState(CITIES[0]);
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const langCode = Math.min(language === 'kk' ? 'ru' : language, 'ru'); // OpenWeatherMap kk support is very poor, fallback to ru

    const [forecastLoading, setForecastLoading] = useState(false);

    useEffect(() => {
        const fetchCurrentWeather = async () => {
            const cacheKey = `weather_current_v2_${currentCity.name}_${langCode}`;
            const cached = sessionStorage.getItem(cacheKey);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                if (Date.now() - timestamp < 1000 * 60 * 10) { // 10 minutes cache
                    setCurrentWeather(data);
                    setLoading(false);
                    return;
                }
            }

            setLoading(true);
            try {
                const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCity.lat}&lon=${currentCity.lon}&appid=${API_KEY}&units=metric&lang=${langCode}`);
                const currentData = await currentRes.json();
                setCurrentWeather(currentData);
                sessionStorage.setItem(cacheKey, JSON.stringify({ data: currentData, timestamp: Date.now() }));
            } catch (error) {
                console.error("Error fetching weather:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentWeather();
    }, [currentCity, langCode]);

    useEffect(() => {
        const fetchForecast = async () => {
            if (!isOpen) return;
            setForecastLoading(true);
            try {
                const cacheKey = `weather_forecast_v2_${currentCity.name}_${langCode}`;
                const cached = sessionStorage.getItem(cacheKey);
                let forecastData;

                if (cached && (Date.now() - JSON.parse(cached).timestamp < 1000 * 60 * 30)) {
                    forecastData = JSON.parse(cached).data;
                } else {
                    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${currentCity.lat}&lon=${currentCity.lon}&appid=${API_KEY}&units=metric&lang=${langCode}`);
                    forecastData = await forecastRes.json();
                    sessionStorage.setItem(cacheKey, JSON.stringify({ data: forecastData, timestamp: Date.now() }));
                }

                const daily = [];
                const addedDates = new Set();
                for (const item of forecastData.list) {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (!addedDates.has(date) && daily.length < 5) {
                        daily.push(item);
                        addedDates.add(date);
                    }
                }
                setForecast(daily);
            } catch (error) {
                console.error("Error fetching forecast:", error);
            } finally {
                setForecastLoading(false);
            }
        };

        if (isOpen) {
            fetchForecast();
        }
    }, [currentCity, langCode, isOpen]);

    return (
        <>
            {/* Header Mini Widget */}
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:border-accent hover:bg-white/10 px-2.5 py-1.5 rounded-full transition-all duration-300"
                title="Прогноз погоды"
            >
                {loading || !currentWeather ? (
                    <div className="w-4 h-4 rounded-full border-2 border-white/20 border-t-accent animate-spin" />
                ) : (
                    <>
                        {getIcon(currentWeather.weather[0].id)}
                        <span className="text-white text-xs font-semibold tracking-wide">
                            {Math.round(currentWeather.main.temp)}°
                        </span>
                    </>
                )}
            </button>

            {/* Weather Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-sm bg-[#0a0d12] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-10 p-2 bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Modal Header */}
                            <div className="p-6 pb-4 bg-gradient-to-br from-accent/10 to-transparent">
                                <div className="flex items-center gap-2 text-accent mb-4">
                                    <MapPin size={18} />
                                    <h3 className="text-sm font-semibold uppercase tracking-widest text-white">Погода на маршруте</h3>
                                </div>

                                {/* City Selector */}
                                <div className="flex gap-2 bg-white/5 p-1 rounded-xl w-max border border-white/5">
                                    {CITIES.map((city) => (
                                        <button
                                            key={city.name}
                                            onClick={() => {
                                                setCurrentCity(city);
                                                setForecast(null); // Clear forecast to re-fetch when city changes
                                            }}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${currentCity.name === city.name ? 'bg-accent text-black shadow-md' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                        >
                                            {city.name.split(' ')[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Current Weather Big */}
                            {loading || !currentWeather ? (
                                <div className="h-40 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-4 border-white/10 border-t-accent animate-spin" />
                                </div>
                            ) : (
                                <div className="px-6 py-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-6xl font-light text-white tracking-tighter">
                                            {Math.round(currentWeather.main.temp)}<span className="text-4xl text-gray-500">°</span>
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-1 capitalize">{currentWeather.weather[0].description}</p>
                                    </div>
                                    <div className="scale-[2.5] origin-right opacity-80 pl-4">
                                        {getIcon(currentWeather.weather[0].id)}
                                    </div>
                                </div>
                            )}

                            {/* Forecast List */}
                            <div className="px-6 pb-6 pt-2 min-h-[150px]">
                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Прогноз на 5 дней</h4>

                                {forecastLoading ? (
                                    <div className="flex justify-center items-center py-6">
                                        <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-accent animate-spin" />
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {forecast?.map((day, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-sm py-2 border-t border-white/5">
                                                <span className="text-gray-300 w-16">
                                                    {idx === 0 ? 'Сегодня' : idx === 1 ? 'Завтра' : new Date(day.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'short' })}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white drop-shadow-lg scale-125">{getIcon(day.weather[0].id)}</span>
                                                </div>
                                                <div className="w-20 text-right flex justify-between font-mono">
                                                    <span className="text-white font-medium">{Math.round(day.main.temp_max)}°</span>
                                                    <span className="text-gray-500">{Math.round(day.main.temp_min)}°</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default WeatherWidget;
