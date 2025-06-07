import { Alert, AlertDescription } from '@/components/ui/alert';
import { MedicalExamination } from '@/types/medicalExamination.types';
import { Clock } from 'lucide-react';
import React from 'react'

const NextAppointment = ({ exam }: { exam: MedicalExamination }) => (
  exam.nextAppointment && (
    <Alert>
      <Clock className="h-4 w-4" />
      <AlertDescription><strong>Next:</strong> {exam.nextAppointment.type} on {new Date(exam.nextAppointment.date).toLocaleDateString()}</AlertDescription>
    </Alert>
  )
);

export default NextAppointment
