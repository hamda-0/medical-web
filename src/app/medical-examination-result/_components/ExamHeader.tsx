import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MedicalExamination } from '@/types/medicalExamination.types';
import { Calendar, Download, Stethoscope } from 'lucide-react';

const ExamHeader = ({ exam, onDownload }: { exam: MedicalExamination, onDownload: () => void }) => (
  <Card>
    <CardHeader className="flex justify-between">
      <div>
        <CardTitle className="text-xl">{exam.examinationType}</CardTitle>
        <CardDescription className="space-y-1">
          <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(exam.examinationDate).toLocaleDateString()}</div>
          <div className="flex items-center gap-2"><Stethoscope className="h-4 w-4" />{exam.doctor.name}</div>
        </CardDescription>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onDownload}><Download className="h-4 w-4 mr-2" />Download</Button>
        <Badge>{exam.status}</Badge>
      </div>
    </CardHeader>
  </Card>
);

export default ExamHeader
