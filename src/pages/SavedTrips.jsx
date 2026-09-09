import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { removeTrip, clearTrips } from '../store/savedTripsSlice';
import toast from 'react-hot-toast';

const SavedTrips = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const savedTrips = useSelector(s => s.savedTrips.items);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">💾 {t('nav.saved')}</h1>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
            {savedTrips.length} saved destinations
          </p>
        </div>
        {savedTrips.length > 0 && (
          <button onClick={() => { dispatch(clearTrips()); toast.success('Cleared!'); }}
            className="px-4 py-2 text-red-500 border border-red-500/50 rounded-xl hover:bg-red-500/10 transition-colors text-sm font-medium">
            🗑️ Clear All
          </button>
        )}
      </div>

      {savedTrips.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl mb-4 block">💾</span>
          <h2 className="text-2xl font-bold mb-2">No saved trips</h2>
          <Link to="/destinations" className="text-emerald-500 hover:text-emerald-600">← Browse destinations</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map(trip => (
            <div key={trip.id} className={`group rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl ${
              theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-100'
            }`}>
              <div className="h-48 overflow-hidden">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{trip.emoji} {trip.name}</h3>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{trip.country}</p>
                <div className="flex gap-2">
                  <Link to={`/destination/${trip.id}`}
                    className="flex-1 py-2 bg-emerald-500 text-white rounded-xl text-sm font-medium text-center hover:bg-emerald-600 transition-colors">
                    View
                  </Link>
                  <button onClick={() => { dispatch(removeTrip(trip.id)); toast.success('Removed!'); }}
                    className="px-4 py-2 border border-red-500/50 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-colors">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

SavedTrips.displayName = 'SavedTrips';
export default SavedTrips;
