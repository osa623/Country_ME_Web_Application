import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import CountryDetailPage from './pages/CountryDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FavoritesPage from './pages/FavoritesPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { CountryProvider } from './contexts/CountryContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import HeroSection from './pages/HeroSection';
import LoadingSpinner from './components/layout/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
        <CountryProvider>
          <FavoritesProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/hero" element={                
                <ProtectedRoute>
                  <HeroSection />
                </ProtectedRoute>
              }   />
              <Route path="/home" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              <Route path="/country/:code" element={
                <ProtectedRoute>
                  <CountryDetailPage />
                </ProtectedRoute>
              } />
              <Route path="/favorites" element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              } />
            </Routes>
          </FavoritesProvider>
        </CountryProvider>
      </main>
      <Footer />
    </div>
  );
}

export default App;
