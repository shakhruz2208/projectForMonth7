import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import destinations from '../data/destinations.json';

const Budget = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(5);
  const [travelers, setTravelers] = useState(2);
  const [transport, setTransport] = useState(200);
  const [accommodation, setAccommodation] = useState(100);
  const [food, setFood] = useState(50);
  const [activities, setActivities] = useState(80);
  const [other, setOther] = useState(50);

  const dest = destinations.find(d => d.name === destination);
  const dailyCost = (accommodation + food + activities + other);
  const totalTransport = transport * travelers;
  const totalAccommodation = accommodation * days * travelers;
  const totalFood = food * days * travelers;
  const totalActivities = activities * days * travelers;
  const totalOther = other * days * travelers;
  const total = totalTransport + totalAccommodation + totalFood + totalActivities + totalOther;
  const perPerson = travelers > 0 ? (total / travelers).toFixed(2) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💰 {t('budget.title')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{t('budget.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: t('budget.destination'), value: destination, set: setDestination, type: 'select', options: destinations.map(d => d.name) },
                { label: t('budget.startDate'), value: '', set: () => {}, type: 'date' },
                { label: t('common.day'), value: days, set: setDays, type: 'number' },
                { label: t('budget.travelers'), value: travelers, set: setTravelers, type: 'number' },
              ].map((field, i) => (
                <div key={i}>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>{field.label}</label>
                  {field.type === 'select' ? (
                    <select value={field.value} onChange={e => field.set(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'
                      }`}>
                      <option value="">Choose...</option>
                      {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : (
                    <input type={field.type} value={field.value} onChange={e => field.set(Number(e.target.value) || e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'
                      }`} />
                  )}
                </div>
              ))}
            </div>

            <h3 className="font-bold mt-6 mb-4">💸 {t('budget.total')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: t('budget.transport'), value: transport, set: setTransport },
                { label: t('budget.accommodation'), value: accommodation, set: setAccommodation },
                { label: t('budget.food'), value: food, set: setFood },
                { label: t('budget.activities'), value: activities, set: setActivities },
                { label: t('budget.other'), value: other, set: setOther },
              ].map((field, i) => (
                <div key={i}>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                    {field.label} ($)
                  </label>
                  <input type="number" value={field.value} onChange={e => field.set(Number(e.target.value))}
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'
                    }`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className={`rounded-2xl p-6 sticky top-24 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
            <h3 className="font-bold text-lg mb-4">📊 Summary</h3>
            <div className="space-y-3">
              {[
                { label: t('budget.transport'), value: totalTransport },
                { label: t('budget.accommodation'), value: totalAccommodation },
                { label: t('budget.food'), value: totalFood },
                { label: t('budget.activities'), value: totalActivities },
                { label: t('budget.other'), value: totalOther },
              ].map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{item.label}</span>
                  <span className="font-medium">${item.value}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-lg">{t('budget.total')}</span>
                <span className="font-bold text-lg text-emerald-500">${total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{t('budget.perPerson')}</span>
                <span className="font-medium">${perPerson}</span>
              </div>
            </div>

            {dest && (
              <div className="mt-6 p-4 rounded-xl bg-emerald-500/10">
                <p className="text-sm font-medium text-emerald-500">
                  {dest.emoji} {dest.name} — ${dest.price}/day
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Budget.displayName = 'Budget';
export default Budget;
