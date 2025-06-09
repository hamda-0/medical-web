'use client';

import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { MedicalCenter } from '@/types/medicalCenters.types';
import { medicalCenters } from '@/data/medicalCenters.data';

interface MedicalCentersListProps {
  medicalCenters: MedicalCenter[];
}

const MedicalCentersList: React.FC<MedicalCentersListProps> = () => {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Country flag mapping
  const countryFlags = {
    'India': '🇮🇳',
    'Bangladesh': '🇧🇩',
    'Ethiopia': '🇪🇹',
    'Pakistan': '🇵🇰',
  };

  const getFlag = (country: string) => countryFlags[country] || '🌐';

  const sortedCenters = useMemo(() => {
    if (!sortConfig) return medicalCenters;

    return [...medicalCenters].sort((a, b) => {
      if (a[sortConfig] < b[sortConfig]) return sortConfig === 'asc' ? -1 : 1;
      if (a[sortConfig] > b[sortConfig]) return sortConfig === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig]);

  const paginatedCenters = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCenters.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCenters, currentPage]);

  const totalPages = Math.ceil(sortedCenters.length / itemsPerPage);

  const requestSort= (key) => {
    setSortConfig((prev) =>
      prev && prev.key === key && prev.direction === 'asc'
        ? { key, direction: 'desc' }
        : { key, direction: 'asc' }
    );
  };

  const renderSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig === 'asc'
      ? <ChevronUp className="ml-1 h-4 w-4" />
      : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  const renderStars = (rating) => {
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
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #e5e7eb;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {s
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d1d5dc;
        }
      `}</style>

      {/* Table Container */}
      <div className="relative">
        {/* Sticky Header */}
        <div className="bg-primary  text-white sticky top-0 z-10">
          <div className="grid grid-cols-9 gap-4 px-6 py-4 text-sm font-semibold">
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('name')}
            >
              <span>Medical Center</span>
              {renderSortIcon('name')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('country')}
            >
              <span>Country</span>
              {renderSortIcon('country')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('city')}
            >
              <span>City</span>
              {renderSortIcon('city')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('addressLine1')}
            >
              <span>Address</span>
              {renderSortIcon('addressLine1')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('phone')}
            >
              <span>Phone</span>
              {renderSortIcon('phone')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('email')}
            >
              <span>Email</span>
              {renderSortIcon('email')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('website')}
            >
              <span>Website</span>
              {renderSortIcon('website')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('rating')}
            >
              <span>Rating</span>
              {renderSortIcon('rating')}
            </div>
            <div
              className="cursor-pointer hover:bg-white/10 rounded px-2 py-1 flex items-center justify-between transition-colors"
              onClick={() => requestSort('workingHours')}
            >
              <span>Hours</span>
              {renderSortIcon('workingHours')}
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-screen overflow-y-auto custom-scrollbar">
          {paginatedCenters.map((center, index) => (
            <div
              key={center.id}
              className={`grid grid-cols-9 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 group ${index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                }`}
            >
              <div className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                {center.name}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{getFlag(center.country)}</span>
                <span className="text-gray-700">{center.country}</span>
              </div>
              <div className="text-gray-700">{center.city}</div>
              <div className="text-gray-600 text-sm">
                <div>{center.addressLine1}</div>
                {center.addressLine2 && <div className="text-gray-500">{center.addressLine2}</div>}
              </div>
              <div className="text-gray-700 font-mono text-sm">{center.phone}</div>
              <div className="text-blue-600 hover:text-blue-800 text-sm break-all">
                {center.email}
              </div>
              <div className="text-sm">
                {center.website ? (
                  <a
                    href={`https://${center.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {center.website}
                  </a>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </div>
              <div>{renderStars(center.rating)}</div>
              <div className="text-sm text-gray-600 font-medium">
                {center.workingHours || '—'}
              </div>
            </div>
          ))}
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
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                  ? 'bg-primary text-white shadow-sm'
                  : 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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