'use client'
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, ShieldQuestion } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the purpose of medical examinations for expatriates?",
      answer: "Medical examinations are mandatory for individuals seeking employment or residency in Gulf Cooperation Council States. These examinations ensure public health safety and detect communicable diseases."
    },
    {
      question: "How long does it take to get medical examination results?",
      answer: "Typically, medical examination results are available within 2-3 business days. However, some specialized tests may take longer. You will be notified once your results are ready."
    },
    {
      question: "What documents do I need to bring for my medical examination?",
      answer: "You need to bring a valid passport, visa copy (if applicable), passport-sized photographs, and any previous medical records that might be relevant to your examination."
    },
    {
      question: "Can I book an appointment online?",
      answer: "Yes, you can easily book your medical examination appointment online through our platform. Simply fill out the appointment form and select your preferred date and location."
    },
    {
      question: "What tests are included in the medical examination?",
      answer: "The standard examination includes blood tests, chest X-ray, general physical examination, and screening for infectious diseases. Additional tests may be required based on your destination country's requirements."
    },
    {
      question: "How much does a medical examination cost?",
      answer: "The cost varies depending on the type of examination and destination country requirements. Please contact your nearest medical center for specific pricing information."
    },
    {
      question: "What should I do if my medical examination results are positive for a condition?",
      answer: "If any condition is detected, you will be provided with detailed information and guidance on next steps. Our medical professionals will explain the results and available treatment options."
    },
    {
      question: "Can I retake the medical examination if needed?",
      answer: "Yes, you can retake the examination if required. The timeframe and conditions for retesting depend on the specific situation and destination country requirements."
    },
    {
      question: "How can I access my medical reports online?",
      answer: "Once your examination is complete, you can access your reports through our online portal using your registered email and the reference number provided during your visit."
    },
    {
      question: "Are the medical centers accredited?",
      answer: "Yes, all medical centers in our network are fully accredited and comply with international standards for medical examinations and healthcare services."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <PageHeader Icon={ShieldQuestion} title='Frequently Asked Questions' description='Find answers to common questions about our medical examination services' />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-6 hover:bg-muted/50 transition-colors flex items-center justify-between"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openFAQ === index && (
                  <div className="px-6 pb-6 border-t border-border">
                    <p className="text-muted-foreground pt-4 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">Still have questions?</h3>
              <p className="mb-4 opacity-90">
                Our support team is here to help you with any additional questions or concerns
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="mailto:support@healthcare.com"
                  className="px-6 py-2 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors"
                >
                  Email Support
                </a>
                <a
                  href="tel:+97141234567"
                  className="px-6 py-2 border border-white rounded-md hover:bg-white hover:text-primary transition-colors"
                >
                  Call Us
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
