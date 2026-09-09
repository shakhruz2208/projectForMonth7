import React, { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';

const Layout = memo(({ children }) => {
  const { theme } = useSelector(s => s.settings);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
});

Layout.displayName = 'Layout';
export default Layout;
