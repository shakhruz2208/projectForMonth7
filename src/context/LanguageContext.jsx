import { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';
import uz from '../data/locales/uz.json';
import en from '../data/locales/en.json';
import ru from '../data/locales/ru.json';

const translations = { uz, en, ru };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { language } = useSelector(state => state.settings);

  const t = useMemo(() => {
    const dict = translations[language] || translations.uz;
    return (key) => {
      const keys = key.split('.');
      let value = dict;
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={{ t, language }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
