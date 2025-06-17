"use client";

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import { showToast } from '@/lib/toast';

interface AppointmentFormData {
  country: string;
  city: string;
  countryTravelingTo: string;
  firstName: string;
  dateOfBirth: string;
  nationality: string;
  payUrl: string;
  passportNumber: string;
  passportIssueDate: string;
  visaType: string;
  phoneNumber: string;
  nationalID: string;
  confirmInfo: boolean;

}

const AppointmentForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    defaultValues: {
      country: '',
      city: '',
      countryTravelingTo: '',
      nationality: '',
      payUrl: '',
      visaType: '',
      confirmInfo: false,
    },
  });

  const countries = [
    'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
    'India', 'Pakistan', 'Bangladesh', 'Philippines', 'Egypt', 'Other',
  ];

  const cities: Record<string, string[]> = {
    'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
    'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca'],
    'Kuwait': ['Kuwait City', 'Hawalli', 'Ahmadi'],
    'Qatar': ['Doha', 'Al Rayyan', 'Umm Salal'],
    'Bahrain': ['Manama', 'Riffa', 'Muharraq'],
    'Oman': ['Muscat', 'Salalah', 'Nizwa'],
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai'],
    'Pakistan': ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'],
    'Bangladesh': ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna'],
    'Philippines': ['Manila', 'Quezon City', 'Cebu City', 'Davao City'],
    'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Luxor'],
  };

  const selectedCountry = watch('country');
  useEffect(() => {
    setValue('city', ''); // Reset city when country changes
  }, [selectedCountry, setValue]);

  const generatePDF = (data: AppointmentFormData) => {
    const doc = new jsPDF();

    // Set up the document
    doc.setFontSize(20);
    doc.text('Visa Appointment Application', 20, 30);

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Location Information
    doc.setFontSize(14);
    doc.setFont('serif', 'bold');
    doc.text('Location Information', 20, 50);

    doc.setFont('serif', 'normal');
    doc.setFontSize(12);
    doc.text(`Country: ${data.country}`, 20, 60);
    doc.text(`City: ${data.city}`, 20, 70);
    doc.text(`Country Traveling To: ${data.countryTravelingTo}`, 20, 80);

    // Personal Information
    doc.setFont('serif', 'bold');
    doc.setFontSize(14);
    doc.text('Personal Information', 20, 100);

    doc.setFont('serif', 'normal');
    doc.setFontSize(12);
    doc.text(`Full Name: ${data.firstName}`, 20, 110);
    doc.text(`Date of Birth: ${data.dateOfBirth}`, 20, 120);
    doc.text(`Nationality: ${data.nationality}`, 20, 130);
    doc.text(`Payment Url: ${data.payUrl}`, 20, 140);

    // Document Information
    doc.setFont('serif', 'bold');
    doc.setFontSize(14);
    doc.text('Document Information', 20, 160);

    doc.setFont('serif', 'normal');
    doc.setFontSize(12);
    doc.text(`Passport Number: ${data.passportNumber}`, 20, 170);
    doc.text(`Passport Issue Date: ${data.passportIssueDate}`, 20, 180);
    doc.text(`National ID: ${data.nationalID}`, 20, 190);

    // Visa Information
    doc.setFont('serif', 'bold');
    doc.setFontSize(14);
    doc.text('Visa Information', 20, 210);

    doc.setFont('serif', 'normal');
    doc.setFontSize(12);
    doc.text(`Visa Type: ${data.visaType}`, 20, 220);
    doc.text(`Phone Number: ${data.phoneNumber}`, 20, 230);

    // Footer
    doc.setFontSize(10);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 270);
    doc.text('I confirm that the information given in this form is true, complete, and accurate', 20, 280);

    // Save the PDF
    const fileName = `visa_application_${data.firstName}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  };

  const onSubmit = (data: AppointmentFormData) => {
    try {
      // Generate PDF
      generatePDF(data);

      // You can also save the data to your backend here
      console.log('Form data:', data);

      // Show success message or redirect
      alert('PDF generated successfully! Your application has been saved.');

      // Optionally navigate to next page
      // router.push('/confirmation');

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('There was an error generating the PDF. Please try again.');
    }
  };

  const downloadPDF = () => {
    const formData = watch();

    // Check if required fields are filled
    const requiredFields = ['firstName', 'dateOfBirth', 'nationality', 'gender', 'passportNumber', 'passportIssueDate', 'visaType', 'phoneNumber', 'nationalID'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof AppointmentFormData]);

    if (missingFields.length > 0) {
      showToast.error({
        title: 'Error',
        description: `Please fill in the following fields: ${missingFields.join(', ')}`
      });
      
      return;
    }

    if (!formData.confirmInfo) {
      showToast.error({
        title: 'Error',
        description: 'Please confirm that the information given is true, complete, and accurate'
      });
      return;
    }

    generatePDF(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border">
      <CardContent className="p-6 space-y-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Location Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm text-muted-foreground">Country</Label>
                <Select
                  onValueChange={(value) => setValue('country', value)}
                  value={selectedCountry}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm text-muted-foreground">City</Label>
                <Select
                  onValueChange={(value) => setValue('city', value)}
                  value={watch('city')}
                  disabled={!selectedCountry}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCountry && cities[selectedCountry]?.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="countryTravelingTo" className="text-sm text-muted-foreground">Country Traveling To</Label>
                <Select
                  onValueChange={(value) => setValue('countryTravelingTo', value)}
                  value={watch('countryTravelingTo')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select GCC country" />
                  </SelectTrigger>
                  <SelectContent>
                    {['UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'].map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Candidate's Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Candidate&#39;s Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm text-muted-foreground">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  {...register('firstName', { required: 'First name is required' })}
                  className="w-full"
                />
                {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm text-muted-foreground">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register('dateOfBirth', { required: 'Date of birth is required' })}
                  className="w-full"
                />
                {errors.dateOfBirth && <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-sm text-muted-foreground">Nationality</Label>
                <Select
                  onValueChange={(value) => setValue('nationality', value)}
                  value={watch('nationality')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Nationality" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.nationality && <p className="text-sm text-destructive">{errors.nationality.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div className="space-y-2">
                <Label htmlFor="passportNumber" className="text-sm text-muted-foreground">Passport Number</Label>
                <Input
                  id="passportNumber"
                  placeholder="Passport number"
                  {...register('passportNumber', { required: 'Passport number is required' })}
                  className="w-full"
                />
                {errors.passportNumber && <p className="text-sm text-destructive">{errors.passportNumber.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passportIssueDate" className="text-sm text-muted-foreground">Passport Issue Date</Label>
                <Input
                  id="passportIssueDate"
                  type="date"
                  {...register('passportIssueDate', { required: 'Passport issue date is required' })}
                  className="w-full"
                />
                {errors.passportIssueDate && <p className="text-sm text-destructive">{errors.passportIssueDate.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="payUrl" className="text-sm text-muted-foreground">Payment Url</Label>
                <Input
                  id="payUrl" type='url'
                  placeholder="Passport number"
                  {...register('payUrl', { required: 'Passport number is required' })}
                  className="w-full"
                />
                {errors.payUrl && <p className="text-sm text-destructive">{errors.payUrl.message}</p>}
              </div>
             
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="visaType" className="text-sm text-muted-foreground">Visa Type</Label>
                <Select
                  onValueChange={(value) => setValue('visaType', value)}
                  value={watch('visaType')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Visa Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Family Visa">Family Visa</SelectItem>
                    <SelectItem value="Work Visa">Work Visa</SelectItem>
                    <SelectItem value="Tourist Visa">Tourist Visa</SelectItem>
                    <SelectItem value="Student Visa">Student Visa</SelectItem>
                  </SelectContent>
                </Select>
                {errors.visaType && <p className="text-sm text-destructive">{errors.visaType.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm text-muted-foreground">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  placeholder="Phone number"
                  {...register('phoneNumber', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^\+?\d{10,15}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                  className="w-full"
                />
                {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nationalID" className="text-sm text-muted-foreground">National ID</Label>
                <Input
                  id="nationalID"
                  placeholder="National ID"
                  {...register('nationalID', { required: 'National ID is required' })}
                  className="w-full"
                />
                {errors.nationalID && <p className="text-sm text-destructive">{errors.nationalID.message}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('confirmInfo', { required: 'You must confirm the information' })}
                className="h-4 w-4 text-primary"
              />
              <Label className="text-sm text-muted-foreground">
                I confirm that the information given in this form is true, complete, and accurate
              </Label>
              {errors.confirmInfo && <p className="text-sm text-destructive">{errors.confirmInfo.message}</p>}
            </div>
          </div>

          <div className="flex items-end justify-end gap-4 pt-6">
            <Button type="button" variant="outline" onClick={() => router.push('/')}>
              Cancel
            </Button>
            <Button type="button" variant="secondary" onClick={downloadPDF}>
              Download PDF
            </Button>
            <Button type="submit">
              Save and Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;