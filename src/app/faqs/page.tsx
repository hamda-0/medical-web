'use client'
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, ShieldQuestion } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { faqs } from '@/data/faqs.data';

const FAQs = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <PageHeader Icon={ShieldQuestion} title='Frequently Asked Questions' description='Find answers to common questions about our medical examination services' />

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden p-0">
              <CardContent className="p-0">
                <button
                  className="w-full text-left p-6 m-0 hover:bg-muted/50 transition-colors flex items-center justify-between"
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
