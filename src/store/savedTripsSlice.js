import { createSlice } from '@reduxjs/toolkit';

const loadTrips = () => {
  try { return JSON.parse(localStorage.getItem('savedTrips')) || []; }
  catch { return []; }
};

const savedTripsSlice = createSlice({
  name: 'savedTrips',
  initialState: { items: loadTrips() },
  reducers: {
    toggleTrip: (state, action) => {
      const exists = state.items.find(t => t.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(t => t.id !== action.payload.id);
      } else {
        state.items.push({ ...action.payload, savedAt: new Date().toISOString() });
      }
      localStorage.setItem('savedTrips', JSON.stringify(state.items));
    },
    removeTrip: (state, action) => {
      state.items = state.items.filter(t => t.id !== action.payload);
      localStorage.setItem('savedTrips', JSON.stringify(state.items));
    },
    clearTrips: (state) => {
      state.items = [];
      localStorage.removeItem('savedTrips');
    },
  },
});

export const { toggleTrip, removeTrip, clearTrips } = savedTripsSlice.actions;
export default savedTripsSlice.reducer;
