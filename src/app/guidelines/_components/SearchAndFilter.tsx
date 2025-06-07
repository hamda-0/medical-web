'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Command, CommandInput } from '@/components/ui/command';
import {  Filter, BookOpen, FileText } from 'lucide-react';
import { categoryColors, categoryIcons } from '@/data/guidelines.data';

interface SearchAndFilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  guidelines: { title: string; category: string; url: string; description: string }[];
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ search, setSearch, activeCategory, setActiveCategory, guidelines }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categories = useMemo(() => ['All', ...new Set(guidelines.map(item => item.category))], [guidelines]);

  const filteredOptions = useMemo(() => {
    if (!search) return categories.map(cat => ({ type: 'category', name: cat, count: cat === 'All' ? guidelines.length : guidelines.filter(g => g.category === cat).length }));
    const lowerSearch = search.toLowerCase();
    const categoryMatches = categories
      .filter(cat => cat.toLowerCase().includes(lowerSearch))
      .map(cat => ({ type: 'category', name: cat, count: cat === 'All' ? guidelines.length : guidelines.filter(g => g.category === cat).length }));
    const guidelineMatches = guidelines
      .filter(item => item.title.toLowerCase().includes(lowerSearch) || item.description.toLowerCase().includes(lowerSearch))
      .map(item => ({ type: 'guideline', title: item.title, category: item.category }));
    return [...categoryMatches, ...guidelineMatches].slice(0, 5); // Limit to 5 suggestions
  }, [search, guidelines]);

  useEffect(() => {
    setIsOpen(search.length > 0);
  }, [search]);

  const handleSelect = (value: string, type: 'category' | 'guideline') => {
    if (type === 'category') {
      setActiveCategory(value);
      setSearch(''); // Clear search after selecting a category
    } else {
      setSearch(value); // Set search to guideline title for filtering
    }
    setIsOpen(false);
  };

  return (
    <div className="relative mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Filter className="size-5" />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Search & Filter</span>
      </div>
      <Command className="rounded-lg border border-slate-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Search guidelines, categories, or descriptions..."
          className="h-20 pr-4 text-base focus:border-blue-500 focus:ring-blue-500/20 dark:text-white"
          autoFocus={false}
          style={{ height: '5rem' }}
        />
                {isOpen && filteredOptions.length > 0 && (
          <div className="mt-1 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => {
              const IconComponent = option.type === 'category' ? categoryIcons[option.name] || BookOpen : categoryIcons[option.category] || FileText;
              const colorClass = option.type === 'category' ? categoryColors[option.name] || 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600' : categoryColors[option.category] || 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600';
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(option.type === 'category' ? option.name : option.title, option.type)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-gray-700 flex items-center gap-2"
                >
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
                    <IconComponent className="w-3 h-3" />
                    {option.type === 'category' ? `${option.name} (${option.count})` : option.title}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </Command>
    </div>
  );
};

export default SearchAndFilter;