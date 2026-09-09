import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { useDebounce } from '../hooks/useDebounce';
import { useDestinations } from '../hooks/useDestinations';
import { toggleTrip } from '../store/savedTripsSlice';
import Loading from '../components/ui/Loading';
import toast from 'react-hot-toast';

const Destinations = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const debouncedSearch = useDebounce(search, 300);
  const savedTrips = useSelector(s => s.savedTrips.items);

  const { data, isLoading, isError } = useDestinations({
    search: debouncedSearch,
    category,
    sortBy,
  });

  const categories = ['all', 'popular', 'budget', 'luxury', 'adventure', 'cultural', 'beach', 'mountain'];

  const handleSave = (dest) => {
    dispatch(toggleTrip(dest));
    toast.success(`${dest.name} saved!`);
  };

  const isSaved = (id) => savedTrips.some(t => t.id === id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🌍 {t('destinations.title')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
          {data?.total || 0} {t('destinations.subtitle').toLowerCase()} • API'dan yuklandi
        </p>
      </div>

      {/* Filters */}
      <div className={`rounded-2xl p-4 mb-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('destinations.search')}
            className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              theme === 'dark' ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-gray-100 text-gray-900'
            }`}
          />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className={`px-4 py-3 rounded-xl focus:outline-none ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <option value="rating">{t('destinations.sortRating')}</option>
            <option value="name">{t('destinations.sortName')}</option>
            <option value="price">{t('destinations.sortPrice')}</option>
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                category === cat
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {cat === 'all' ? t('destinations.all') : t(`destinations.${cat}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <Loading text={t('common.loading')} />
      ) : isError ? (
        <div className="text-center py-12">
          <span className="text-4xl mb-2 block">⚠️</span>
          <p className="text-red-400">API xatolik. Ma'lumotlarni yuklab bo'lmadi.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.destinations?.map(dest => (
              <div key={dest.id} className={`group rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl ${
                theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-100'
              }`}>
                <div className="relative h-48 overflow-hidden">
                  <Link to={`/destination/${dest.id}`}>
                    <img src={dest.image} alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy" />
                  </Link>
                  <button onClick={() => handleSave(dest)}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      isSaved(dest.id) ? 'bg-emerald-500 text-white' : 'bg-black/50 text-white hover:bg-emerald-500'
                    }`}>
                    {isSaved(dest.id) ? '✓' : '♡'}
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                      📡 API
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <Link to={`/destination/${dest.id}`}>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-emerald-500 transition-colors">
                      {dest.emoji} {dest.name}
                    </h3>
                  </Link>
                  <p className={`text-sm mb-3 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-500 font-bold">${dest.price} {t('destinations.perDay')}</span>
                    <span className="text-yellow-500 text-sm">⭐ {dest.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {data?.destinations?.length === 0 && (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">🔍</span>
              <h2 className="text-2xl font-bold mb-2">{t('destinations.noResults')}</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
});

Destinations.displayName = 'Destinations';
export default Destinations;
