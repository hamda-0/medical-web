export const navigationLinks = [
    { href: '/', label: 'Home', type: 'link' as const },
    {
      label: 'Medical Examinations',
      type: 'dropdown' as const,
      items: [
        { 
          href: '/book-appointment', 
          label: 'Book an Appointment',
          description: 'Schedule your medical examination appointment'
        },
        { 
          href: '/search-slip', 
          // href: '/appointment-slots', 
          label: 'Appointment Slots',
          description: 'View available appointment time slots'
        },
        { 
          href: '/medical-examination-result', 
          label: 'Medical Examination Result',
          description: 'Check your examination results and reports'
        },
      ]
    },
    {
      label: 'Medical Centers',
      type: 'dropdown' as const,
      items: [
        { 
          href: '/medical-center-accreditation', 
          label: 'Medical Center Accreditation',
          description: 'Information about center accreditation process'
        },
        { 
          href: '/medical-centers', 
          label: 'Medical Centers List',
          description: 'Browse all accredited medical centers'
        },
      ]
    },
    { href: '/guidelines', label: 'Guidelines', type: 'link' as const },
    { href: '/faqs', label: 'FAQs', type: 'link' as const },
    { href: '/contact', label: 'Contact Us', type: 'link' as const },
  ];
