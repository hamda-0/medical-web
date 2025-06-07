'use client';

import React from 'react';
import { Filter, LucideIcon } from 'lucide-react';
import {
  Stethoscope,
  Users,
  ClipboardCheck,
  Award,
  Shield,
  CheckCircle,
  Settings,
  BookOpen,
  DollarSign,
  Package,
  AlertTriangle,
} from 'lucide-react';

interface CategoryFiltersProps {
  categories: { name: string; count: number }[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const categoryIcons: Record<string, LucideIcon> = {
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
  'Regulations': BookOpen,
  'All': BookOpen, // Default icon for 'All'
};


const CategoryFilters: React.FC<CategoryFiltersProps> = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-slate-600 dark:text-slate-400" />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Filter by Category</span>
      </div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = activeCategory === category.name;
          const IconComponent = categoryIcons[category.name] || BookOpen;

          return (
            <button
              key={category.name}
              onClick={() => setActiveCategory(category.name)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white/60 dark:bg-gray-800/60 text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-gray-700/80 hover:text-slate-800 dark:hover:text-slate-100 border border-slate-200 dark:border-slate-600'
                }
              `}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
              <span className="bg-black/10 dark:bg-white/10 text-xs px-2 py-1 rounded-full">
                {category.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilters;