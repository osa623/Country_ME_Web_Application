// Import the axios mock directly
const axios = require('axios');
const apiModule = require('../../services/api');

// Destructure the api methods
const { getAllCountries, getCountryByName, getCountriesByRegion, getCountryByCode } = apiModule;

describe('API Service', () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test case 1: getAllCountries
  test('getAllCountries fetches countries from the API', async () => {
    // Mock data
    const mockCountries = [
      { name: { common: 'Germany' }, cca3: 'DEU' },
      { name: { common: 'France' }, cca3: 'FRA' }
    ];
    
    // Setup mock implementation
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    
    // Execute function
    const result = await getAllCountries();
    
    // Assertions
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/all');
    expect(result).toEqual(mockCountries);
  });

  // Test case 2: getCountryByName
  test('getCountryByName fetches a country by name', async () => {
    // Mock data
    const mockCountry = [{ name: { common: 'Germany' }, cca3: 'DEU' }];
    
    // Setup mock implementation
    axios.get.mockResolvedValueOnce({ data: mockCountry });
    
    // Execute function
    const result = await getCountryByName('Germany');
    
    // Assertions
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/name/Germany');
    expect(result).toEqual(mockCountry);
  });

  // Test case 3: getCountriesByRegion
  test('getCountriesByRegion fetches countries by region', async () => {
    // Mock data
    const mockCountries = [
      { name: { common: 'Germany' }, cca3: 'DEU', region: 'Europe' },
      { name: { common: 'France' }, cca3: 'FRA', region: 'Europe' }
    ];
    
    // Setup mock implementation
    axios.get.mockResolvedValueOnce({ data: mockCountries });
    
    // Execute function
    const result = await getCountriesByRegion('Europe');
    
    // Assertions
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/region/Europe');
    expect(result).toEqual(mockCountries);
  });

  // Test case 4: getCountryByCode
  test('getCountryByCode fetches a country by code', async () => {
    // Mock data
    const mockCountry = [{ name: { common: 'Germany' }, cca3: 'DEU' }];
    
    // Setup mock implementation
    axios.get.mockResolvedValueOnce({ data: mockCountry });
    
    // Execute function
    const result = await getCountryByCode('DEU');
    
    // Assertions
    expect(axios.get).toHaveBeenCalledWith('https://restcountries.com/v3.1/alpha/DEU');
    expect(result).toEqual(mockCountry);
  });

  // Test case 5: Error handling
  test('API service handles errors properly', async () => {
    // Setup mock implementation
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));
    
    // Execute function and expect error
    await expect(getAllCountries()).rejects.toThrow(errorMessage);
  });
});
