'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, MapPin, Phone, Star, Users, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { medicalCenters, appointmentSlots, examTypes } from '@/data/appointment.data';
import { TimeSlot } from '@/types/appointment.types';

const AppointmentSlots = () => {
  const [selectedCenter, setSelectedCenter] = useState<string>(medicalCenters[0].id);
  const [selectedExamType, setSelectedExamType] = useState<string>(examTypes[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(appointmentSlots[0].date);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  const currentCenter = medicalCenters.find(center => center.id === selectedCenter);
  const currentExamType = examTypes.find(exam => exam.id === selectedExamType);
  const selectedDay = appointmentSlots.find(day => day.date === selectedDate);

  const handleSlotSelect = (slot: TimeSlot) => {
    if (slot.available && !slot.booked) {
      setSelectedSlot(slot);
    }
  };

  const handleBookAppointment = () => {
    if (selectedSlot && currentCenter && currentExamType) {
      alert(`Appointment booked!\n\nCenter: ${currentCenter.name}\nExam: ${currentExamType.name}\nDate: ${selectedDay?.dayName}\nTime: ${selectedSlot.time}`);
      // Here you would typically make an API call to book the appointment
    }
  };

  const getSlotStatusIcon = (slot: TimeSlot) => {
    if (!slot.available) return <XCircle className="h-4 w-4 text-red-500" />;
    if (slot.booked) return <AlertCircle className="h-4 w-4 text-orange-500" />;
    return <CheckCircle2 className="h-4 w-4 text-green-500" />;
  };

  const getSlotStatusText = (slot: TimeSlot) => {
    if (!slot.available) return "Unavailable";
    if (slot.booked) return "Booked";
    return "Available";
  };

  const getSlotButtonVariant = (slot: TimeSlot) => {
    if (!slot.available) return "secondary";
    if (slot.booked) return "secondary";
    if (selectedSlot?.id === slot.id) return "default";
    return "outline";
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Available Slots</h1>
        <p className="text-muted-foreground">Select your preferred medical center, examination type, and time slot</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Selection Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Medical Center Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Select Medical Center
              </CardTitle>
              <CardDescription>Choose your preferred medical center</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {medicalCenters.map((center) => (
                  <div
                    key={center.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCenter === center.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedCenter(center.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{center.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{center.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{center.address}</p>
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      {center.phone}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {center.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Examination Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Examination Type
              </CardTitle>
              <CardDescription>Choose the type of medical examination</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select examination type" />
                </SelectTrigger>
                <SelectContent>
                  {examTypes.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      <div className="flex justify-between items-center w-full">
                        <div>
                          <div className="font-medium">{exam.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {exam.duration} • {exam.price}
                          </div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {currentExamType && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium mb-2">{currentExamType.name}</h4>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {currentExamType.duration}
                    </span>
                    <span className="font-medium text-foreground">{currentExamType.price}</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Date Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Date
              </CardTitle>
              <CardDescription>Choose your preferred appointment date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {appointmentSlots.slice(0, 8).map((day) => (
                  <Button
                    key={day.date}
                    variant={selectedDate === day.date ? "default" : "outline"}
                    className="h-auto p-3 flex flex-col items-center"
                    onClick={() => setSelectedDate(day.date)}
                  >
                    <div className="text-sm font-medium">{day.dayName}</div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Slots */}
          {selectedDay && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Available Time Slots
                </CardTitle>
                <CardDescription>
                  Select your preferred time slot for {selectedDay.dayName}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {selectedDay.timeSlots.map((slot) => (
                    <Button
                      key={slot.id}
                      variant={getSlotButtonVariant(slot)}
                      size="sm"
                      className="h-auto p-3 flex flex-col items-center gap-1"
                      disabled={!slot.available || slot.booked}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <span className="text-sm font-medium">{slot.time}</span>
                      <div className="flex items-center gap-1">
                        {getSlotStatusIcon(slot)}
                        <span className="text-xs">{getSlotStatusText(slot)}</span>
                      </div>
                    </Button>
                  ))}
                </div>
                
                <div className="mt-4 flex gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Unavailable</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your appointment details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentCenter && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Medical Center</h4>
                  <p className="font-medium">{currentCenter.name}</p>
                  <p className="text-sm text-muted-foreground">{currentCenter.address}</p>
                </div>
              )}

              {currentExamType && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Examination</h4>
                  <p className="font-medium">{currentExamType.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Duration: {currentExamType.duration}
                  </p>
                </div>
              )}

              {selectedDay && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Date</h4>
                  <p className="font-medium">{selectedDay.dayName}</p>
                </div>
              )}

              {selectedSlot && (
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Time</h4>
                  <p className="font-medium">{selectedSlot.time}</p>
                </div>
              )}

              {currentExamType && (
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount</span>
                    <span className="font-bold text-lg">{currentExamType.price}</span>
                  </div>
                </div>
              )}

              <Button 
                className="w-full"
                disabled={!selectedSlot}
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>

              {!selectedSlot && (
                <p className="text-sm text-muted-foreground text-center">
                  Please select a time slot to continue
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSlots;