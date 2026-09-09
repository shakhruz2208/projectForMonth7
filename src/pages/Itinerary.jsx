import React, { memo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { useTranslation } from '../context/LanguageContext';
import destinations from '../data/destinations.json';
import toast from 'react-hot-toast';

const itinerarySchema = yup.object({
  title: yup.string().required('Title is required').min(3, 'Min 3 characters'),
  destination: yup.string().required('Choose destination'),
  startDate: yup.date().required('Start date required'),
  endDate: yup.date().required('End date required').min(yup.ref('startDate'), 'End must be after start'),
  days: yup.array().of(yup.object({
    title: yup.string().required('Day title required'),
    activities: yup.array().of(yup.string().required('Activity required')),
  })),
});

const Itinerary = memo(() => {
  const { theme } = useSelector(s => s.settings);
  const { t } = useTranslation();
  const [savedItineraries, setSavedItineraries] = useState([]);

  const handleSubmit = useCallback((values, { resetForm }) => {
    setSavedItineraries(prev => [...prev, { ...values, id: Date.now() }]);
    toast.success("Itinerary saved!");
    resetForm();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">📋 {t('nav.itinerary')}</h1>
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}>
          Build your travel plan day by day
        </p>
      </div>

      <Formik
        initialValues={{
          title: '',
          destination: '',
          startDate: '',
          endDate: '',
          days: [{ title: 'Day 1', activities: ['Morning arrival', 'Hotel check-in'] }],
        }}
        validationSchema={itinerarySchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            {/* Basic Info */}
            <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold text-lg mb-4">📝 Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Trip Title</label>
                  <Field name="title" className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                    theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                  }`} placeholder="My amazing trip..." />
                  <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Destination</label>
                  <Field as="select" name="destination"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                    }`}>
                    <option value="">Choose...</option>
                    {destinations.map(d => (
                      <option key={d.id} value={d.name}>{d.emoji} {d.name}, {d.country}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="destination" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>Start Date</label>
                  <Field type="date" name="startDate"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                    }`} />
                  <ErrorMessage name="startDate" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>End Date</label>
                  <Field type="date" name="endDate"
                    className={`w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-900'
                    }`} />
                  <ErrorMessage name="endDate" component="p" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Days */}
            <div className={`rounded-2xl p-6 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
              <h3 className="font-bold text-lg mb-4">📅 Daily Plan</h3>
              <FieldArray name="days">
                {({ push, remove }) => (
                  <div className="space-y-4">
                    {values.days.map((day, dayIndex) => (
                      <div key={dayIndex} className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-700/50' : 'bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-3">
                          <Field name={`days.${dayIndex}.title`}
                            className={`font-bold bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`} />
                          {values.days.length > 1 && (
                            <button type="button" onClick={() => remove(dayIndex)}
                              className="text-red-500 hover:text-red-600 text-sm">🗑️</button>
                          )}
                        </div>
                        <FieldArray name={`days.${dayIndex}.activities`}>
                          {({ push: pushActivity, remove: removeActivity }) => (
                            <div className="space-y-2">
                              {day.activities.map((activity, actIndex) => (
                                <div key={actIndex} className="flex gap-2">
                                  <Field name={`days.${dayIndex}.activities.${actIndex}`}
                                    className={`flex-1 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                                      theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-white text-gray-900 border'
                                    }`} />
                                  <button type="button" onClick={() => removeActivity(actIndex)}
                                    className="text-red-400 hover:text-red-500">✕</button>
                                </div>
                              ))}
                              <button type="button" onClick={() => pushActivity('')}
                                className="text-emerald-500 hover:text-emerald-600 text-sm">+ Add activity</button>
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    ))}
                    <button type="button" onClick={() => push({ title: `Day ${values.days.length + 1}`, activities: [''] })}
                      className={`w-full py-3 rounded-xl border-2 border-dashed transition-colors ${
                        theme === 'dark' ? 'border-slate-600 text-slate-400 hover:border-emerald-500' : 'border-gray-300 text-gray-500 hover:border-emerald-500'
                      }`}>
                      + Add Day
                    </button>
                  </div>
                )}
              </FieldArray>
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              {isSubmitting ? t('common.loading') : `💾 Save Itinerary`}
            </button>
          </Form>
        )}
      </Formik>

      {/* Saved Itineraries */}
      {savedItineraries.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">📋 Saved Itineraries</h3>
          <div className="space-y-4">
            {savedItineraries.map(it => (
              <div key={it.id} className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700/50' : 'bg-white border border-gray-200'}`}>
                <h4 className="font-bold">{it.title}</h4>
                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}`}>
                  {it.destination} • {it.startDate} → {it.endDate} • {it.days.length} days
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

Itinerary.displayName = 'Itinerary';
export default Itinerary;
