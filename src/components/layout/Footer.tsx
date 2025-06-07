import Link from 'next/link';
import React from 'react';
import Logo from '../common/Logo';
import { appName } from '@/constants/constants';

const AppFooter = () => {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="text-muted-foreground max-w-md">
              Providing quality healthcare services and medical examinations for individuals
              seeking employment or residency in Gulf Cooperation Council States.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="text-muted-foreground hover:text-primary transition-colors">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-muted-foreground hover:text-primary transition-colors">
                  Guidelines
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Contact Info</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Email: info@healthcare.com</li>
              <li>Phone: +971 4 123 4567</li>
              <li>Address: Dubai Healthcare City</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; 2024 {appName} Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
