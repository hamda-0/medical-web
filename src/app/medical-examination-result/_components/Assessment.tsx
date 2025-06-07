import React from 'react'
import { Card,  CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalExamination } from '@/types/medicalExamination.types';

const Assessment = ({ exam }: { exam: MedicalExamination }) => (
  <Card>
    <CardHeader><CardTitle>Overall Assessment</CardTitle></CardHeader>
    <CardContent><p className="text-muted-foreground">{exam.overallAssessment.summary}</p></CardContent>
  </Card>
);

export default Assessment
