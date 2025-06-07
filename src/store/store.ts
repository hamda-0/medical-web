
import { configureStore } from '@reduxjs/toolkit';
import themeSlice from '@/reducers/theme/themeReducer';
import authSlice from '@/reducers/auth/authReducer';
import appointmentSlice from '@/reducers/appointment/appointmentReducer';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    auth:authSlice,
     appointments: appointmentSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;