import React, { memo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setLanguage } from '../../store/settingsSlice';
import { useTranslation } from '../../context/LanguageContext';

const Header = memo(() => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { t, language } = useTranslation();
  const { theme } = useSelector(s => s.settings);
  const { isAuthenticated, user } = useSelector(s => s.auth);
  const savedCount = useSelector(s => s.savedTrips.items.length);

  const links = [
    { path: '/', label: t('nav.home'), icon: '🏠' },
    { path: '/destinations', label: t('nav.destinations'), icon: '🌍' },
    { path: '/itinerary', label: t('nav.itinerary'), icon: '📋' },
    { path: '/budget', label: t('nav.budget'), icon: '💰' },
    { path: '/weather', label: t('nav.weather'), icon: '🌤️' },
    { path: '/reviews', label: 'Reviews', icon: '💬' },
  ];

  const moreLinks = [
    { path: '/blog', label: t('nav.blog'), icon: '📝' },
    { path: '/currency', label: 'Currency', icon: '💱' },
    { path: '/packing', label: t('nav.packing'), icon: '🎒' },
    { path: '/emergency', label: 'Emergency', icon: '🆘' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
      theme === 'dark'
        ? 'bg-slate-900/80 border-slate-700/50 text-white'
        : 'bg-white/80 border-gray-200/50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center font-bold text-xl text-white group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/25">
              ✈️
            </div>
            <span className="text-xl font-bold hidden sm:block bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
              TripMate
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(link => (
              <Link key={link.path} to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                <span className="mr-1">{link.icon}</span>
                {link.label}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button onClick={() => setMoreOpen(!moreOpen)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                More ▾
              </button>
              {moreOpen && (
                <div className={`absolute right-0 top-full mt-1 w-48 rounded-xl shadow-xl border z-50 ${
                  theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'
                }`}>
                  {moreLinks.map(link => (
                    <Link key={link.path} to={link.path} onClick={() => setMoreOpen(false)}
                      className={`block px-4 py-3 text-sm ${theme === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                      {link.icon} {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">
            <Link to="/saved" className={`relative p-2 rounded-lg transition-colors ${
              theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </Link>

            <select value={language} onChange={e => dispatch(setLanguage(e.target.value))}
              className={`px-2 py-1 rounded-lg text-sm focus:outline-none ${
                theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-900'
              }`}>
              <option value="uz">🇺🇿 UZ</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ru">🇷🇺 RU</option>
            </select>

            <button onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-100'}`}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {isAuthenticated ? (
              <Link to="/profile" className={`p-2 rounded-lg transition-colors ${
                theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
              }`}>
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </Link>
            ) : (
              <Link to="/login" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                theme === 'dark' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}>
                {t('nav.login')}
              </Link>
            )}

            <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden py-4 border-t border-slate-700/50 max-h-[70vh] overflow-y-auto">
            {[...links, ...moreLinks].map(link => (
              <Link key={link.path} to={link.path} onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl transition-colors ${
                  isActive(link.path) ? 'bg-emerald-500/20 text-emerald-500' : theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-gray-100'
                }`}>
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';
export default Header;
