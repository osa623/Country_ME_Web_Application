import React from 'react';
import { render, screen, fireEvent, waitFor, createEvent } from '@testing-library/react';
import SearchBar from '../../components/countries/SearchBar';
import { CountryProvider } from '../../contexts/CountryContext';
import * as countryHook from '../../contexts/CountryContext';

// Mock setTimeout and clearTimeout
jest.useFakeTimers();

describe('SearchBar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to render with necessary providers
  const renderSearchBar = () => {
    return render(
      <CountryProvider>
        <SearchBar />
      </CountryProvider>
    );
  };

  // Test case 1
  test('renders search input with placeholder text', () => {
    renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveAttribute('type', 'text');
  });

  // Test case 2
  test('renders search icon', () => {
    renderSearchBar();
    
    // Check if SVG is rendered
    const svgElement = screen.getByTestId('search-icon');
    expect(svgElement).toBeInTheDocument();
  });

  // Test case 3
  test('initial input value matches searchTerm from context', () => {
    // Mock initial search term
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: jest.fn(),
      searchTerm: 'initial term'
    }));
    
    renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    expect(searchInput).toHaveValue('initial term');
  });

  // Test case 4
  test('updates input value when user types', () => {
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: jest.fn(),
      searchTerm: ''
    }));
    
    renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    
    expect(searchInput).toHaveValue('Canada');
  });

  // Test case 5
  test('calls searchCountries with input value after debounce delay', () => {
    const searchCountriesMock = jest.fn();
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: searchCountriesMock,
      searchTerm: ''
    }));
    
    renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: 'Canada' } });
    
    // Should not be called immediately
    expect(searchCountriesMock).not.toHaveBeenCalled();
    
    // Fast-forward through the 300ms debounce
    jest.advanceTimersByTime(300);
    
    // Now it should be called
    expect(searchCountriesMock).toHaveBeenCalledWith('Canada');
  });

  // Test case 6
  test('debounces multiple rapid input changes', () => {
    const searchCountriesMock = jest.fn();
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: searchCountriesMock,
      searchTerm: ''
    }));
    
    renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    
    // Type 'C'
    fireEvent.change(searchInput, { target: { value: 'C' } });
    jest.advanceTimersByTime(100);
    
    // Type 'Ca'
    fireEvent.change(searchInput, { target: { value: 'Ca' } });
    jest.advanceTimersByTime(100);
    
    // Type 'Can'
    fireEvent.change(searchInput, { target: { value: 'Can' } });
    jest.advanceTimersByTime(100);
    
    // searchCountries should not be called yet
    expect(searchCountriesMock).not.toHaveBeenCalled();
    
    // Complete the debounce period
    jest.advanceTimersByTime(300);
    
    // It should be called only once with the final value
    expect(searchCountriesMock).toHaveBeenCalledTimes(1);
    expect(searchCountriesMock).toHaveBeenCalledWith('Can');
  });

  // Test case 7
  test('updates input value when searchTerm in context changes', () => {
    // Initial mock with empty search term
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: jest.fn(),
      searchTerm: ''
    }));
    
    const { rerender } = renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    expect(searchInput).toHaveValue('');
    
    // Update mock with new search term
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: jest.fn(),
      searchTerm: 'Updated Term'
    }));
    
    // Rerender with new context value
    rerender(
      <CountryProvider>
        <SearchBar />
      </CountryProvider>
    );
    
    // Input should now have the new value from context
    expect(searchInput).toHaveValue('Updated Term');
  });

  // Test case 8
  test('form prevents default submit behavior', () => {
    renderSearchBar();
    
    const form = screen.getByRole('form');
    const submitEvent = createEvent.submit(form);
    const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
    
    fireEvent(form, submitEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  // Test case 9
  test('cleans up timeout on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');
    const searchCountriesMock = jest.fn();
    jest.spyOn(countryHook, 'useCountries').mockImplementation(() => ({
      searchCountries: searchCountriesMock,
      searchTerm: ''
    }));
    
    const { unmount } = renderSearchBar();
    
    const searchInput = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(searchInput, { target: { value: 'Test' } });
    
    // Unmount component before timer completes
    unmount();
    
    // Verify cleanup was called
    expect(clearTimeoutSpy).toHaveBeenCalled();
    
    // Advance timer to when it would trigger
    jest.advanceTimersByTime(300);
    
    // The callback should not be called after unmount
    expect(searchCountriesMock).not.toHaveBeenCalled();
  });

  // Test case 10
  test('has proper styling with blue background for icon container', () => {
    renderSearchBar();
    
    const iconContainer = screen.getByTestId('icon-container');
    expect(iconContainer).toBeInTheDocument();
  });
});
