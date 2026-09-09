import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const Loading = memo(({ text = 'Loading...' }) => {
  const { theme } = useSelector(s => s.settings);
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 relative">
        <div className={`absolute inset-0 border-4 rounded-full ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`} />
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin" />
      </div>
      <p className={`mt-4 font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{text}</p>
    </div>
  );
});

Loading.displayName = 'Loading';
export default Loading;
