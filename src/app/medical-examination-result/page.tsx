'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { medicalExaminations, examinationSummaries } from '../../data/medicalExamination.data';
import ExamList from './_components/ExamList';
import ExamHeader from './_components/ExamHeader';
import HealthSummary from './_components/HealthSummary';
import Assessment from './_components/Assessment';
import NextAppointment from './_components/NextAppointment';

const MedicalExaminationResults = () => {
  const [selectedExamination, setSelectedExamination] = useState(medicalExaminations[0]);
  const [activeTab, setActiveTab] = useState('overview');

  const handleDownload = () => {
    if (selectedExamination.reportUrl) window.open(selectedExamination.reportUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Medical Examination Results</h1>
        <p className="text-muted-foreground">View and manage your medical examination reports</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ExamList exams={examinationSummaries} selectedId={selectedExamination.id} onSelect={(id) => {
            const exam = medicalExaminations.find(e => e.id === id);
            if (exam) setSelectedExamination(exam);
          }} />
        </div>
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-6 w-full mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="vitals">Vitals</TabsTrigger>
              <TabsTrigger value="labs">Lab Results</TabsTrigger>
              <TabsTrigger value="imaging">Imaging</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="patient">Patient Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <ExamHeader exam={selectedExamination} onDownload={handleDownload} />
              <HealthSummary exam={selectedExamination} />
              <Assessment exam={selectedExamination} />
              <NextAppointment exam={selectedExamination} />
            </TabsContent>
            {/* Add other tabs as needed */}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MedicalExaminationResults;