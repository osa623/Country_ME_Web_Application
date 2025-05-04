import React from 'react';
import CountryCard from './CountryCard';
import { useCountries } from '../../contexts/CountryContext';

const CountryList = () => {
  const { filteredCountries, loading, error } = useCountries();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (filteredCountries.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl">No countries found matching your criteria</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {filteredCountries.map((country) => (
        <CountryCard key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default CountryList;
