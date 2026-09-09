import React, { memo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { useWeather, getWeatherIcon, getWeatherLabel } from '../hooks/useWeather';
import { toggleTrip } from '../store/savedTripsSlice';
import destinations from '../data/destinations.json';
import toast from 'react-hot-toast';

const DestinationDetail = memo(() => {
  const { id } = useParams();
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('overview');

  const dest = destinations.find(d => d.id === parseInt(id));
  const savedTrips = useSelector(s => s.savedTrips.items);
  const isSaved = savedTrips.some(s => s.id === dest?.id);

  const { data: weather } = useWeather(dest?.coordinates?.lat, dest?.coordinates?.lon);

  if (!dest) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl mb-4 block">🔍</span>
        <h2 className="text-2xl font-bold mb-2">{t('notFound.title')}</h2>
        <Link to="/destinations" className="text-emerald-500 hover:text-emerald-600">← {t('common.back')}</Link>
      </div>
    );
  }

  const handleSave = () => {
    dispatch(toggleTrip(dest));
    toast.success(isSaved ? "Removed from saved" : "Saved!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <ol className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
          <li><Link to="/" className="hover:text-emerald-500">{t('nav.home')}</Link></li>
          <li>/</li>
          <li><Link to="/destinations" className="hover:text-emerald-500">{t('nav.destinations')}</Link></li>
          <li>/</li>
          <li className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{dest.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{dest.emoji} {dest.name}</h1>
          <div className="flex items-center gap-4 text-white/80">
            <span>📍 {dest.country}</span>
            <span>⭐ {dest.rating}</span>
            <span>💰 ${dest.price} {t('destinations.perDay')}</span>
            <span>📅 {dest.duration}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {['overview', 'itinerary', 'weather', 'reviews'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {t(`detail.${tab}`)}
          </button>
        ))}
        <button onClick={handleSave}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            isSaved ? 'bg-emerald-500 text-white' : theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}>
          {isSaved ? '✓ Saved' : `♡ ${t('detail.save')}`}
        </button>
      </div>

      {/* Tab Content */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        {activeTab === 'overview' && (
          <div>
            <p className={`mb-6 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>{dest.description}</p>
            <h3 className="font-bold text-lg mb-4">{t('detail.highlights')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {dest.highlights.map((h, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <span className="text-emerald-500">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <span className="text-2xl block mb-1">📅</span>
                <p className="text-sm font-medium">{dest.duration}</p>
              </div>
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <span className="text-2xl block mb-1">🌡️</span>
                <p className="text-sm font-medium">{dest.bestTime}</p>
              </div>
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <span className="text-2xl block mb-1">🗣️</span>
                <p className="text-sm font-medium">{dest.language}</p>
              </div>
              <div className={`p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <span className="text-2xl block mb-1">💱</span>
                <p className="text-sm font-medium">{dest.currency}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'weather' && (
          <div>
            <h3 className="font-bold text-lg mb-4">🌤️ {t('weather.current')}</h3>
            {weather?.current_weather ? (
              <>
                <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-emerald-500/10">
                  <span className="text-5xl">{getWeatherIcon(weather.current_weather.weathercode)}</span>
                  <div>
                    <p className="text-4xl font-bold">{weather.current_weather.temperature}°C</p>
                    <p className="text-emerald-500">{getWeatherLabel(weather.current_weather.weathercode)}</p>
                  </div>
                </div>
                <h4 className="font-bold mb-3">{t('weather.forecast')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {weather.daily?.time?.slice(0, 7).map((date, i) => (
                    <div key={i} className={`p-3 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                      <p className="text-xs text-gray-500 mb-1">{new Date(date).toLocaleDateString()}</p>
                      <span className="text-2xl">{getWeatherIcon(weather.daily.weathercode?.[i])}</span>
                      <p className="font-bold">{weather.daily.temperature_2m_max?.[i]}°</p>
                      <p className="text-sm text-gray-500">{weather.daily.temperature_2m_min?.[i]}°</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{t('common.loading')}</p>
            )}
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
            <h3 className="font-bold text-lg mb-4">📋 {t('detail.itinerary')}</h3>
            {['1-kun: Kelish va o\'rnatilish', '2-kun: Asosiy diqqatga sazovor joylar', '3-kun: Mahalliy madaniyat', '4-kun: Sarguzasht', '5-kun: Xotiralarni saqlash'].map((day, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 rounded-xl mb-3 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">{i + 1}</div>
                <span>{day}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <h3 className="font-bold text-lg mb-4">💬 {t('reviews.title')}</h3>
            {[
              { name: 'Akbar K.', rating: 5, comment: 'Juda ajoyib tajriba! Tavsiya qilaman.' },
              { name: 'Sardor M.', rating: 4, comment: 'Yaxshi sayohat, lekin biroz qimmat.' },
              { name: 'Nodira B.', rating: 5, comment: "O'ta zo'r! albatta qaytib kelaman." },
            ].map((r, i) => (
              <div key={i} className={`p-4 rounded-xl mb-3 ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold">{r.name.charAt(0)}</div>
                  <span className="font-medium">{r.name}</span>
                  <span className="text-yellow-500">{'⭐'.repeat(r.rating)}</span>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

DestinationDetail.displayName = 'DestinationDetail';
export default DestinationDetail;
