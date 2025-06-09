'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { medicalCenters } from '@/data/medicalCenters.data';

interface SearchMedicalCentersProps {
  onSearch: (country: string, city: string, name: string) => void;
}

const SearchMedicalCenters: React.FC<SearchMedicalCentersProps> = ({ onSearch }) => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  // Derive unique countries and cities from medicalCenters data
  useEffect(() => {
    const uniqueCountries = [...new Set(medicalCenters.map((center) => center.country))];
    setCountries(uniqueCountries);

    if (country) {
      const uniqueCities = [
        ...new Set(medicalCenters.filter((center) => center.country === country).map((center) => center.city)),
      ];
      setCities(uniqueCities);
    } else {
      setCities([]);
    }
  }, [country]);

  const handleSearch = () => {
    onSearch(country, city, name);
  };

  return (
    <div className="mb-4 p-4 bg-card rounded-lg shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select onValueChange={setCountry} value={country}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='countries' >All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={setCity} value={city} disabled={!country}>
          <SelectTrigger className="w-full h-12">
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='cities' >All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="Enter Medical Center Name" className=''
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" className='w-full'
         onClick={() => {
          setName('');
          setCountry('');
          setCity('')
        }}>
        Reset
      </Button>
      <Button className='w-full' onClick={handleSearch}>Search</Button>
    </div>
    </div >
  );
};

export default SearchMedicalCenters;