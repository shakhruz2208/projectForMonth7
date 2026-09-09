import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useWeather = (lat, lon) => {
  return useQuery({
    queryKey: ['weather', lat, lon],
    queryFn: async () => {
      const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: lat,
          longitude: lon,
          current_weather: true,
          daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode',
          timezone: 'auto',
          forecast_days: 7,
        },
      });
      return data;
    },
    enabled: !!lat && !!lon,
    staleTime: 30 * 60 * 1000,
  });
};

export const getWeatherIcon = (code) => {
  const icons = {
    0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
    45: '🌫️', 48: '🌫️',
    51: '🌦️', 53: '🌧️', 55: '🌧️',
    61: '🌧️', 63: '🌧️', 65: '🌧️',
    71: '🌨️', 73: '🌨️', 75: '🌨️',
    80: '🌦️', 81: '🌧️', 82: '⛈️',
    95: '⛈️', 96: '⛈️', 99: '⛈️',
  };
  return icons[code] || '🌤️';
};

export const getWeatherLabel = (code) => {
  const labels = {
    0: "Aniq", 1: "Asosan aniq", 2: "Qisman bulutli", 3: "Bulutli",
    45: "Tuman", 51: "Yengil momaqaldiroq", 55: "Kuchli momaqaldiroq",
    61: "Yengil yomg'ir", 63: "O'rtacha yomg'ir", 65: "Kuchli yomg'ir",
    71: "Yengil qor", 73: "O'rtacha qor", 75: "Kuchli qor",
    80: "Yengil", 81: "O'rtacha", 82: "Kuchli",
    95: "Chaqimoq", 99: "Kuchli chaqimoq",
  };
  return labels[code] || "Noma'lum";
};
