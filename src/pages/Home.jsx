import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { usePopularDestinations } from '../hooks/useDestinations';
import { useBlogPosts } from '../hooks/useBlog';
import Loading from '../components/ui/Loading';

const Home = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const { data: featured, isLoading: loadingDest } = usePopularDestinations();
  const { data: blogData, isLoading: loadingBlog } = useBlogPosts(1, 3);

  const steps = [
    { icon: '🌍', title: t('home.step1'), desc: t('home.step1desc') },
    { icon: '📋', title: t('home.step2'), desc: t('home.step2desc') },
    { icon: '💰', title: t('home.step3'), desc: t('home.step3desc') },
    { icon: '✈️', title: t('home.step4'), desc: t('home.step4desc') },
  ];

  const stats = [
    { value: '100+', label: t('home.stats.destinations'), icon: '🌍' },
    { value: '50K+', label: t('home.stats.travelers'), icon: '👥' },
    { value: '10K+', label: t('home.stats.reviews'), icon: '💬' },
    { value: '50+', label: t('home.stats.countries'), icon: '🏳️' },
  ];

  const features = [
    { icon: '🌤️', title: 'Ob-havo', desc: "Real ob-havo ma'lumotlari", path: '/weather', color: 'from-blue-500 to-cyan-500' },
    { icon: '💰', title: 'Byudjet', desc: 'Xarajatlarni hisoblang', path: '/budget', color: 'from-green-500 to-emerald-500' },
    { icon: '📋', title: 'Marshrut', desc: "Kunlik rejalashtirish", path: '/itinerary', color: 'from-purple-500 to-pink-500' },
    { icon: '🎒', title: 'Chamadon', desc: "Tayyorgarlik ro'yxati", path: '/packing', color: 'from-orange-500 to-red-500' },
    { icon: '💱', title: 'Valyuta', desc: 'Konvertatsiya', path: '/currency', color: 'from-violet-500 to-purple-500' },
    { icon: '🆘', title: 'Emergency', desc: "Tez yordam raqamlari", path: '/emergency', color: 'from-red-500 to-pink-500' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-teal-600/10 to-cyan-600/20" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">{t('home.title')}</span>
            </h1>
            <p className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/destinations" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity shadow-xl shadow-emerald-500/25 hover-lift">
                {t('home.explore')} 🚀
              </Link>
              <Link to="/itinerary" className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all hover-lift ${
                theme === 'dark' ? 'border-2 border-slate-600 text-white hover:bg-slate-800' : 'border-2 border-gray-300 hover:bg-gray-100'
              }`}>
                📋 {t('nav.itinerary')}
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 stagger">
            {stats.map((s, i) => (
              <div key={i} className="text-center hover-lift cursor-default">
                <span className="text-3xl block mb-1">{s.icon}</span>
                <p className="text-3xl font-bold gradient-text">{s.value}</p>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">⚡ Tezkor funksiyalar</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 stagger">
          {features.map((f, i) => (
            <Link key={i} to={f.path}
              className={`group p-6 rounded-2xl text-center transition-all hover-lift ${
                theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50 hover:border-slate-600' : 'bg-white border border-gray-100 hover:border-gray-200'
              }`}>
              <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center text-2xl mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-sm mb-1">{f.title}</h3>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">{t('home.featured')}</h2>
          <Link to="/destinations" className="text-emerald-500 hover:text-emerald-600 font-medium">
            {t('destinations.all')} →
          </Link>
        </div>
        {loadingDest ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`rounded-2xl overflow-hidden animate-pulse ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'}`}>
                <div className={`h-48 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'}`} />
                <div className="p-5 space-y-3">
                  <div className={`h-4 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'} rounded w-2/3`} />
                  <div className={`h-3 ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-300'} rounded w-full`} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
            {featured?.map(dest => (
              <Link key={dest.id} to={`/destination/${dest.id}`}
                className={`group rounded-2xl overflow-hidden transition-all hover-lift ${
                  theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-100'
                }`}>
                <div className="h-48 overflow-hidden">
                  <img src={dest.image} alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg">{dest.emoji} {dest.name}</h3>
                    <span className="text-yellow-500 text-sm">⭐ {dest.rating}</span>
                  </div>
                  <p className={`text-sm mb-3 line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {dest.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-500 font-bold">${dest.price} {t('destinations.perDay')}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                      {dest.country}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How It Works */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.howItWorks')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 stagger">
            {steps.map((step, i) => (
              <div key={i} className="text-center hover-lift">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/25">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      {blogData?.posts?.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">📝 {t('blog.title')}</h2>
            <Link to="/blog" className="text-emerald-500 hover:text-emerald-600 font-medium">{t('blog.readMore')} →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger">
            {blogData.posts.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`}
                className={`group rounded-2xl overflow-hidden transition-all hover-lift ${
                  theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-100'
                }`}>
                <div className="h-40 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-xs text-emerald-500 font-medium">{post.category}</span>
                  <h3 className="font-bold mt-1 mb-2 line-clamp-1 group-hover:text-emerald-500 transition-colors">{post.title}</h3>
                  <p className={`text-sm line-clamp-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* API Info */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className={`rounded-3xl p-12 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
          <h2 className="text-2xl font-bold text-center mb-8">🔌 Real API'lar</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger">
            {[
              { icon: '🌤️', name: 'Open-Meteo', desc: 'Ob-havo', color: 'from-blue-500 to-cyan-500' },
              { icon: '📝', name: 'DummyJSON', desc: 'Blog posts', color: 'from-emerald-500 to-green-500' },
              { icon: '💱', name: 'ExchangeRate', desc: 'Valyuta', color: 'from-purple-500 to-pink-500' },
              { icon: '📸', name: 'Picsum', desc: 'Rasmlar', color: 'from-orange-500 to-red-500' },
            ].map((api, i) => (
              <div key={i} className={`p-4 rounded-xl text-center bg-gradient-to-br ${api.color} text-white hover-lift`}>
                <span className="text-3xl block mb-2">{api.icon}</span>
                <p className="font-bold">{api.name}</p>
                <p className="text-sm text-white/80">{api.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">✈️ {t('home.cta')}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t('home.subtitle')}</p>
            <Link to="/destinations" className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors hover-lift">
              {t('home.explore')} 🚀
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

Home.displayName = 'Home';
export default Home;
