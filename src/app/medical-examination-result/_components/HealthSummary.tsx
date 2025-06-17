import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Card,  CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalExamination } from '@/types/medicalExamination.types';
import { Progress } from '@radix-ui/react-progress';
import { Activity, Stethoscope } from 'lucide-react';

const HealthSummary = ({ exam }: { exam: MedicalExamination }) => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5 text-red-500" />Health Score</CardTitle></CardHeader>
      <CardContent className="text-center space-y-4">
        <div className="text-4xl font-bold text-green-600">{exam.overallAssessment.healthScore}%</div>
        <Progress value={exam.overallAssessment.healthScore} />
        <Badge className="w-full justify-center bg-green-100 text-green-600">{exam.overallAssessment.riskLevel} Risk</Badge>
      </CardContent>
    </Card>
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-blue-500" />Key Metrics</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between"><span>Blood Pressure</span><Badge>{exam.vitalSigns.bloodPressure.systolic}/{exam.vitalSigns.bloodPressure.diastolic}</Badge></div>
        <div className="flex justify-between"><span>BMI</span><Badge>{exam.physicalExamination.bmi.value}</Badge></div>
        <div className="flex justify-between"><span>Abnormal Labs</span><Badge variant="destructive">0</Badge></div>
      </CardContent>
    </Card>
  </div>
);

export default HealthSummary
