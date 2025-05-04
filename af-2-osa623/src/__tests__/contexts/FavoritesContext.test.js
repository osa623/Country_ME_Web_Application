import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from '../../contexts/FavoritesContext';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock getCurrentUser from auth service
jest.mock('../../services/auth', () => ({
  getCurrentUser: jest.fn(() => ({ id: 'user1', name: 'Test User' })),
}));

// Test component that uses the favorites context
const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  
  const testCountry = { 
    name: { common: 'Test Country' }, 
    cca3: 'TST',
    flags: { png: 'test-flag.png' }
  };
  
  return (
    <div>
      <div data-testid="favorites-count">{favorites.length}</div>
      <button 
        data-testid="add-button" 
        onClick={() => addFavorite(testCountry)}
      >
        Add to Favorites
      </button>
      <button 
        data-testid="remove-button" 
        onClick={() => removeFavorite('TST')}
      >
        Remove from Favorites
      </button>
      <div data-testid="is-favorite">{isFavorite('TST') ? 'Yes' : 'No'}</div>
    </div>
  );
};

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  // Test case 1
  test('provides initial empty favorites array', () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('No');
  });

  // Test case 2
  test('loads existing favorites from localStorage', () => {
    const savedFavorites = [
      { name: { common: 'Finland' }, cca3: 'FIN', flags: { png: 'finland-flag.png' } }
    ];
    localStorage.setItem('favorites-user1', JSON.stringify(savedFavorites));
    
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
  });

  // Test case 3
  test('addFavorite adds a country to favorites', () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('add-button'));
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('Yes');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites-user1', 
      expect.any(String)
    );
  });

  // Test case 4
  test('removeFavorite removes a country from favorites', () => {
    const savedFavorites = [
      { name: { common: 'Test Country' }, cca3: 'TST', flags: { png: 'test-flag.png' } }
    ];
    localStorage.setItem('favorites-user1', JSON.stringify(savedFavorites));
    
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    
    fireEvent.click(screen.getByTestId('remove-button'));
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('No');
  });

  // Test case 5
  test('isFavorite returns true for favorited countries', () => {
    const savedFavorites = [
      { name: { common: 'Test Country' }, cca3: 'TST', flags: { png: 'test-flag.png' } }
    ];
    localStorage.setItem('favorites-user1', JSON.stringify(savedFavorites));
    
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('Yes');
  });

  // Test case 6
  test('isFavorite returns false for non-favorited countries', () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('is-favorite')).toHaveTextContent('No');
  });

  // Test case 7
  test('addFavorite prevents duplicates when adding same country twice', () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('add-button'));
    fireEvent.click(screen.getByTestId('add-button'));
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
  });

  // Test case 8
  test('favorites state is saved to localStorage when updated', () => {
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('add-button'));
    
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'favorites-user1', 
      expect.stringContaining('Test Country')
    );
  });

  // Test case 9
  test('favorites are not modified when user is not authenticated', () => {
    // Mock user as not authenticated
    require('../../services/auth').getCurrentUser.mockReturnValueOnce(null);
    
    render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
    
    // Try to remove
    fireEvent.click(screen.getByTestId('remove-button'));
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  // Test case 10
  test('favorites are emptied when user is logged out', () => {
    const savedFavorites = [
      { name: { common: 'Test Country' }, cca3: 'TST' }
    ];
    localStorage.setItem('favorites-user1', JSON.stringify(savedFavorites));
    
    const { rerender } = render(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('1');
    
    // Mock user as logged out
    require('../../services/auth').getCurrentUser.mockReturnValueOnce(null);
    
    // Force rerender to simulate logout
    rerender(
      <AuthProvider>
        <FavoritesProvider>
          <TestComponent />
        </FavoritesProvider>
      </AuthProvider>
    );
    
    expect(screen.getByTestId('favorites-count')).toHaveTextContent('0');
  });
});
