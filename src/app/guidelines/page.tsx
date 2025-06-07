'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Download,
  Search,
  Stethoscope,
  Shield,
  Users,
  Award,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  ClipboardCheck,
  Package,
  BookOpen,
  Settings
} from 'lucide-react';
import { guidelines } from '@/data/guidelines.data';
import PageHeader from '@/components/layout/PageHeader';
import SearchAndFilter from './_components/SearchAndFilter';

const Guidelines = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');



  const categoryIcons = {
    'Medical Documentation': Stethoscope,
    'Customer Service': Users,
    'Medical Procedures': ClipboardCheck,
    'Accreditation': Award,
    'Safety & Prevention': Shield,
    'Quality Assurance': CheckCircle,
    'Authorization': Settings,
    'Clinical Practice': BookOpen,
    'Finance': DollarSign,
    'Evaluation': ClipboardCheck,
    'Storage': Package,
    'Compliance': AlertTriangle,
    'Regulations': BookOpen
  };

  const categoryColors = {
    'Medical Documentation': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-700',
    'Customer Service': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-700',
    'Medical Procedures': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-700',
    'Accreditation': 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700',
    'Safety & Prevention': 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-700',
    'Quality Assurance': 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-700',
    'Authorization': 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    'Clinical Practice': 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-700',
    'Finance': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-700',
    'Evaluation': 'bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-900/20 dark:text-cyan-300 dark:border-cyan-700',
    'Storage': 'bg-pink-50 text-pink-700 border-pink-200 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-700',
    'Compliance': 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-700',
    'Regulations': 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-700'
  };



  const filteredGuidelines = useMemo(() => {
    return guidelines.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const openPdf = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
     
      <div className="max-w-4xl mx-auto">
      <PageHeader Icon={FileText} title='Guidelines & Documentation' description='Access comprehensive medical guidelines and regulatory documents' />
        {/* Search and Filter */}
        <SearchAndFilter
          search={search}
          setSearch={setSearch}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          guidelines={guidelines}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-400">
            Showing {filteredGuidelines.length} of{' '}
            {guidelines.length} guidelines
            {search && (
              <span className="text-blue-600 dark:text-blue-400">
                {' '}for {search}
              </span>
            )}
          </p>
        </div>

        {/* Guidelines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
          {filteredGuidelines.map((item, index) => {
            const IconComponent = categoryIcons[item.category] || FileText;
            const colorClass = categoryColors[item.category] || 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600';

            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-slate-200 dark:border-gray-700">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
                      <IconComponent className="w-3 h-3" />
                      {item.category}
                    </span>
                    <FileText className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white leading-tight">
                    {item.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <button
                    onClick={() => openPdf(item.url)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    Open Document
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredGuidelines.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-gray-800 rounded-full mb-4">
              <Search className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              No guidelines found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search terms or selecting a different category
            </p>
            <button
              onClick={() => {
                setSearch('');
                setActiveCategory('All');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Guidelines;