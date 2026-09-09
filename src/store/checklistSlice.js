import { createSlice } from '@reduxjs/toolkit';

const loadChecklist = () => {
  try { return JSON.parse(localStorage.getItem('checklist')) || []; }
  catch { return []; }
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState: { items: loadChecklist() },
  reducers: {
    addItem: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload.text,
        category: action.payload.category || 'other',
        packed: false,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('checklist', JSON.stringify(state.items));
    },
    toggleItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) item.packed = !item.packed;
      localStorage.setItem('checklist', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload);
      localStorage.setItem('checklist', JSON.stringify(state.items));
    },
    clearChecklist: (state) => {
      state.items = [];
      localStorage.removeItem('checklist');
    },
  },
});

export const { addItem, toggleItem, removeItem, clearChecklist } = checklistSlice.actions;
export default checklistSlice.reducer;
