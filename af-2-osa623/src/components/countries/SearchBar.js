import React, { useState, useEffect } from 'react';
import { useCountries } from '../../contexts/CountryContext';

const SearchBar = () => {
  const { searchCountries, searchTerm } = useCountries();
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchCountries(inputValue);
    }, 300); // Add a debounce delay to avoid excessive calls

    return () => clearTimeout(delayDebounceFn); // Cleanup the timeout
  }, [inputValue, searchCountries]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="relative">
      <div className="flex items-center w-full overflow-hidden bg-white rounded-md shadow">
        <div className="flex items-center justify-center bg-blue-500 w-12 h-12 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search for a country..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-[12rem] py-3 ml-2 pl-0 pr-4 text-sm bg-transparent focus:outline-none"
        />
      </div>
    </form>
  );
};

export default SearchBar;
