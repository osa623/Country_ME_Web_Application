import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/layout/Header';
import { AuthProvider } from '../../contexts/AuthContext';
import * as authHook from '../../contexts/AuthContext';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to render with necessary providers
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  // Test case 1
  test('renders the site logo/name', () => {
    renderHeader();
    
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('ME')).toBeInTheDocument();
    
    // Should be a link to home
    const logoLink = screen.getByRole('link', { name: /country/i });
    expect(logoLink).toHaveAttribute('href', '/');
  });

  // Test case 2
  test('shows login and register links when user is not authenticated', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      logout: jest.fn()
    }));
    
    renderHeader();
    
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  });

  // Test case 3
  test('shows welcome message and logout button when user is authenticated', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: jest.fn()
    }));
    
    renderHeader();
    
    expect(screen.getByText(/welcome, test user/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /register/i })).not.toBeInTheDocument();
  });

  // Test case 4
  test('shows my favorites link when user is authenticated', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: jest.fn()
    }));
    
    renderHeader();
    
    const favoritesLink = screen.getByRole('link', { name: /my favorites/i });
    expect(favoritesLink).toBeInTheDocument();
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });

  // Test case 5
  test('logout button calls logout function and navigates to login page', () => {
    const logoutMock = jest.fn();
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: logoutMock
    }));
    
    renderHeader();
    
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    
    expect(logoutMock).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  // Test case 6
  test('handles missing user name gracefully', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { }, // Empty user object with no name
      logout: jest.fn()
    }));
    
    renderHeader();
    
    expect(screen.getByText(/welcome, user/i)).toBeInTheDocument();
  });

  // Test case 7
  test('login link points to the correct path', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      logout: jest.fn()
    }));
    
    renderHeader();
    
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  // Test case 8
  test('register link points to the correct path', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      logout: jest.fn()
    }));
    
    renderHeader();
    
    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  // Test case 9
  test('has proper styling for authenticated state', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: jest.fn()
    }));
    
    renderHeader();
    
    // Check that welcome message has text-gray-600 class
    const welcomeText = screen.getByText(/welcome, test user/i);
    expect(welcomeText.classList.contains('text-gray-600')).toBe(true);
    
    // Check that My Favorites link has blue background color
    const favoritesLink = screen.getByRole('link', { name: /my favorites/i });
    expect(favoritesLink.classList.contains('bg-blue-500')).toBe(true);
    
    // Check that logout button has red background color
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton.classList.contains('bg-red-500')).toBe(true);
  });

  // Test case 10
  test('has proper styling for non-authenticated state', () => {
    jest.spyOn(authHook, 'useAuth').mockImplementation(() => ({
      isAuthenticated: false,
      user: null,
      logout: jest.fn()
    }));
    
    renderHeader();
    
    // Check that Login link has text styling
    const loginLink = screen.getByRole('link', { name: /login/i });
    expect(loginLink.classList.contains('text-primary')).toBe(true);
    
    // Check that Register link has button styling
    const registerLink = screen.getByRole('link', { name: /register/i });
    expect(registerLink.classList.contains('bg-blue-500')).toBe(true);
  });
});
