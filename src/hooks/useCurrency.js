import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useCurrencyRates = () => {
  return useQuery({
    queryKey: ['currencyRates'],
    queryFn: async () => {
      const { data } = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      return data.rates;
    },
    staleTime: 60 * 60 * 1000,
  });
};

export const currencies = [
  { code: 'USD', name: 'AQSH Dollari', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', name: 'Yevro', symbol: '€', flag: '🇪🇺' },
  { code: 'UZS', name: "O'zbek So'mi", symbol: 'сўм', flag: '🇺🇿' },
  { code: 'GBP', name: 'Britaniya Funti', symbol: '£', flag: '🇬🇧' },
  { code: 'RUB', name: 'Rossiya Rubli', symbol: '₽', flag: '🇷🇺' },
  { code: 'TRY', name: 'Turkiya Lirasi', symbol: '₺', flag: '🇹🇷' },
  { code: 'JPY', name: 'Yaponiya Yenasi', symbol: '¥', flag: '🇯🇵' },
  { code: 'KRW', name: 'Koreya Won', symbol: '₩', flag: '🇰🇷' },
  { code: 'AED', name: 'BAA Dirhami', symbol: 'د.إ', flag: '🇦🇪' },
  { code: 'IDR', name: 'Indoneziya Rupisi', symbol: 'Rp', flag: '🇮🇩' },
];
