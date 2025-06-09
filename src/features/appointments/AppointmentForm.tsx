'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { addAppointment } from '@/reducers/appointment/appointmentReducer';
import { useRouter } from 'next/navigation';
import { singleq } from '@/constants/constants';

interface AppointmentFormData {
  country: string;
  city: string;
  countryTravelingTo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  maritalStatus: string;
  passportNumber: string;
  confirmPassportNumber: string;
  passportIssueDate: string;
  passportIssuePlace: string;
  passportExpiryDate: string;
  visaType: string;
  email: string;
  phoneNumber: string;
  nationalID: string;
  positionAppliedFor: string;
  other: string;
  confirmInfo: boolean;
}

const AppointmentForm = () => {
  const dispatch = useDispatch();
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
      gender: '',
      maritalStatus: '',
      visaType: '',
      positionAppliedFor: '',
      other: '',
      confirmInfo: false,
    },
  });

  const onSubmit = async (data: AppointmentFormData) => {
    if (data.passportNumber !== data.confirmPassportNumber) {
      alert('Passport numbers do not match');
      return;
    }
    dispatch(addAppointment(data));
    toast.success('Appointment Booked Successfully!', {
      description: 'We will contact you soon to confirm your appointment.',
    });
    router.push('/');
  };

  const countries = [
    'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
    'India', 'Pakistan', 'Bangladesh', 'Philippines', 'Egypt', 'Other',
  ];

  const cities = {
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

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-sm border">
      <CardContent className="p-6 space-y-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <h3 className="text-lg font-semibold">Candidate{singleq}s information</h3>
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
                <Label htmlFor="lastName" className="text-sm text-muted-foreground">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  {...register('lastName', { required: 'Last name is required' })}
                  className="w-full"
                />
                {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-sm text-muted-foreground">Gender</Label>
                <Select
                  onValueChange={(value) => setValue('gender', value)}
                  value={watch('gender')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && <p className="text-sm text-destructive">{errors.gender.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus" className="text-sm text-muted-foreground">Marital Status</Label>
                <Select
                  onValueChange={(value) => setValue('maritalStatus', value)}
                  value={watch('maritalStatus')}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && <p className="text-sm text-destructive">{errors.maritalStatus.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber" className="text-sm text-muted-foreground">Passport number No</Label>
                <Input
                  id="passportNumber"
                  placeholder="Passport number"
                  {...register('passportNumber', { required: 'Passport number is required' })}
                  className="w-full"
                />
                {errors.passportNumber && <p className="text-sm text-destructive">{errors.passportNumber.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassportNumber" className="text-sm text-muted-foreground">Confirm Passport No</Label>
                <Input
                  id="confirmPassportNumber"
                  placeholder="Confirm passport number"
                  {...register('confirmPassportNumber', { required: 'Confirm passport number is required' })}
                  className="w-full"
                />
                {errors.confirmPassportNumber && <p className="text-sm text-destructive">{errors.confirmPassportNumber.message}</p>}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportIssuePlace" className="text-sm text-muted-foreground">Passport Issue Place</Label>
                <Input
                  id="passportIssuePlace"
                  placeholder="Passport issue place"
                  {...register('passportIssuePlace', { required: 'Passport issue place is required' })}
                  className="w-full"
                />
                {errors.passportIssuePlace && <p className="text-sm text-destructive">{errors.passportIssuePlace.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passportExpiryDate" className="text-sm text-muted-foreground">Passport Expiry Date</Label>
                <Input
                  id="passportExpiryDate"
                  type="date"
                  {...register('passportExpiryDate', { required: 'Passport expiry date is required' })}
                  className="w-full"
                />
                {errors.passportExpiryDate && <p className="text-sm text-destructive">{errors.passportExpiryDate.message}</p>}
              </div>

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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-muted-foreground">Email ID</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full"
                />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-sm text-muted-foreground">Phone No</Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="positionAppliedFor" className="text-sm text-muted-foreground">Position applied for</Label>
                <Input
                  id="positionAppliedFor"
                  placeholder="Position applied for"
                  {...register('positionAppliedFor')}
                  className="w-full"
                />
                {errors.positionAppliedFor && <p className="text-sm text-destructive">{errors.positionAppliedFor.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="other" className="text-sm text-muted-foreground">Other</Label>
                <Input
                  id="other"
                  placeholder="Other"
                  {...register('other')}
                  className="w-full"
                />
                {errors.other && <p className="text-sm text-destructive">{errors.other.message}</p>}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('confirmInfo', { required: 'You must confirm the information' })}
                className="h-4 w-4 text-primary"
              />
              <Label className="text-sm text-muted-foreground">
                I confirm that the information given in this form is true, complete and accurate
              </Label>
              {errors.confirmInfo && <p className="text-sm text-destructive">{errors.confirmInfo.message}</p>}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/')}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save And Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentForm;