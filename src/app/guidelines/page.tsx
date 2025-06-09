'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  Download,
  Search
} from 'lucide-react';
import { categoryColors, categoryIcons, guidelines } from '@/data/guidelines.data';
import PageHeader from '@/components/layout/PageHeader';
import SearchAndFilter from './_components/SearchAndFilter';

const Guidelines = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');





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