import { AppointmentDay, MedicalCenter, TimeSlot } from "../types/appointment.types";

export const medicalCenters: MedicalCenter[] = [
  {
    id: "1",
    name: "City Medical Center",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    specialties: ["Cardiology", "General Medicine", "Radiology"],
    rating: 4.8,
    image: "/api/placeholder/300/200"
  },
  {
    id: "2",
    name: "Advanced Health Clinic",
    address: "456 Oak Avenue, Midtown",
    phone: "+1 (555) 987-6543",
    specialties: ["Neurology", "Orthopedics", "General Medicine"],
    rating: 4.6,
    image: "/api/placeholder/300/200"
  },
  {
    id: "3",
    name: "Premier Care Hospital",
    address: "789 Pine Road, Uptown",
    phone: "+1 (555) 456-7890",
    specialties: ["Emergency Care", "Surgery", "Internal Medicine"],
    rating: 4.9,
    image: "/api/placeholder/300/200"
  }
];

const generateTimeSlots = (date: string): TimeSlot[] => {
  const baseSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30"
  ];

  return baseSlots.map((time) => {
    // Simulate some slots being unavailable or booked
    const random = Math.random();
    let available = true;
    let booked = false;

    if (random < 0.15) {
      available = false; // 15% unavailable
    } else if (random < 0.35) {
      booked = true; // 20% booked
    }

    return {
      id: `${date}-${time}`,
      time,
      available,
      booked
    };
  });
};

const getNextDays = (numDays: number): AppointmentDay[] => {
  const days: AppointmentDay[] = [];
  const today = new Date();
  
  for (let i = 0; i < numDays; i++) {
    const currentDate = new Date(today);
    currentDate.setDate(today.getDate() + i);
    
    const dateString = currentDate.toISOString().split('T')[0];
    const dayName = currentDate.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    days.push({
      date: dateString,
      dayName,
      timeSlots: generateTimeSlots(dateString)
    });
  }
  
  return days;
};

export const appointmentSlots: AppointmentDay[] = getNextDays(14);

export const examTypes = [
  {
    id: "general",
    name: "General Medical Examination",
    duration: "30 minutes",
    price: "$150"
  },
  {
    id: "comprehensive",
    name: "Comprehensive Health Checkup",
    duration: "60 minutes",
    price: "$280"
  },
  {
    id: "cardio",
    name: "Cardiovascular Screening",
    duration: "45 minutes",
    price: "$220"
  },
  {
    id: "executive",
    name: "Executive Health Package",
    duration: "90 minutes",
    price: "$450"
  }
];