// '@/types/medicalCenters.types.ts'
export interface MedicalCenter {
  id: number;
  name: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  phone: string;
  email: string;
  website?: string;
  rating: number;
  workingHours?: string;
}