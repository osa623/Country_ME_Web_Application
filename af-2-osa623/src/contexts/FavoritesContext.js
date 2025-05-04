import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCurrentUser } from '../services/auth';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.id : 'guest';

  // Generate a unique storage key for each user
  const getFavoritesKey = () => `favorites_${userId}`;

  // Load favorites from localStorage when the component mounts or user changes
  useEffect(() => {
    const loadFavorites = () => {
      const storedFavorites = localStorage.getItem(getFavoritesKey());
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error);
          setFavorites([]);
        }
      } else {
        setFavorites([]);
      }
    };

    loadFavorites();
    
    // Listen for auth changes
    const handleAuthChange = () => {
      loadFavorites();
    };
    
    window.addEventListener('userLoggedIn', handleAuthChange);
    window.addEventListener('userLoggedOut', handleAuthChange);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleAuthChange);
      window.removeEventListener('userLoggedOut', handleAuthChange);
    };
  }, [userId]);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (userId) {
      localStorage.setItem(getFavoritesKey(), JSON.stringify(favorites));
    }
  }, [favorites, userId]);

  const addFavorite = (country) => {
    setFavorites(prevFavorites => {
      // Check if the country is already in favorites
      if (prevFavorites.some(fav => fav.cca3 === country.cca3)) {
        return prevFavorites;
      }
      // Add the country to favorites
      return [...prevFavorites, country];
    });
  };

  const removeFavorite = (countryCode) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(country => country.cca3 !== countryCode)
    );
  };

  const isFavorite = (countryCode) => {
    return favorites.some(country => country.cca3 === countryCode);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
