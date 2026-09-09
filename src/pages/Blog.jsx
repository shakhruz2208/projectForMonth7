import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { useBlogPosts } from '../hooks/useBlog';
import Loading from '../components/ui/Loading';

const Blog = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useBlogPosts(page, 9);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📝 {t('blog.title')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
          {t('blog.subtitle')} • {data?.total || 0} articles from API
        </p>
      </div>

      {isLoading ? (
        <Loading text={t('common.loading')} />
      ) : isError ? (
        <div className="text-center py-12">
          <span className="text-4xl mb-2 block">⚠️</span>
          <p className="text-red-400">API xatolik. dummyjson.com ishlamayapti.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.posts?.map(post => (
              <Link key={post.id} to={`/blog/${post.id}`}
                className={`group rounded-2xl overflow-hidden transition-all hover:scale-105 hover:shadow-xl ${
                  theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-100'
                }`}>
                <div className="h-48 overflow-hidden bg-gradient-to-br from-emerald-500/20 to-teal-500/20">
                  <img src={post.image} alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
                      ❤️ {post.likes}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-emerald-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className={`text-sm line-clamp-2 mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
                      ✍️ {post.author}
                    </span>
                    <span className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-gray-400'}`}>
                      📅 {post.date}
                    </span>
                  </div>
                  {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {post.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className={`text-xs px-2 py-0.5 rounded-full ${
                          theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className={`px-4 py-2 rounded-xl font-medium disabled:opacity-50 transition-colors ${
                theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              ← {t('common.previous')}
            </button>
            <span className={`px-4 py-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
              Sahifa {page} / {Math.ceil((data?.total || 0) / 9)}
            </span>
            <button onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil((data?.total || 0) / 9)}
              className={`px-4 py-2 rounded-xl font-medium disabled:opacity-50 transition-colors ${
                theme === 'dark' ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}>
              {t('common.next')} →
            </button>
          </div>
        </>
      )}
    </div>
  );
});

Blog.displayName = 'Blog';
export default Blog;
