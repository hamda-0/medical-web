import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: false, // Default to false on server; client will override
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isDarkMode', String(state.isDarkMode));
      }
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('isDarkMode', String(action.payload));
      }
    },
    hydrateTheme: (state, action) => {
      // Hydrate from localStorage on client
      if (typeof window !== 'undefined' && action.payload) {
        state.isDarkMode = action.payload;
      }
    },
  },
});

export const { toggleTheme, setTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;