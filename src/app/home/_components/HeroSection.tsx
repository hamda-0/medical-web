'use client'
import { Button } from '@/components/ui/button'
import { appName } from '@/constants/constants'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const HeroSection = () => {
  const isAuthenticated = false
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Hero images - replace with your actual image URLs
  const heroImages = [
    {
      src: "https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/online/PublishingImages/blog/health-care-economics.jpg&w=1200&h=630",
      alt: "Modern healthcare facility"
    },
    {
      src: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      alt: "Doctor consulting with patient"
    },
    {
      src: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      alt: "Medical technology and care"
    }
  ]

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight myfade-in fade-in-5">
                Welcome to 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                  {appName}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl leading-relaxed opacity-90 myfade-in fade-in-5">
                {isAuthenticated 
                  ? `Welcome back, ${'Hamda'}! Ready for your next appointment?`
                  : `${appName} is an individual seeking employment or residency in any of The Gulf Cooperation Council States.`
                }
              </p>
              
              <p className="text-lg opacity-80 myfade-in fade-in-5">
                We wish you good health and happiness.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 myfade-in fade-in-5">
              <Link href="/book-appointment">
                <Button size="lg" variant="secondary" className="text-primary hover:scale-105 transition-transform duration-200">
                  Book Appointment
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link href="/register">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white bg-transparent hover:bg-white hover:text-blue-700 transition-all duration-200 hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
              )}
            </div>

            {/* Image indicators for mobile */}
            <div className="flex justify-center space-x-2 lg:hidden">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right side - Image carousel (hidden on mobile) */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {heroImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentImageIndex 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-110'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                </div>
              ))}
              
              {/* Image overlay content */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {heroImages[currentImageIndex].alt}
                  </h3>
                  <div className="flex space-x-2">
                    {heroImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-300/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-10 w-4 h-4 bg-blue-300/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 left-10 w-6 h-6 bg-blue-200/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-500"></div>
    </section>
  )
}

export default HeroSection