export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  booked?: boolean;
}

export interface AppointmentDay {
  date: string;
  dayName: string;
  timeSlots: TimeSlot[];
}

export interface MedicalCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  specialties: string[];
  rating: number;
  image: string;
}
