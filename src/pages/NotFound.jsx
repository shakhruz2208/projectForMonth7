import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';

const NotFound = memo(() => {
  const { t } = useTranslation();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <span className="text-9xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">404</span>
        <h1 className="text-3xl font-bold mt-4 mb-2">{t('notFound.title')}</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">{t('notFound.subtitle')}</p>
        <Link to="/" className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity">
          🏠 {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
});

NotFound.displayName = 'NotFound';
export default NotFound;
