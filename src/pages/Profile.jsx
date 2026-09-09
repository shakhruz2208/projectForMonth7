import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { logout } from '../store/authSlice';
import toast from 'react-hot-toast';

const Profile = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(s => s.auth);
  const savedCount = useSelector(s => s.savedTrips.items.length);
  const checklistCount = useSelector(s => s.checklist.items.length);

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl mb-4 block">🔒</span>
        <h2 className="text-2xl font-bold mb-2">Login required</h2>
        <Link to="/login" className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors">
          {t('nav.login')}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">👤 {t('nav.profile')}</h1>

      <div className={`rounded-2xl p-8 mb-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'User'}</h2>
            <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { icon: '💾', label: t('nav.saved'), value: savedCount, path: '/saved' },
          { icon: '🎒', label: t('nav.packing'), value: checklistCount, path: '/packing' },
          { icon: '📋', label: t('nav.itinerary'), value: 0, path: '/itinerary' },
          { icon: '⚙️', label: t('settings.title'), value: '', path: '/settings' },
        ].map((item, i) => (
          <Link key={i} to={item.path}
            className={`flex items-center gap-4 p-4 rounded-2xl transition-all hover:scale-105 ${
              theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600' : 'bg-white border border-gray-100 hover:border-gray-200'
            }`}>
            <span className="text-3xl">{item.icon}</span>
            <div>
              <h3 className="font-bold">{item.label}</h3>
              {item.value !== '' && <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{item.value} items</p>}
            </div>
          </Link>
        ))}
      </div>

      <button onClick={() => { dispatch(logout()); toast.success('Logged out'); navigate('/'); }}
        className="w-full py-3 border-2 border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors font-medium">
        🚪 {t('nav.logout')}
      </button>
    </div>
  );
});

Profile.displayName = 'Profile';
export default Profile;
