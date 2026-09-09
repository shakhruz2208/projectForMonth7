import { createSlice } from '@reduxjs/toolkit';

const loadSettings = () => {
  try {
    return JSON.parse(localStorage.getItem('settings')) || {
      theme: 'dark',
      language: 'uz',
      notifications: true,
      compactMode: false,
    };
  } catch {
    return { theme: 'dark', language: 'uz', notifications: true, compactMode: false };
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: loadSettings(),
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('settings', JSON.stringify(state));
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('settings', JSON.stringify(state));
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
      localStorage.setItem('settings', JSON.stringify(state));
    },
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
      localStorage.setItem('settings', JSON.stringify(state));
    },
  },
});

export const { toggleTheme, setTheme, setLanguage, toggleNotifications, toggleCompactMode } = settingsSlice.actions;
export default settingsSlice.reducer;
