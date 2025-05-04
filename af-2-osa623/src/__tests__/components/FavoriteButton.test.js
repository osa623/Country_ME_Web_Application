import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import FavoriteButton from '../../components/countries/FavoriteButton';
import { FavoritesProvider } from '../../contexts/FavoritesContext';
import { AuthProvider } from '../../contexts/AuthContext';
import * as favoritesHook from '../../contexts/FavoritesContext';

// Mock user
jest.mock('../../services/auth', () => ({
  getCurrentUser: jest.fn(() => ({ id: 'user1', name: 'Test User' })),
}));

// Sample country for testing
const mockCountry = {
  name: { common: 'Test Country' },
  cca3: 'TST',
  flags: { png: 'test-flag.png' }
};

describe('FavoriteButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  // Helper function to render with providers
  const renderWithProviders = (country) => {
    return render(
      <AuthProvider>
        <FavoritesProvider>
          <FavoriteButton country={country} />
        </FavoritesProvider>
      </AuthProvider>
    );
  };



  // Test case 2
  test('renders with favorited state when country is in favorites', () => {
    // Mock localStorage with existing favorite
    localStorage.setItem('favorites-user1', JSON.stringify([mockCountry]));
    
    renderWithProviders(mockCountry);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Remove from favorites');
    
    // SVG should be filled
    const svg = within(button).getByRole('img', { hidden: true });
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  // Test case 3
  test('adds country to favorites when clicked in non-favorited state', () => {
    // Spy on useFavorites to track calls
    const addFavoriteMock = jest.fn();
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => false,
      addFavorite: addFavoriteMock,
      removeFavorite: jest.fn()
    }));
    
    renderWithProviders(mockCountry);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(addFavoriteMock).toHaveBeenCalledWith(mockCountry);
  });

  // Test case 4
  test('removes country from favorites when clicked in favorited state', () => {
    // Spy on useFavorites to track calls
    const removeFavoriteMock = jest.fn();
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => true,
      addFavorite: jest.fn(),
      removeFavorite: removeFavoriteMock
    }));
    
    renderWithProviders(mockCountry);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(removeFavoriteMock).toHaveBeenCalledWith('TST');
  });

  // Test case 5
  test('prevents default event behavior to avoid navigation', () => {
    renderWithProviders(mockCountry);
    
    const button = screen.getByRole('button');
    const mockEvent = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn()
    };
    
    // Simulate click event
    fireEvent(button, new MouseEvent('click', mockEvent));
    
    // Check that preventDefault was called
    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(mockEvent.stopPropagation).toHaveBeenCalled();
  });

  // Test case 6
  test('has correct styling for non-favorited state', () => {
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => false,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn()
    }));
    
    renderWithProviders(mockCountry);
    
    const button = screen.getByRole('button');
    expect(button.classList.contains('text-gray-400')).toBe(true);
    expect(button.classList.contains('text-yellow-500')).toBe(false);
  });

  // Test case 7
  test('has correct styling for favorited state', () => {
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => true,
      addFavorite: jest.fn(),
      removeFavorite: jest.fn()
    }));
    
    renderWithProviders(mockCountry);
    
    const button = screen.getByRole('button');
    expect(button.classList.contains('text-yellow-500')).toBe(true);
    expect(button.classList.contains('text-gray-400')).toBe(false);
  });


  // Test case 9
  test('calls toggleFavorite when clicked', () => {
    const addFavoriteMock = jest.fn();
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => false,
      addFavorite: addFavoriteMock,
      removeFavorite: jest.fn()
    }));
    
    renderWithProviders(mockCountry);
    
    fireEvent.click(screen.getByRole('button'));
    
    expect(addFavoriteMock).toHaveBeenCalled();
  });

  // Test case 10
  test('uses the country code (cca3) for favorite operations', () => {
    // Test adding
    const addFavoriteMock = jest.fn();
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => false,
      addFavorite: addFavoriteMock,
      removeFavorite: jest.fn()
    }));
    
    const { rerender } = renderWithProviders(mockCountry);
    
    fireEvent.click(screen.getByRole('button'));
    expect(addFavoriteMock).toHaveBeenCalledWith(mockCountry);
    
    // Test removing
    const removeFavoriteMock = jest.fn();
    jest.spyOn(favoritesHook, 'useFavorites').mockImplementation(() => ({
      isFavorite: () => true,
      addFavorite: jest.fn(),
      removeFavorite: removeFavoriteMock
    }));
    
    rerender(
      <AuthProvider>
        <FavoritesProvider>
          <FavoriteButton country={mockCountry} />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(removeFavoriteMock).toHaveBeenCalledWith('TST');
  });
});
