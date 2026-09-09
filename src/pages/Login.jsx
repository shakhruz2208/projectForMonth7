import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { loginSuccess } from '../store/authSlice';
import { authAPI } from '../utils/api';
import { useTranslation } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Login = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().required('Email required').email('Invalid email'),
    password: yup.string().required('Password required').min(4, 'Min 4 characters'),
  });

  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    try {
      const { data } = await authAPI.login(values);
      dispatch(loginSuccess(data));
      toast.success(`Welcome, ${data.user.name}!`);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">✈️</span>
          <h1 className="text-3xl font-bold">{t('auth.loginTitle')}</h1>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50">
          <Formik initialValues={{ email: '', password: '' }} validationSchema={schema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">{t('auth.email')}</label>
                  <Field name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="email@example.com" />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">{t('auth.password')}</label>
                  <Field name="password" type="password" className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••" />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                  {isSubmitting ? t('common.loading') : t('auth.loginBtn')}
                </button>
              </Form>
            )}
          </Formik>
          <div className="mt-4 p-3 bg-slate-700/50 rounded-xl">
            <p className="text-xs text-slate-400 mb-1">Demo accounts:</p>
            <p className="text-xs text-slate-300">📧 akbar@example.com | 🔑 password123</p>
          </div>
          <p className="text-center mt-4 text-sm text-slate-400">
            {t('auth.noAccount')} <Link to="/register" className="text-emerald-500 hover:text-emerald-400">{t('auth.registerBtn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
});

Login.displayName = 'Login';
export default Login;
