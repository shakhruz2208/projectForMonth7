import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { addItem, toggleItem, removeItem, clearChecklist } from '../store/checklistSlice';
import toast from 'react-hot-toast';

const PackingList = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const items = useSelector(s => s.checklist.items);
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('other');

  const categories = ['documents', 'clothes', 'electronics', 'toiletries', 'medicine', 'other'];

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    dispatch(addItem({ text: newItem.trim(), category }));
    setNewItem('');
    toast.success('Added!');
  };

  const packed = items.filter(i => i.packed).length;
  const progress = items.length > 0 ? Math.round((packed / items.length) * 100) : 0;

  const grouped = categories.map(cat => ({
    name: cat,
    items: items.filter(i => i.category === cat),
  })).filter(g => g.items.length > 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🎒 {t('packing.title')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>{t('packing.subtitle')}</p>
      </div>

      {/* Progress */}
      <div className={`rounded-2xl p-6 mb-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-bold">{t('packing.progress')}: {packed}/{items.length}</span>
          <span className="text-emerald-500 font-bold">{progress}%</span>
        </div>
        <div className={`w-full h-3 rounded-full ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'}`}>
          <div className="h-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Add Item */}
      <form onSubmit={handleAdd} className={`rounded-2xl p-4 mb-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className="flex gap-2">
          <input type="text" value={newItem} onChange={e => setNewItem(e.target.value)}
            placeholder={t('packing.addPlaceholder')}
            className={`flex-1 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              theme === 'dark' ? 'bg-slate-700 text-white placeholder-slate-400' : 'bg-gray-100 text-gray-900'
            }`} />
          <select value={category} onChange={e => setCategory(e.target.value)}
            className={`px-4 py-3 rounded-xl ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
            {categories.map(c => <option key={c} value={c}>{t(`packing.categories.${c}`)}</option>)}
          </select>
          <button type="submit" className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-colors font-medium">
            +
          </button>
        </div>
      </form>

      {/* Items */}
      {grouped.length === 0 ? (
        <div className="text-center py-12">
          <span className="text-6xl mb-4 block">🎒</span>
          <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>Add items to your packing list</p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map(group => (
            <div key={group.name} className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold mb-3">{t(`packing.categories.${group.name}`)} ({group.items.length})</h3>
              <div className="space-y-2">
                {group.items.map(item => (
                  <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    item.packed ? 'bg-emerald-500/10' : theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'
                  }`}>
                    <button onClick={() => dispatch(toggleItem(item.id))}
                      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
                        item.packed ? 'bg-emerald-500 border-emerald-500 text-white' : theme === 'dark' ? 'border-slate-500' : 'border-gray-300'
                      }`}>
                      {item.packed && '✓'}
                    </button>
                    <span className={`flex-1 ${item.packed ? 'line-through opacity-50' : ''}`}>{item.text}</span>
                    <button onClick={() => dispatch(removeItem(item.id))} className="text-red-400 hover:text-red-500">✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <button onClick={() => { dispatch(clearChecklist()); toast.success('Cleared!'); }}
          className="mt-6 w-full py-3 border-2 border-red-500/50 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors font-medium">
          🗑️ {t('packing.clearAll')}
        </button>
      )}
    </div>
  );
});

PackingList.displayName = 'PackingList';
export default PackingList;
