import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';

const Emergency = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();

  const contacts = [
    { category: "O'zbekiston", icon: '🇺🇿', items: [
      { name: 'Tez yordam', number: '103', icon: '🚑' },
      { name: 'Militsiya', number: '102', icon: '👮' },
      { name: 'Olov o\'chirish', number: '101', icon: '🚒' },
      { name: 'Gaz xizmati', number: '104', icon: '🔥' },
      { name: 'Qutqarish xizmati', number: '112', icon: '🆘' },
    ]},
    { category: "Xalqaro", icon: '🌍', items: [
      { name: 'Xalqaro tez yordam', number: '112', icon: '🚑' },
      { name: 'AQSH (911)', number: '911', icon: '🇺🇸' },
      { name: 'Yevropa (112)', number: '112', icon: '🇪🇺' },
      { name: 'Yaponiya', number: '110', icon: '🇯🇵' },
      { name: 'Turkiya', number: '112', icon: '🇹🇷' },
    ]},
    { category: "Sayohat uchun", icon: '✈️', items: [
      { name: 'Aviakompaniya', number: "+998 78 123 45 67", icon: '✈️' },
      { name: 'Mehmonxona', number: "+998 90 123 45 67", icon: '🏨' },
      { name: 'Sug\'urta', number: "+998 91 123 45 67", icon: '🛡️' },
      { name: 'Konsullik', number: "+998 71 234 56 78", icon: '🏛️' },
      { name: 'Politsiya (turist)', number: '102', icon: '👮' },
    ]},
  ];

  const tips = [
    { icon: '📱', title: 'Telefonni tayyorlang', desc: 'Muhim raqamlarni telefonga saqlang' },
    { icon: '💳', title: 'Karta nusxasi', desc: 'Pasport va karta nusxasini oling' },
    { icon: '🗺️', title: 'Xarita', desc: 'Offline xarita yuklab oling' },
    { icon: '🏥', title: 'Sug\'urta', desc: 'Sayohat sug\'urtasini oling' },
    { icon: '📋', title: 'Kontakt', desc: 'Konsullik raqamini yozib oling' },
    { icon: '💰', title: 'Naqd pul', desc: 'Zaxira naqd pul oling' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🆘 Emergency Contacts</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
          Muhim raqamlar va sayohat xavfsizlik maslahatlari
        </p>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {contacts.map((group, i) => (
          <div key={i} className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
            <h3 className="font-bold text-lg mb-4">{group.icon} {group.category}</h3>
            <div className="space-y-3">
              {group.items.map((item, j) => (
                <div key={j} className={`flex items-center justify-between p-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <a href={`tel:${item.number}`}
                    className="text-emerald-500 font-bold hover:text-emerald-600 transition-colors">
                    {item.number}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <h3 className="font-bold text-lg mb-4">🛡️ Sayohat xavfsizlik maslahatlari</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, i) => (
            <div key={i} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <span className="text-2xl block mb-2">{tip.icon}</span>
              <h4 className="font-bold text-sm mb-1">{tip.title}</h4>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

Emergency.displayName = 'Emergency';
export default Emergency;
