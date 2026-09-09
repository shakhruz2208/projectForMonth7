import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { useWeather, getWeatherIcon, getWeatherLabel } from '../hooks/useWeather';
import cities from '../data/cities.json';
import Loading from '../components/ui/Loading';

const Weather = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const { data: weather, isLoading } = useWeather(selectedCity.lat, selectedCity.lon);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🌤️ {t('weather.title')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{t('weather.subtitle')}</p>
      </div>

      {/* City Selector */}
      <div className={`rounded-2xl p-4 mb-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex flex-wrap gap-2">
          {cities.map((city, i) => (
            <button key={i} onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCity.name === city.name
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {city.emoji} {city.name}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? <Loading text={t('common.loading')} /> : weather?.current_weather ? (
        <>
          {/* Current */}
          <div className={`rounded-2xl p-8 mb-8 bg-gradient-to-br ${theme === 'dark' ? 'from-slate-800 to-slate-900 border border-slate-700/50' : 'from-white to-gray-50 border border-gray-200'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-2">{selectedCity.emoji} {selectedCity.name}, {selectedCity.country}</h2>
                <div className="flex items-center gap-4">
                  <span className="text-7xl">{getWeatherIcon(weather.current_weather.weathercode)}</span>
                  <div>
                    <p className="text-6xl font-bold">{weather.current_weather.temperature}°C</p>
                    <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{getWeatherLabel(weather.current_weather.weathercode)}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                  <span className="text-2xl">💨</span>
                  <p className="text-sm mt-1">{weather.current_weather.windspeed} km/s</p>
                </div>
                <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-100'}`}>
                  <span className="text-2xl">🧭</span>
                  <p className="text-sm mt-1">{weather.current_weather.winddirection}°</p>
                </div>
              </div>
            </div>
          </div>

          {/* Forecast */}
          <h3 className="text-xl font-bold mb-4">📅 {t('weather.forecast')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weather.daily?.time?.map((date, i) => (
              <div key={i} className={`rounded-2xl p-4 text-center transition-all hover:scale-105 ${
                i === 0
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25'
                  : theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'
              }`}>
                <p className={`text-sm mb-2 ${i === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                  {i === 0 ? 'Bugun' : new Date(date).toLocaleDateString('en', { weekday: 'short' })}
                </p>
                <span className="text-3xl block mb-2">{getWeatherIcon(weather.daily.weathercode?.[i])}</span>
                <p className="font-bold text-lg">{weather.daily.temperature_2m_max?.[i]}°</p>
                <p className={`text-sm ${i === 0 ? 'text-white/70' : 'text-gray-400'}`}>{weather.daily.temperature_2m_min?.[i]}°</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
});

Weather.displayName = 'Weather';
export default Weather;
