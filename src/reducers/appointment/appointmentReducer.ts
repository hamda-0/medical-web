import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Appointment {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  nationality: string;
  country: string;
  city: string;
  appointmentDate: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
}

const initialState: AppointmentState = {
  appointments: [
    {
      id: '1',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      email: 'ahmed@example.com',
      nationality: 'UAE',
      country: 'UAE',
      city: 'Dubai',
      appointmentDate: '2024-06-15',
      status: 'pending',
    },
    {
      id: '2',
      firstName: 'Sarah',
      lastName: 'Ali',
      email: 'sarah@example.com',
      nationality: 'Saudi Arabia',
      country: 'Saudi Arabia',
      city: 'Riyadh',
      appointmentDate: '2024-06-20',
      status: 'confirmed',
    },
  ],
  loading: false,
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Omit<Appointment, 'id' | 'status'>>) => {
      const newAppointment: Appointment = {
        ...action.payload,
        id: Math.random().toString(36).substr(2, 9),
        status: 'pending',
      };
      state.appointments.push(newAppointment);
    },
    updateAppointmentStatus: (state, action: PayloadAction<{ id: string; status: Appointment['status'] }>) => {
      const appointment = state.appointments.find(app => app.id === action.payload.id);
      if (appointment) {
        appointment.status = action.payload.status;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addAppointment, updateAppointmentStatus, setLoading } = appointmentSlice.actions;
export default appointmentSlice.reducer;
