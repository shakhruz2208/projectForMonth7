import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { loginSuccess } from '../store/authSlice';
import { authAPI } from '../utils/api';
import { useTranslation } from '../context/LanguageContext';
import toast from 'react-hot-toast';

const Register = memo(() => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string().required('Name required').min(2, 'Min 2 characters'),
    email: yup.string().required('Email required').email('Invalid email'),
    password: yup.string().required('Password required').min(6, 'Min 6 characters')
      .matches(/[A-Z]/, 'Must contain uppercase').matches(/[0-9]/, 'Must contain number'),
    confirmPassword: yup.string().required('Confirm password').oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const handleSubmit = useCallback(async (values, { setSubmitting }) => {
    try {
      const { data } = await authAPI.register({ name: values.name, email: values.email, password: values.password });
      dispatch(loginSuccess(data));
      toast.success('Welcome!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">✈️</span>
          <h1 className="text-3xl font-bold">{t('auth.registerTitle')}</h1>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700/50">
          <Formik initialValues={{ name: '', email: '', password: '', confirmPassword: '' }} validationSchema={schema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1 text-slate-300">{t('auth.name')}</label>
                  <Field id="name" name="name" className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your name" />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 text-slate-300">{t('auth.email')}</label>
                  <Field id="email" name="email" type="email" className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="email@example.com" />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1 text-slate-300">{t('auth.password')}</label>
                  <Field id="password" name="password" type="password" autoComplete="new-password" className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••••" />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1 text-slate-300">{t('auth.confirmPassword')}</label>
                  <Field id="confirmPassword" name="confirmPassword" type="password" autoComplete="new-password" className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="••••••" />
                  <ErrorMessage name="confirmPassword" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50">
                  {isSubmitting ? t('common.loading') : t('auth.registerBtn')}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-4 text-sm text-slate-400">
            {t('auth.hasAccount')} <Link to="/login" className="text-emerald-500 hover:text-emerald-400">{t('auth.loginBtn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
});

Register.displayName = 'Register';
export default Register;