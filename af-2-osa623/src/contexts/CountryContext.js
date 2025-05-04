import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllCountries, getCountriesByRegion, getCountryByName } from '../services/api';

const CountryContext = createContext(null);

export const CountryProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Apply filters when search term, selected region, or selected language changes
    let result = [...countries];

    if (selectedRegion) {
      result = result.filter(
        country => country.region.toLowerCase() === selectedRegion.toLowerCase()
      );
    }

    if (selectedLanguage) {
      result = result.filter(country => {
        if (!country.languages) return false;
        return Object.values(country.languages).some(
          language => language.toLowerCase() === selectedLanguage.toLowerCase()
        );
      });
    }

    if (searchTerm) {
      result = result.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCountries(result);
  }, [searchTerm, selectedRegion, selectedLanguage, countries]);

  const searchCountries = (term) => {
    setSearchTerm(term);
  };

  const filterByRegion = async (region) => {
    setSelectedRegion(region);
    if (region === '') {
      setFilteredCountries(countries);
      return;
    }

    try {
      setLoading(true);
      const data = await getCountriesByRegion(region);
      setFilteredCountries(data);
    } catch (err) {
      setError(`Failed to fetch countries for region ${region}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterByLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const value = {
    countries,
    filteredCountries,
    loading,
    error,
    searchTerm,
    selectedRegion,
    selectedLanguage,
    searchCountries,
    filterByRegion,
    filterByLanguage,
  };

  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

export const useCountries = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useCountries must be used within a CountryProvider');
  }
  return context;
};
