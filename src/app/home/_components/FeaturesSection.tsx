import { Calendar, FileText, MapPin } from 'lucide-react'
import React from 'react'

const FeaturesSection = () => {
  return (
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive healthcare services with modern technology and professional care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center myfade-in fade-in-5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Scheduling</h3>
              <p className="text-muted-foreground">
                Book appointments online with our simple and intuitive booking system
              </p>
            </div>

            <div className="text-center myfade-in fade-in-5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Reports</h3>
              <p className="text-muted-foreground">
                Access your medical reports and test results securely online
              </p>
            </div>

            <div className="text-center myfade-in fade-in-5">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Locations</h3>
              <p className="text-muted-foreground">
                Find accredited medical centers across Gulf Cooperation Council States
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default FeaturesSection
