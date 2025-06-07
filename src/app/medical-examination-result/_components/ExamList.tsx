import React from 'react'
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ExamList = ({ exams, selectedId, onSelect }: { exams: any[], selectedId: string, onSelect: (id: string) => void }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">Your Examinations</CardTitle>
      <CardDescription>Select an examination to view results</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      {exams.map((exam) => (
        <div
          key={exam.id}
          className={`p-3 rounded-lg border cursor-pointer ${selectedId === exam.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
          onClick={() => onSelect(exam.id)}
        >
          <div className="flex justify-between">
            <h3 className="font-medium text-sm">{exam.examinationType}</h3>
            <Badge variant="outline">{exam.status}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">{new Date(exam.date).toLocaleDateString()}</p>
          <div className="flex justify-between text-xs">
            <span>Score: {exam.healthScore}%</span>
            <Badge>{exam.riskLevel} Risk</Badge>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default ExamList
