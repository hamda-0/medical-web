'use client';

import React, { useState } from 'react';
import { Search, FileText, User, Globe } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PageHeader from '@/components/layout/PageHeader';
import InfoCards from './_components/InfoCards';
import { nationalities } from '@/data/countries.data';
import { showToast } from '@/lib/toast';
import { Toaster } from '@/components/ui/sonner';

const AppointmentSlips = () => {
  const [passportNo, setPassportNo] = useState('');
  const [nationality, setNationality] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);



  const handleSearch = async () => {
    if (!passportNo.trim()) {
      showToast.error({ title: 'Please enter a passport number' });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast.success({ title: `Searching slip`, description: `${passportNo} (${nationality || 'No nationality selected'})` });
    }, 1500);
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <Toaster />
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <PageHeader Icon={FileText} title="Healthcare Appointment Slip" description="Search and retrieve your medical appointment details" />

        {/* Main Search Card */}
        <Card className="p-6 sm:p-8 rounded-3xl shadow-md">
          <CardHeader>
            <CardTitle>Search Appointment</CardTitle>
            <CardDescription>Enter your details to find your appointment slip.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Passport Number Field */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Passport Number
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={passportNo}
                  onChange={(e) => setPassportNo(e.target.value.toUpperCase())}
                  placeholder="Enter your passport number"
                  className="w-full text-lg"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Nationality Field */}
            <div className="space-y-2">
              <label className="flex items-center text-lg font-semibold">
                <Globe className="w-5 h-5 mr-2 text-purple-600" />
                Nationality
              </label>
              <Select onValueChange={setNationality} value={nationality}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nat) => (
                    <SelectItem key={nat} value={nat}>
                      {nat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <div className="pt-4 w-full">
              <Button
                size={'lg'}
                disabled={isLoading}
                onClick={handleSearch}
                className={`w-full transition-all duration-300 transform hover:scale-105 focus:scale-95 flex items-center justify-center space-x-3`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Search Appointment</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
          {/* info steps */}
          <InfoCards />
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-muted-foreground">
          <p className="flex items-center justify-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Secure • Fast • Reliable</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlips;