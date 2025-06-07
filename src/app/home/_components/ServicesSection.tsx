import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {  MapPin, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const ServicesSection = () => {
  return (
     <section className="py-16 bg-background">
        <div className="container px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Medical Examinations Card */}
            <Card className="card-hover myfade-in fade-in-5">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Medical Examinations</CardTitle>
                <CardDescription className="text-base">
                  Book your health check-up appointment or view your test results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/book-appointment" className="flex-1">
                    <Button className="w-full">Book an Appointment</Button>
                  </Link>
                  <Link href="/medical-reports" className="flex-1">
                    <Button variant="outline" className="w-full">View Medical Reports</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Medical Centers Card */}
            <Card className="card-hover myfade-in fade-in-5">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Medical Centers</CardTitle>
                <CardDescription className="text-base">
                  Apply for medical centers accreditation or check your accreditation status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/medical-centers/apply" className="flex-1">
                    <Button className="w-full">Apply</Button>
                  </Link>
                  <Link href="/medical-centers" className="flex-1">
                    <Button variant="outline" className="w-full">Medical Centers List</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default ServicesSection
