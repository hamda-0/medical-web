'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { addAppointment } from '@/reducers/appointment/appointmentReducer';
import { useRouter } from 'next/navigation';

interface AppointmentFormData {
    firstName: string;
    lastName: string;
    email: string;
    nationality: string;
    country: string;
    city: string;
    appointmentDate: string;
}

const AppointmentForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<AppointmentFormData>();

    const onSubmit = async (data: AppointmentFormData) => {
        dispatch(addAppointment(data));

        toast("Appointment Booked Successfully!",
            {
                description: "We will contact you soon to confirm your appointment.",
            });

        router.push('/');
    };

    const countries = [
        'UAE', 'Saudi Arabia', 'Kuwait', 'Qatar', 'Bahrain', 'Oman',
        'India', 'Pakistan', 'Bangladesh', 'Philippines', 'Egypt', 'Other'
    ];

    const cities = {
        'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
        'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam', 'Mecca'],
        'Kuwait': ['Kuwait City', 'Hawalli', 'Ahmadi'],
        'Qatar': ['Doha', 'Al Rayyan', 'Umm Salal'],
        'Bahrain': ['Manama', 'Riffa', 'Muharraq'],
        'Oman': ['Muscat', 'Salalah', 'Nizwa'],
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Book Medical Examination</CardTitle>
                <CardDescription className="text-center">
                    Fill in your details to book a medical examination appointment
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Location Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Select onValueChange={(value) => setValue('country', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.country && (
                                    <p className="text-sm text-destructive">{errors.country.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">City</Label>
                                <Select onValueChange={(value) => setValue('city', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select city" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities['UAE']?.map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.city && (
                                    <p className="text-sm text-destructive">{errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="appointmentDate">Appointment Date</Label>
                                <Input
                                    id="appointmentDate"
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    {...register('appointmentDate', { required: 'Appointment date is required' })}
                                />
                                {errors.appointmentDate && (
                                    <p className="text-sm text-destructive">{errors.appointmentDate.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    placeholder="Enter first name"
                                    {...register('firstName', { required: 'First name is required' })}
                                />
                                {errors.firstName && (
                                    <p className="text-sm text-destructive">{errors.firstName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input
                                    id="lastName"
                                    placeholder="Enter last name"
                                    {...register('lastName', { required: 'Last name is required' })}
                                />
                                {errors.lastName && (
                                    <p className="text-sm text-destructive">{errors.lastName.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nationality">Nationality</Label>
                                <Select onValueChange={(value) => setValue('nationality', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select nationality" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countries.map((country) => (
                                            <SelectItem key={country} value={country}>
                                                {country}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.nationality && (
                                    <p className="text-sm text-destructive">{errors.nationality.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" className="flex-1" onClick={() => router.push('/')}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Book Appointment
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default AppointmentForm;