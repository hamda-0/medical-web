import {  LucideIcon } from 'lucide-react';
import {
  Stethoscope,
  Users,
  ClipboardCheck,
  Award,
  Shield,
  CheckCircle,
  Settings,
  BookOpen,
  DollarSign,
  Package,
  AlertTriangle,
} from 'lucide-react';
export const guidelines = [
    {
      title: 'Medical Report',
      category: 'Medical Documentation',
      url: '/pdfs/medical-report.pdf',
      description: 'Standard medical report template for documentation'
    },
    {
      title: 'Medical examination form',
      category: 'Medical Documentation',
      url: '/pdfs/medical-exam-form.pdf',
      description: 'Comprehensive medical examination form'
    },
    {
      title: 'Complaint Form',
      category: 'Customer Service',
      url: '/pdfs/complaint-form.pdf',
      description: 'Official complaint submission form'
    },
    {
      title: 'Complaints form',
      category: 'Customer Service',
      url: '/pdfs/complaints-form.pdf',
      description: 'Alternative complaint form template'
    },
    {
      title: 'Components of Expatriate Medical Examinations',
      category: 'Medical Procedures',
      url: '/pdfs/components-expatriate.pdf',
      description: 'Detailed guide for expatriate medical procedures'
    },
    {
      title: 'Components of medical examinations',
      category: 'Medical Procedures',
      url: '/pdfs/components-medical.pdf',
      description: 'Standard medical examination components'
    },
    {
      title: 'Accreditation Criteria and Requirements',
      category: 'Accreditation',
      url: '/pdfs/accreditation-criteria.pdf',
      description: 'Complete accreditation criteria guidelines'
    },
    {
      title: 'Standards and requirements for accreditation',
      category: 'Accreditation',
      url: '/pdfs/accreditation-standards.pdf',
      description: 'Accreditation standards and requirements'
    },
    {
      title: 'Infection Control Guidelines',
      category: 'Safety & Prevention',
      url: '/pdfs/infection-control.pdf',
      description: 'Comprehensive infection control protocols'
    },
    {
      title: 'Criteria and conditions for infection control',
      category: 'Safety & Prevention',
      url: '/pdfs/infection-conditions.pdf',
      description: 'Infection control criteria and conditions'
    },
    {
      title: 'Evaluation Guide for New and Accredited Health Centers',
      category: 'Quality Assurance',
      url: '/pdfs/evaluation-guide.pdf',
      description: 'Health center evaluation guidelines'
    },
    {
      title: 'Evaluation Guide for New and Accredited Health Centers (copy)',
      category: 'Quality Assurance',
      url: '/pdfs/evaluation-guide-copy.pdf',
      description: 'Backup evaluation guide document'
    },
    {
      title: 'Authorization letter of medical center representative on WAFID platform',
      category: 'Authorization',
      url: '/pdfs/authorization-wafid.pdf',
      description: 'WAFID platform authorization letter'
    },
    {
      title: 'Authorization letter for a medical center representative',
      category: 'Authorization',
      url: '/pdfs/authorization-letter.pdf',
      description: 'Medical center representative authorization'
    },
    {
      title: 'Medical Unfitness Cases',
      category: 'Clinical Practice',
      url: '/pdfs/unfitness-cases.pdf',
      description: 'Guidelines for medical unfitness cases'
    },
    {
      title: 'Unfitness cases',
      category: 'Clinical Practice',
      url: '/pdfs/unfit-cases.pdf',
      description: 'Unfitness case documentation'
    },
    {
      title: 'WAFID Program Mechanism For Handling Complaints and Propositions',
      category: 'Customer Service',
      url: '/pdfs/wafid-mechanism.pdf',
      description: 'WAFID complaint handling mechanism'
    },
    {
      title: 'Mechanism for handling complaints and suggestions',
      category: 'Customer Service',
      url: '/pdfs/complaints-suggestions.pdf',
      description: 'Complaint and suggestion handling procedures'
    },
    {
      title: 'Unfit Cases Calculation Procedure',
      category: 'Clinical Practice',
      url: '/pdfs/unfit-calculation.pdf',
      description: 'Procedure for calculating unfit cases'
    },
    {
      title: 'Mechanism for calculating inappropriate cases',
      category: 'Clinical Practice',
      url: '/pdfs/inappropriate-cases.pdf',
      description: 'Inappropriate case calculation mechanism'
    },
    {
      title: 'Financial Rules and Regulations for WAFID Program',
      category: 'Finance',
      url: '/pdfs/financial-rules-wafid.pdf',
      description: 'WAFID program financial regulations'
    },
    {
      title: 'Financial rules and regulations for the Wafid Program',
      category: 'Finance',
      url: '/pdfs/financial-rules-wafid2.pdf',
      description: 'Comprehensive financial rules for WAFID'
    },
    {
      title: 'Accredited Centers Evaluation Form',
      category: 'Evaluation',
      url: '/pdfs/accredited-evaluation.pdf',
      description: 'Evaluation form for accredited centers'
    },
    {
      title: 'Accredited Centers Evaluation Form (copy)',
      category: 'Evaluation',
      url: '/pdfs/accredited-evaluation2.pdf',
      description: 'Backup accredited center evaluation form'
    },
    {
      title: 'New Centers Evaluation Form',
      category: 'Evaluation',
      url: '/pdfs/new-center-evaluation.pdf',
      description: 'Evaluation form for new centers'
    },
    {
      title: 'New Centers Evaluation Form (copy)',
      category: 'Evaluation',
      url: '/pdfs/new-center-evaluation2.pdf',
      description: 'Backup new center evaluation form'
    },
    {
      title: 'Guidelines for Safe Vaccine Storage',
      category: 'Storage',
      url: '/pdfs/vaccine-storage.pdf',
      description: 'Safe vaccine storage guidelines'
    },
    {
      title: 'Guidelines for storing and handling vaccines safely',
      category: 'Storage',
      url: '/pdfs/vaccine-handling.pdf',
      description: 'Vaccine handling and storage protocols'
    },
    {
      title: 'Violations and Penalties related to Wafid Program',
      category: 'Compliance',
      url: '/pdfs/wafid-violations.pdf',
      description: 'WAFID program violations and penalties'
    },
    {
      title: 'Violations and penalties related to the Wafid program',
      category: 'Compliance',
      url: '/pdfs/wafid-penalties.pdf',
      description: 'Comprehensive penalty guidelines'
    },
    {
      title: 'WAFID program Regulations of Expatriates Medical Examination',
      category: 'Regulations',
      url: '/pdfs/wafid-regulations.pdf',
      description: 'WAFID expatriate examination regulations'
    },
    {
      title: 'Regulations for the Wafid Program',
      category: 'Regulations',
      url: '/pdfs/wafid-regulations2.pdf',
      description: 'Complete WAFID program regulations'
    }
  ];

 export const categoryIcons: Record<string, LucideIcon> = {
    'Medical Documentation': Stethoscope,
    'Customer Service': Users,
    'Medical Procedures': ClipboardCheck,
    'Accreditation': Award,
    'Safety & Prevention': Shield,
    'Quality Assurance': CheckCircle,
    'Authorization': Settings,
    'Clinical Practice': BookOpen,
    'Finance': DollarSign,
    'Evaluation': ClipboardCheck,
    'Storage': Package,
    'Compliance': AlertTriangle,
    'Regulations': BookOpen,
    'All': BookOpen,
  };
  
 export const categoryColors: Record<string, string> = {
    'Medical Documentation': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700',
    'Customer Service': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700',
    'Medical Procedures': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700',
    'Accreditation': 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700',
    'Safety & Prevention': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700',
    'Quality Assurance': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700',
    'Authorization': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    'Clinical Practice': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700',
    'Finance': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700',
    'Evaluation': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700',
    'Storage': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700',
    'Compliance': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-700',
    'Regulations': 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-700',
    'All': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
  };