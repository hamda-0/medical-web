import { MedicalExamination, ExaminationSummary, Patient, Doctor } from '../types/medicalExamination.types';

export const samplePatients: Patient[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Cityville, ST 12345',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4568'
    }
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak Avenue, Townsburg, ST 54321',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Brother',
      phone: '+1 (555) 987-6544'
    }
  }
];

export const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Internal Medicine',
    licenseNumber: 'MD12345',
    medicalCenter: 'City Medical Center'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Cardiology',
    licenseNumber: 'MD67890',
    medicalCenter: 'Advanced Health Clinic'
  },
  {
    id: '3',
    name: 'Dr. Lisa Thompson',
    specialization: 'Family Medicine',
    licenseNumber: 'MD11111',
    medicalCenter: 'Premier Care Hospital'
  }
];

export const medicalExaminations: MedicalExamination[] = [
  {
    id: 'EX001',
    patient: samplePatients[0],
    doctor: sampleDoctors[0],
    examinationDate: '2024-12-15',
    examinationType: 'Comprehensive Health Checkup',
    status: 'Completed',
    overallAssessment: {
      summary: 'Overall health is good with minor concerns regarding cholesterol levels. Patient shows excellent cardiovascular fitness and normal organ function.',
      riskLevel: 'Low',
      healthScore: 85
    },
    vitalSigns: {
      bloodPressure: {
        systolic: 128,
        diastolic: 82,
        status: 'Elevated'
      },
      heartRate: {
        value: 72,
        unit: 'bpm',
        status: 'Normal'
      },
      temperature: {
        value: 98.6,
        unit: '°F',
        status: 'Normal'
      },
      respiratoryRate: {
        value: 16,
        unit: 'breaths/min',
        status: 'Normal'
      },
      oxygenSaturation: {
        value: 98,
        unit: '%',
        status: 'Normal'
      }
    },
    physicalExamination: {
      height: { value: 5.9, unit: 'ft' },
      weight: { value: 175, unit: 'lbs' },
      bmi: { value: 25.8, status: 'Overweight' },
      generalAppearance: 'Well-appearing adult male in no acute distress',
      systemsReview: {
        cardiovascular: 'Regular rate and rhythm, no murmurs',
        respiratory: 'Clear to auscultation bilaterally',
        gastrointestinal: 'Soft, non-tender, no organomegaly',
        neurological: 'Alert and oriented, normal reflexes',
        musculoskeletal: 'Full range of motion, no joint swelling'
      }
    },
    labResults: [
      {
        id: 'LAB001',
        testName: 'Total Cholesterol',
        value: 220,
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'High',
        category: 'Lipid Profile'
      },
      {
        id: 'LAB002',
        testName: 'HDL Cholesterol',
        value: 45,
        unit: 'mg/dL',
        referenceRange: '>40',
        status: 'Normal',
        category: 'Lipid Profile'
      },
      {
        id: 'LAB003',
        testName: 'LDL Cholesterol',
        value: 140,
        unit: 'mg/dL',
        referenceRange: '<100',
        status: 'High',
        category: 'Lipid Profile'
      },
      {
        id: 'LAB004',
        testName: 'Triglycerides',
        value: 175,
        unit: 'mg/dL',
        referenceRange: '<150',
        status: 'High',
        category: 'Lipid Profile'
      },
      {
        id: 'LAB005',
        testName: 'Fasting Glucose',
        value: 95,
        unit: 'mg/dL',
        referenceRange: '70-100',
        status: 'Normal',
        category: 'Diabetes'
      },
      {
        id: 'LAB006',
        testName: 'Hemoglobin A1C',
        value: 5.2,
        unit: '%',
        referenceRange: '<5.7',
        status: 'Normal',
        category: 'Diabetes'
      },
      {
        id: 'LAB007',
        testName: 'White Blood Cells',
        value: 7200,
        unit: '/μL',
        referenceRange: '4000-11000',
        status: 'Normal',
        category: 'Hematology'
      },
      {
        id: 'LAB008',
        testName: 'Red Blood Cells',
        value: 4.8,
        unit: 'million/μL',
        referenceRange: '4.2-5.4',
        status: 'Normal',
        category: 'Hematology'
      }
    ],
    imagingResults: [
      {
        id: 'IMG001',
        type: 'X-Ray',
        bodyPart: 'Chest',
        findings: 'Clear lung fields, normal heart size, no acute findings',
        impression: 'Normal chest X-ray',
        recommendations: ['Routine follow-up'],
        reportDate: '2024-12-15'
      },
      {
        id: 'IMG002',
        type: 'ECG',
        bodyPart: 'Heart',
        findings: 'Normal sinus rhythm, rate 72 bpm, normal axis, no ST changes',
        impression: 'Normal electrocardiogram',
        recommendations: ['Continue current lifestyle'],
        reportDate: '2024-12-15'
      }
    ],
    recommendations: [
      {
        id: 'REC001',
        type: 'Dietary',
        title: 'Reduce Cholesterol Intake',
        description: 'Limit saturated fats and increase fiber intake. Recommended daily cholesterol intake <300mg.',
        priority: 'High'
      },
      {
        id: 'REC002',
        type: 'Exercise',
        title: 'Increase Physical Activity',
        description: 'Aim for 150 minutes of moderate-intensity exercise per week to help lower cholesterol.',
        priority: 'High'
      },
      {
        id: 'REC003',
        type: 'Follow-up',
        title: 'Lipid Panel Recheck',
        description: 'Recheck lipid panel in 3 months to monitor cholesterol levels.',
        priority: 'Medium',
        dueDate: '2025-03-15'
      },
      {
        id: 'REC004',
        type: 'Lifestyle',
        title: 'Weight Management',
        description: 'Target weight loss of 10-15 pounds to achieve optimal BMI.',
        priority: 'Medium'
      }
    ],
    nextAppointment: {
      date: '2025-03-15',
      type: 'Follow-up - Lipid Management',
      doctor: 'Dr. Emily Rodriguez'
    },
    reportGeneratedDate: '2024-12-16',
    reportUrl: '/reports/EX001.pdf'
  },
  {
    id: 'EX002',
    patient: samplePatients[1],
    doctor: sampleDoctors[2],
    examinationDate: '2024-12-10',
    examinationType: 'Annual Physical Examination',
    status: 'Completed',
    overallAssessment: {
      summary: 'Excellent overall health with all parameters within normal limits. Patient maintains excellent fitness and health habits.',
      riskLevel: 'Low',
      healthScore: 95
    },
    vitalSigns: {
      bloodPressure: {
        systolic: 118,
        diastolic: 75,
        status: 'Normal'
      },
      heartRate: {
        value: 65,
        unit: 'bpm',
        status: 'Normal'
      },
      temperature: {
        value: 98.4,
        unit: '°F',
        status: 'Normal'
      },
      respiratoryRate: {
        value: 14,
        unit: 'breaths/min',
        status: 'Normal'
      },
      oxygenSaturation: {
        value: 99,
        unit: '%',
        status: 'Normal'
      }
    },
    physicalExamination: {
      height: { value: 5.5, unit: 'ft' },
      weight: { value: 130, unit: 'lbs' },
      bmi: { value: 21.6, status: 'Normal' },
      generalAppearance: 'Well-appearing adult female in excellent health',
      systemsReview: {
        cardiovascular: 'Regular rate and rhythm, no murmurs',
        respiratory: 'Clear to auscultation bilaterally',
        gastrointestinal: 'Soft, non-tender, normal bowel sounds',
        neurological: 'Alert and oriented, intact cranial nerves',
        musculoskeletal: 'Normal strength and range of motion'
      }
    },
    labResults: [
      {
        id: 'LAB009',
        testName: 'Total Cholesterol',
        value: 165,
        unit: 'mg/dL',
        referenceRange: '<200',
        status: 'Normal',
        category: 'Lipid Profile'
      },
      {
        id: 'LAB010',
        testName: 'HDL Cholesterol',
        value: 68,
        unit: 'mg/dL',
        referenceRange: '>50',
        status: 'Normal',
        category: 'Lipid Profile'
      },
      {
        id: 'LAB011',
        testName: 'Fasting Glucose',
        value: 88,
        unit: 'mg/dL',
        referenceRange: '70-100',
        status: 'Normal',
        category: 'Diabetes'
      },
      {
        id: 'LAB012',
        testName: 'Thyroid Stimulating Hormone',
        value: 2.1,
        unit: 'mIU/L',
        referenceRange: '0.4-4.0',
        status: 'Normal',
        category: 'Thyroid Function'
      }
    ],
    imagingResults: [
      {
        id: 'IMG003',
        type: 'Mammography',
        bodyPart: 'Breast',
        findings: 'No suspicious masses, calcifications, or architectural distortion',
        impression: 'Normal mammography screening',
        recommendations: ['Annual screening mammography'],
        reportDate: '2024-12-10'
      }
    ],
    recommendations: [
      {
        id: 'REC005',
        type: 'Follow-up',
        title: 'Annual Physical',
        description: 'Continue with annual physical examinations and preventive screenings.',
        priority: 'Low',
        dueDate: '2025-12-10'
      },
      {
        id: 'REC006',
        type: 'Lifestyle',
        title: 'Continue Current Health Habits',
        description: 'Maintain current excellent diet and exercise routine.',
        priority: 'Low'
      }
    ],
    nextAppointment: {
      date: '2025-12-10',
      type: 'Annual Physical Examination',
      doctor: 'Dr. Lisa Thompson'
    },
    reportGeneratedDate: '2024-12-11',
    reportUrl: '/reports/EX002.pdf'
  }
];

export const examinationSummaries: ExaminationSummary[] = medicalExaminations.map(exam => ({
  id: exam.id,
  patientName: `${exam.patient.firstName} ${exam.patient.lastName}`,
  examinationType: exam.examinationType,
  date: exam.examinationDate,
  status: exam.status,
  healthScore: exam.overallAssessment.healthScore,
  riskLevel: exam.overallAssessment.riskLevel,
  doctor: exam.doctor.name
}));