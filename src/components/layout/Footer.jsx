import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../context/LanguageContext';

const Footer = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();

  const cols = [
    { title: t('nav.home'), links: [
      { path: '/destinations', label: t('nav.destinations') },
      { path: '/itinerary', label: t('nav.itinerary') },
      { path: '/budget', label: t('nav.budget') },
      { path: '/weather', label: t('nav.weather') },
    ]},
    { title: t('nav.blog'), links: [
      { path: '/blog', label: t('blog.title') },
      { path: '/packing', label: t('nav.packing') },
      { path: '/saved', label: t('nav.saved') },
    ]},
    { title: t('settings.title'), links: [
      { path: '/settings', label: t('settings.title') },
      { path: '/profile', label: t('nav.profile') },
      { path: '/login', label: t('nav.login') },
    ]},
  ];

  return (
    <footer className={`border-t transition-colors ${
      theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-gray-50 border-gray-200 text-gray-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✈️</span>
              <span className="text-xl font-bold text-white">TripMate</span>
            </Link>
            <p className="text-sm">Sayohatingizni rejalashtiring va unutilmas tajriba orttiring.</p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <h3 className="font-semibold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2 text-sm">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link to={link.path} className="hover:text-emerald-400 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={`mt-8 pt-8 border-t text-center text-sm ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'}`}>
          <p>© 2026 TripMate. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;
