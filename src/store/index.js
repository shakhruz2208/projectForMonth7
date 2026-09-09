import { configureStore } from '@reduxjs/toolkit';
import savedTripsReducer from './savedTripsSlice';
import checklistReducer from './checklistSlice';
import authReducer from './authSlice';
import settingsReducer from './settingsSlice';

export const store = configureStore({
  reducer: {
    savedTrips: savedTripsReducer,
    checklist: checklistReducer,
    auth: authReducer,
    settings: settingsReducer,
  },
});
