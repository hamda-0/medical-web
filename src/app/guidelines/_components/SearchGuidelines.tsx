'use client'
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React from 'react';

type Props = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchGuidelines = ({ search, setSearch }: Props) => {
  return (
    <div className="max-w-2xl mx-auto relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-slate-500 dark:text-slate-500" />
      </div>
      <Input
        type="text"
        placeholder="Search guidelines, categories, or descriptions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-12 pr-4 py-3 text-lg border-slate-200 dark:border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm dark:text-white"
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchGuidelines;
