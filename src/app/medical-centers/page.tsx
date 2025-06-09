'use client';

import React, { useState } from 'react';
import MedicalCentersList from './_components/MedicalCentersList';
import SearchMedicalCenters from './_components/SearchMedicalCenters';
import { MedicalCenter } from '@/types/medicalCenters.types';
import { medicalCenters } from '@/data/medicalCenters.data';
import PageHeader from '@/components/layout/PageHeader';
import { Hospital } from 'lucide-react';

const MedicalCenters: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCenters, setFilteredCenters] = useState<MedicalCenter[]>(medicalCenters);
  const centersPerPage = 5;

  // Debug: Log filteredCenters and currentCenters
  console.log('Filtered Centers:', filteredCenters);
  console.log('Current Centers:', filteredCenters.slice(
    (currentPage - 1) * centersPerPage,
    currentPage * centersPerPage
  ));

  const indexOfLastCenter = currentPage * centersPerPage;
  const indexOfFirstCenter = indexOfLastCenter - centersPerPage;
  const currentCenters = filteredCenters.slice(indexOfFirstCenter, indexOfLastCenter);

  const handleSearch = (country: string, city: string, name: string) => {
    const filtered = medicalCenters.filter((center) => {
      const matchesCountry = country ? center.country.toLowerCase() === country.toLowerCase() : true;
      const matchesCity = city ? center.city.toLowerCase() === city.toLowerCase() : true;
      const matchesName = name ? center.name.toLowerCase().includes(name.toLowerCase()) : true;
      return matchesCountry && matchesCity && matchesName;
    });
    setFilteredCenters(filtered);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="container mx-auto p-4">
      <PageHeader title="Medical Centers" description="List of medical centers" Icon={Hospital} />
      <SearchMedicalCenters onSearch={handleSearch} />
      <MedicalCentersList medicalCenters={currentCenters} />
    </div>
  );
};

export default MedicalCenters;