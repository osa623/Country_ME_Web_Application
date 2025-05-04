import React, { useState, useEffect } from 'react';
import { useCountries } from '../../contexts/CountryContext';

const LanguageFilter = () => {
  const { countries, filterByLanguage, selectedLanguage } = useCountries();
  const [languages, setLanguages] = useState([]);

  // Extract unique languages from countries
  useEffect(() => {
    if (countries.length > 0) {
      const allLanguages = new Set();
      
      countries.forEach(country => {
        if (country.languages) {
          Object.values(country.languages).forEach(language => {
            allLanguages.add(language);
          });
        }
      });
      
      setLanguages(Array.from(allLanguages).sort());
    }
  }, [countries]);

  const handleChange = (e) => {
    filterByLanguage(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={selectedLanguage}
        onChange={handleChange}
        className="block w-full p-3 text-sm bg-white rounded-md shadow appearance-none cursor-pointer focus:outline-none"
      >
        <option value="">Filter by Language</option>
        {languages.map((language) => (
          <option key={language} value={language}>
            {language}
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

export default LanguageFilter;
