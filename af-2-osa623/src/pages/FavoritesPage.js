import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons';

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { user } = useAuth();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
        <div className="container mx-auto">
          <Link 
            to="/home" 
            className="flex items-center text-gray-700 hover:text-blue-600 transition-colors mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Countries
          </Link>
          
          <div className="text-center py-16">
            <FontAwesomeIcon icon={faHeartBroken} className="text-gray-400 text-5xl mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">No Favorite Countries</h1>
            <p className="text-gray-600">{user?.name || 'You'} haven't added any countries to your favorites yet.</p>
            <Link 
              to="/home" 
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Explore Countries
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="container mx-auto">
        <Link 
          to="/home" 
          className="flex items-center text-gray-700 hover:text-blue-600 transition-colors mb-6"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Countries
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center">
          <FontAwesomeIcon icon={faHeart} className="text-red-500 mr-3" />
          {user?.name}'s Favorite Countries
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(country => (
            <div key={country.cca3} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Link to={`/country/${country.cca3}`}>
                <div className="h-40 overflow-hidden">
                  <img 
                    src={country.flags?.png || country.flags?.svg} 
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{country.name.common}</h2>
                  {country.capital && (
                    <p className="text-gray-600">
                      <span className="font-medium">Capital:</span> {country.capital[0]}
                    </p>
                  )}
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button 
                  onClick={() => removeFavorite(country.cca3)} 
                  className="w-full py-2 bg-red-100 text-red-600 rounded font-medium flex items-center justify-center hover:bg-red-200"
                >
                  <FontAwesomeIcon icon={faHeartBroken} className="mr-2" />
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
