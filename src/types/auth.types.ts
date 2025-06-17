
// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
  // Add other user properties as needed
}

export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

export interface MedicalInfo {
  id?: number;
  userId?: string;
  fname: string;
  lname: string;
  payUrl?: string;
  dob: string;
  nationality: string;
  gender: string;
  martialStatus: string;
  passportNumber: string;
  passportIssue: string;
  passportPlace: string;
  passportExpiryDate: string;
  visaType: string;
  email: string;
  phone: string;
  countryTravel: string;
  city: string;
  country: string;
  nationalId: string;
  positionApplied: string;
  other?: string;
}