import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const CTASection = () => {
  return (
   <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied patients who trust our healthcare services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-appointment">
              <Button size="lg" variant="secondary">
                Book Your Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="dark:bg-primary dark:text-white dark:border-white text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}

export default CTASection
