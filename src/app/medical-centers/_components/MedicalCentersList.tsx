'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { MedicalCenter } from '@/types/medicalCenters.types';
import { medicalCenters } from '@/data/medicalCenters.data';

interface MedicalCentersListProps {
  medicalCenters: MedicalCenter[];
}

// Define the sort configuration type
interface SortConfig {
  key: keyof MedicalCenter;
  direction: 'asc' | 'desc';
}

// Define country flags with an index signature
const countryFlags: Record<string, string> = {
  'India': '🇮🇳',
  'Bangladesh': '🇧🇩',
  'Ethiopia': '🇪🇹',
  'Pakistan': '🇵🇰',
};

const MedicalCentersList: React.FC<MedicalCentersListProps> = () => {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Debug: Log initialCenters to check if data is received
  console.log('Initial Centers in MedicalCentersList:', medicalCenters);

  const getFlag = (country: string): string => countryFlags[country] || '🌐';

  const sortedCenters = useMemo(() => {
    if (!medicalCenters || medicalCenters.length === 0) {
      console.log('No data in medicalCenters');
      return [];
    }

    if (!sortConfig) return [...medicalCenters];

    return [...medicalCenters].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      // Debug: Log values being compared
      console.log(`Comparing ${sortConfig.key}:`, { valueA, valueB });

      if (valueA == null || valueB == null) return 0;

      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  const paginatedCenters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    console.log('Pagination in MedicalCentersList:', { startIndex, endIndex, sortedCentersLength: sortedCenters.length });
    return sortedCenters.slice(startIndex, endIndex);
  }, [sortedCenters, currentPage]);

  const totalPages = Math.ceil(sortedCenters.length / itemsPerPage);

  const requestSort = (key: keyof MedicalCenter) => {
    setSortConfig((prev) => {
      if (!prev || (prev.key === key && prev.direction === 'asc')) {
        return { key, direction: 'desc' };
      }
      return { key, direction: 'asc' };
    });
  };

  const renderSortIcon = (key: keyof MedicalCenter) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    );
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={i} className="text-gray-300">★</span>);
    }

    return (
      <div className="flex items-center space-x-1">
        <div className="flex">{stars}</div>
        <span className="text-sm text-gray-600 ml-2">{rating}</span>
      </div>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      {/* Table Container */}
      <div className="relative">
        {/* Sticky Header */}
        <div className="bg-blue-500 text-white sticky top-0 z-10">
          <div className="grid grid-cols-9 gap-4 px-6 py-4 text-sm font-semibold">
            {['name', 'country', 'city', 'addressLine1', 'phone', 'email', 'website', 'rating', 'workingHours'].map((key) => (
              <div
                key={key}
                className="cursor-pointer hover:bg-blue-700 rounded px-2 py-2 flex items-center justify-between transition-colors"
                onClick={() => requestSort(key as keyof MedicalCenter)}
              >
                <span>
                  {key === 'name' ? 'Medical Center' :
                    key === 'addressLine1' ? 'Address' :
                    key === 'workingHours' ? 'Hours' : key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                {renderSortIcon(key as keyof MedicalCenter)}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
          {paginatedCenters.length === 0 ? (
            <div className="text-center text-gray-500 p-4">No data available</div>
          ) : (
            paginatedCenters.map((center, index) => (
              <div
                key={center.id}
                className={`grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}
              >
                <div className="font-semibold text-gray-800 hover:text-blue-700 transition-colors">{center.name}</div>
                <div className="flex items-center space-x-2 text-gray-700">{getFlag(center.country)} {center.country}</div>
                <div className="text-gray-700">{center.city}</div>
                <div className="text-gray-600 text-sm">
                  <div>{center.addressLine1}</div>
                  {center.addressLine2 && <div className="text-gray-500">{center.addressLine2}</div>}
                </div>
                <div className="text-gray-700 font-mono text-sm">{center.phone}</div>
                <div className="text-blue-600 hover:text-blue-800 text-sm break-all">{center.email}</div>
                <div className="text-sm">
                  {center.website ? (
                    <a href={`https://${center.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                      {center.website}
                    </a>
                  ) : <span className="text-gray-400">—</span>}
                </div>
                <div>{renderStars(center.rating)}</div>
                <div className="text-sm text-gray-600 font-medium">{center.workingHours || '—'}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Fixed Pagination Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedCenters.length)} of {sortedCenters.length} entries
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalCentersList;