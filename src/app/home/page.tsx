import React from "react";
import HeroSection from "@/app/home/_components/HeroSection";
import ServicesSection from "./_components/ServicesSection";
import FeaturesSection from "./_components/FeaturesSection";
import CTASection from "./_components/CTA";

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Each section gets full width but content is centered */}
      <HeroSection />
      <ServicesSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default HomePage;