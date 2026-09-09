import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { useCurrencyRates, currencies } from '../hooks/useCurrency';
import Loading from '../components/ui/Loading';

const CurrencyConverter = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const { data: rates, isLoading } = useCurrencyRates();
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('UZS');

  const converted = rates && rates[to] ? (amount * rates[to] / rates[from]).toFixed(2) : '...';
  const rate = rates && rates[to] ? (rates[to] / rates[from]).toFixed(4) : '...';

  if (isLoading) return <Loading text={t('common.loading')} />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💱 Currency Converter</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>Real exchange rates</p>
      </div>

      {/* Converter */}
      <div className={`rounded-2xl p-8 mb-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>From</label>
            <div className={`flex rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))}
                className={`flex-1 px-4 py-3 focus:outline-none ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-50'}`} />
              <select value={from} onChange={e => setFrom(e.target.value)}
                className={`px-4 py-3 focus:outline-none ${theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-gray-100'}`}>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={() => { setFrom(to); setTo(from); }}
              className={`mb-3 mx-auto p-3 rounded-xl transition-all hover:scale-110 ${
                theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-100 hover:bg-gray-200'
              }`}>
              🔄
            </button>
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>To</label>
            <div className={`flex rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-slate-600' : 'border-gray-300'}`}>
              <div className={`flex-1 px-4 py-3 font-bold text-xl ${theme === 'dark' ? 'bg-slate-700 text-emerald-400' : 'bg-gray-50 text-emerald-600'}`}>
                {converted}
              </div>
              <select value={to} onChange={e => setTo(e.target.value)}
                className={`px-4 py-3 focus:outline-none ${theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-gray-100'}`}>
                {currencies.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className={`mt-6 p-4 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
            1 {from} = {rate} {to}
          </p>
        </div>
      </div>

      {/* Quick Rates */}
      <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <h3 className="font-bold text-lg mb-4">📊 Quick Rates (1 USD =)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {currencies.map(c => (
            <div key={c.code} className={`p-3 rounded-xl text-center ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
              <span className="text-2xl">{c.flag}</span>
              <p className="font-medium text-sm mt-1">{c.code}</p>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                {rates?.[c.code]?.toFixed(2) || '...'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

CurrencyConverter.displayName = 'CurrencyConverter';
export default CurrencyConverter;
