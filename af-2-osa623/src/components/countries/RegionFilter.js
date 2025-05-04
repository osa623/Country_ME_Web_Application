import React from 'react';
import { useCountries } from '../../contexts/CountryContext';

const RegionFilter = () => {
  const { filterByRegion, selectedRegion } = useCountries();

  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  const handleChange = (e) => {
    filterByRegion(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={selectedRegion}
        onChange={handleChange}
        className="block w-full p-3 text-sm bg-white rounded-md shadow appearance-none cursor-pointer focus:outline-none"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default RegionFilter;
