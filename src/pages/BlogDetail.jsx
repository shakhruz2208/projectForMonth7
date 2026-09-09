import React, { memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../context/LanguageContext';
import { useBlogPost, useBlogPosts } from '../hooks/useBlog';
import Loading from '../components/ui/Loading';

const BlogDetail = memo(() => {
  const { id } = useParams();
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const { data: post, isLoading, isError } = useBlogPost(id);
  const { data: relatedData } = useBlogPosts(1, 4);

  if (isLoading) return <Loading text={t('common.loading')} />;

  if (isError || !post) {
    return (
      <div className="text-center py-20">
        <span className="text-6xl mb-4 block">📝</span>
        <h2 className="text-2xl font-bold mb-2">{t('notFound.title')}</h2>
        <Link to="/blog" className="text-emerald-500">← {t('common.back')}</Link>
      </div>
    );
  }

  const related = relatedData?.posts?.filter(p => p.id !== post.id).slice(0, 2) || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="mb-6">
        <ol className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
          <li><Link to="/" className="hover:text-emerald-500">{t('nav.home')}</Link></li>
          <li>/</li>
          <li><Link to="/blog" className="hover:text-emerald-500">{t('nav.blog')}</Link></li>
          <li>/</li>
          <li className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{post.title}</li>
        </ol>
      </nav>

      <div className="relative h-72 rounded-2xl overflow-hidden mb-8">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6">
          <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-sm font-medium">{post.category}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>✍️ {post.author}</span>
        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>📅 {post.date}</span>
        <span className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>❤️ {post.likes}</span>
      </div>

      <h1 className="text-3xl font-bold mb-6">{post.title}</h1>

      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, i) => (
            <span key={i} className={`text-sm px-3 py-1 rounded-full ${
              theme === 'dark' ? 'bg-slate-700 text-slate-300' : 'bg-gray-100 text-gray-600'
            }`}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className={`rounded-2xl p-8 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
        <div className={`prose max-w-none ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>
          {post.content?.split('\n').map((para, i) => (
            <p key={i} className="mb-4 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-12">
          <h3 className="font-bold text-lg mb-4">{t('blog.related')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {related.map(r => (
              <Link key={r.id} to={`/blog/${r.id}`}
                className={`rounded-2xl overflow-hidden transition-all hover:scale-105 ${
                  theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-100'
                }`}>
                <img src={r.image} alt={r.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-bold line-clamp-1">{r.title}</h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                    {r.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

BlogDetail.displayName = 'BlogDetail';
export default BlogDetail;
