import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { toggleTheme, setLanguage, toggleNotifications, toggleCompactMode } from '../store/settingsSlice';

const Settings = memo(() => {
  const { theme, language, notifications, compactMode } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const Toggle = ({ isOn, onToggle }) => (
    <button onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${isOn ? 'bg-emerald-500' : 'bg-slate-600'}`}>
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : ''}`} />
    </button>
  );

  const settings = [
    {
      icon: theme === 'dark' ? '🌙' : '☀️',
      title: t('settings.theme'),
      description: theme === 'dark' ? t('settings.dark') : t('settings.light'),
      control: (
        <div className="flex items-center gap-2">
          <span className="text-sm">☀️</span>
          <Toggle isOn={theme === 'dark'} onToggle={() => dispatch(toggleTheme())} />
          <span className="text-sm">🌙</span>
        </div>
      ),
    },
    {
      icon: '🌐',
      title: t('settings.language'),
      description: { uz: "O'zbek", en: 'English', ru: 'Русский' }[language],
      control: (
        <select value={language} onChange={e => dispatch(setLanguage(e.target.value))}
          className={`px-3 py-2 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
          <option value="uz">🇺🇿 O'zbek</option>
          <option value="en">🇬🇧 English</option>
          <option value="ru">🇷🇺 Русский</option>
        </select>
      ),
    },
    {
      icon: '🔔',
      title: t('settings.notifications'),
      description: notifications ? 'On' : 'Off',
      control: <Toggle isOn={notifications} onToggle={() => dispatch(toggleNotifications())} />,
    },
    {
      icon: '📱',
      title: t('settings.compactMode'),
      description: compactMode ? 'On' : 'Off',
      control: <Toggle isOn={compactMode} onToggle={() => dispatch(toggleCompactMode())} />,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">⚙️ {t('settings.title')}</h1>

      <div className="space-y-4">
        {settings.map((s, i) => (
          <div key={i} className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className="font-bold">{s.title}</h3>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{s.description}</p>
                </div>
              </div>
              {s.control}
            </div>
          </div>
        ))}

        <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
          <h3 className="font-bold mb-3">ℹ️ {t('settings.about')}</h3>
          <div className={`text-sm space-y-1 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            <p>TripMate v1.0.0</p>
            <p>React, Redux Toolkit, React Query, Tailwind CSS</p>
            <p>Formik + Yup, i18n (uz/en/ru)</p>
          </div>
        </div>
      </div>
    </div>
  );
});

Settings.displayName = 'Settings';
export default Settings;
