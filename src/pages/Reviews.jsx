import React, { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useTranslation } from '../context/LanguageContext';
import { reviewsAPI } from '../utils/api';
import Loading from '../components/ui/Loading';
import toast from 'react-hot-toast';

const reviewSchema = yup.object({
  name: yup.string().required('Name required').min(2, 'Min 2 characters'),
  destination: yup.string().required('Destination required'),
  rating: yup.number().required('Rating required').min(1).max(5),
  title: yup.string().required('Title required').min(5, 'Min 5 characters'),
  comment: yup.string().required('Comment required').min(20, 'Min 20 characters').max(1000),
  travelType: yup.string().required('Travel type required'),
});

const Reviews = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const { isAuthenticated, user } = useSelector(s => s.auth);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('recent');
  const [filterRating, setFilterRating] = useState(0);

  const destinations = ['Paris', 'Tokyo', 'Bali', 'New York', 'Dubai', 'Cappadocia', 'Santorini', 'Istanbul', 'Maldives', 'Kyoto'];
  const travelTypes = ['Solo', 'Couple', 'Family', 'Friends', 'Business'];

  useEffect(() => {
    fetchReviews();
  }, [sortBy, filterRating]);

  const fetchReviews = async () => {
    try {
      const params = { sort: sortBy, limit: 20 };
      if (filterRating) params.rating = filterRating;
      const { data } = await reviewsAPI.getAll(params);
      setReviews(data.reviews || []);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await reviewsAPI.create(values);
      toast.success('Review created!');
      resetForm();
      fetchReviews();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to create review');
    }
  };

  const handleHelpful = async (id) => {
    try {
      await reviewsAPI.markHelpful(id);
      setReviews(prev => prev.map(r => r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r));
    } catch {}
  };

  const avgRating = reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">💬 {t('reviews.title')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
          {reviews.length} reviews • Backend API • Avg: ⭐ {avgRating}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-6">
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-gray-100'}`}>
              <option value="recent">Recent</option>
              <option value="helpful">Helpful</option>
              <option value="rating">Rating</option>
            </select>
            <div className="flex gap-1">
              {[0, 5, 4, 3].map(r => (
                <button key={r} onClick={() => setFilterRating(r)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    filterRating === r ? 'bg-emerald-500 text-white' : theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                  {r === 0 ? 'All' : `${r}★`}
                </button>
              ))}
            </div>
          </div>

          {loading ? <Loading /> : (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-xl">
                        {review.author_avatar || '👤'}
                      </div>
                      <div>
                        <p className="font-bold">{review.author_name || 'Anonymous'}</p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                          {review.destination} • {review.travel_type} • {review.created_at?.split('T')[0]}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(s => (
                        <span key={s} className={`text-lg ${s <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <h4 className="font-bold mb-2">{review.title}</h4>
                  <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-600'}`}>{review.comment}</p>
                  <button onClick={() => handleHelpful(review.id)}
                    className={`text-sm flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                      theme === 'dark' ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-gray-100 text-gray-500'
                    }`}>
                    👍 {review.helpful || 0} Helpful
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Review Form */}
        <div>
          <div className={`rounded-2xl p-6 sticky top-24 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
            <h3 className="font-bold text-lg mb-4">✍️ Write Review</h3>
            {isAuthenticated ? (
              <Formik
                initialValues={{ name: user?.name || '', destination: '', rating: 0, title: '', comment: '', travelType: '' }}
                validationSchema={reviewSchema} onSubmit={handleSubmit}>
                {({ values, setFieldValue, isSubmitting }) => (
                  <Form className="space-y-4">
                    <div>
                      <Field name="name" className={`w-full px-3 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`} placeholder="Your name" />
                      <ErrorMessage name="name" component="p" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <Field as="select" name="destination" className={`w-full px-3 py-2 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
                        <option value="">Destination...</option>
                        {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                      </Field>
                      <ErrorMessage name="destination" component="p" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(s => (
                          <button key={s} type="button" onClick={() => setFieldValue('rating', s)}
                            className={`text-2xl ${s <= values.rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'}`}>★</button>
                        ))}
                      </div>
                      <ErrorMessage name="rating" component="p" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <Field name="title" className={`w-full px-3 py-2 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`} placeholder="Review title" />
                      <ErrorMessage name="title" component="p" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <Field as="textarea" name="comment" rows={4} className={`w-full px-3 py-2 rounded-xl text-sm resize-none ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`} placeholder="Your review..." />
                      <ErrorMessage name="comment" component="p" className="text-red-500 text-xs mt-1" />
                    </div>
                    <div>
                      <Field as="select" name="travelType" className={`w-full px-3 py-2 rounded-xl text-sm ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100'}`}>
                        <option value="">Travel type...</option>
                        {travelTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </Field>
                      <ErrorMessage name="travelType" component="p" className="text-red-500 text-xs mt-1" />
                    </div>
                    <button type="submit" disabled={isSubmitting}
                      className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                      {isSubmitting ? '...' : '📤 Submit'}
                    </button>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="text-center py-8">
                <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>Login to write reviews</p>
                <a href="/login" className="text-emerald-500 hover:text-emerald-400 mt-2 inline-block">Login →</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

Reviews.displayName = 'Reviews';
export default Reviews;
