export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  email: string;
  phone: string;
  address: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  licenseNumber: string;
  medicalCenter: string;
}

export interface VitalSigns {
  bloodPressure: {
    systolic: number;
    diastolic: number;
    status: 'Normal' | 'Elevated' | 'High' | 'Low';
  };
  heartRate: {
    value: number;
    unit: string;
    status: 'Normal' | 'High' | 'Low';
  };
  temperature: {
    value: number;
    unit: string;
    status: 'Normal' | 'Fever' | 'Low';
  };
  respiratoryRate: {
    value: number;
    unit: string;
    status: 'Normal' | 'High' | 'Low';
  };
  oxygenSaturation: {
    value: number;
    unit: string;
    status: 'Normal' | 'Low';
  };
}

export interface LabResult {
  id: string;
  testName: string;
  value: string | number;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'High' | 'Low' | 'Critical';
  category: 'Blood Chemistry' | 'Hematology' | 'Lipid Profile' | 'Liver Function' | 'Kidney Function' | 'Thyroid Function' | 'Diabetes' | 'Other';
}

export interface ImagingResult {
  id: string;
  type: 'X-Ray' | 'CT Scan' | 'MRI' | 'Ultrasound' | 'ECG' | 'Mammography';
  bodyPart: string;
  findings: string;
  impression: string;
  recommendations: string[];
  imageUrl?: string;
  reportDate: string;
}

export interface Recommendation {
  id: string;
  type: 'Medication' | 'Lifestyle' | 'Follow-up' | 'Specialist Referral' | 'Dietary' | 'Exercise';
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate?: string;
}

export interface MedicalExamResult {
  id: string;
  examinationType: string;
  status: string;
  date: string | Date;
  healthScore: number;
  riskLevel: string;
}

export interface MedicalExamination {
  id: string;
  patient: Patient;
  doctor: Doctor;
  examinationDate: string;
  examinationType: string;
  status: 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';
  overallAssessment: {
    summary: string;
    riskLevel: 'Low' | 'Moderate' | 'High';
    healthScore: number; // 0-100
  };
  vitalSigns: VitalSigns;
  physicalExamination: {
    height: { value: number; unit: string };
    weight: { value: number; unit: string };
    bmi: { value: number; status: 'Underweight' | 'Normal' | 'Overweight' | 'Obese' };
    generalAppearance: string;
    systemsReview: {
      cardiovascular: string;
      respiratory: string;
      gastrointestinal: string;
      neurological: string;
      musculoskeletal: string;
    };
  };
  labResults: LabResult[];
  imagingResults: ImagingResult[];
  recommendations: Recommendation[];
  nextAppointment?: {
    date: string;
    type: string;
    doctor: string;
  };
  reportGeneratedDate: string;
  reportUrl?: string;
}

export interface ExaminationSummary {
  id: string;
  patientName: string;
  examinationType: string;
  date: string;
  status: MedicalExamination['status'];
  healthScore: number;
  riskLevel: MedicalExamination['overallAssessment']['riskLevel'];
  doctor: string;
}