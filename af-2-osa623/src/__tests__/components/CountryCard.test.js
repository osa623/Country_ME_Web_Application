import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../../components/countries/CountryCard';
import { AuthProvider } from '../../contexts/AuthContext';
import { FavoritesProvider } from '../../contexts/FavoritesContext';

describe('CountryCard Component', () => {
  const renderWithProviders = (country) => {
    return render(
      <AuthProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <CountryCard country={country} />
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    );
  };

  const mockCountry = {
    name: {
      common: 'Test Country',
      official: 'Official Test Country'
    },
    cca3: 'TST',
    flags: {
      png: 'test-flag.png',
      svg: 'test-flag.svg'
    },
    population: 1000000,
    region: 'Test Region',
    capital: ['Test Capital']
  };

  test('renders country name correctly', () => {
    renderWithProviders(mockCountry);
    // Use queryAllByText and get the first element since there are multiple elements
    // with the same text
    const countryNameElements = screen.queryAllByText(/Test Country/i);
    expect(countryNameElements.length).toBeGreaterThan(0);
    expect(countryNameElements[0]).toBeInTheDocument();
  });



  test('shows population', () => {
    renderWithProviders(mockCountry);
    const populationText = screen.getByText(/1,000,000/);
    expect(populationText).toBeInTheDocument();
  });

  test('shows region', () => {
    renderWithProviders(mockCountry);
    const regionText = screen.getByText(/Test Region/);
    expect(regionText).toBeInTheDocument();
  });

  test('shows capital', () => {
    renderWithProviders(mockCountry);
    const capitalText = screen.getByText(/Test Capital/);
    expect(capitalText).toBeInTheDocument();
  });

  test('links to the country detail page', () => {
    renderWithProviders(mockCountry);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/country/${mockCountry.cca3}`);
  });


});
