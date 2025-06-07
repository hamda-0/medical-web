
import AppointmentForm from '@/features/appointments/AppointmentForm';
import React from 'react';

const BookAppointment = () => {
  return (
    <div className="min-h-screen bg-muted/50 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Book Medical Examination</h1>
          <p className="text-muted-foreground">
            Schedule your medical examination appointment with our certified healthcare providers
          </p>
        </div>
        <AppointmentForm />
      </div>
    </div>
  );
};

export default BookAppointment;