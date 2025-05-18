import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faSignOutAlt, 
  faUser, 
  faSignInAlt, 
  faUserPlus,
  faGlobeAmericas,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="py-4 bg-white z-50 shadow-md relative">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/hero" className="flex items-center text-xl md:text-2xl font-bold text-primary">
            <FontAwesomeIcon icon={faGlobeAmericas} className="mr-2 text-blue-600" />
            Geo<span className='text-blue-800'>Scope</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none" 
            onClick={toggleMobileMenu}
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="text-xl" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
                  <span>{user?.name || 'User'}</span>
                </div>
                
                <Link
                  to="/favorites"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition bg-gradient-to-r from-blue-500 to-blue-600 rounded-md hover:from-blue-600 hover:to-blue-700 shadow-sm"
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  My Favorites
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 shadow-sm"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium transition border border-gray-300 rounded-md text-primary hover:bg-gray-50 hover:text-blue-700"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition bg-gradient-to-r from-blue-500 to-blue-600 rounded-md hover:from-blue-600 hover:to-blue-700 shadow-sm"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg py-4 px-4 z-50 border-t">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full">
                  <FontAwesomeIcon icon={faUser} className="mr-2 text-blue-600" />
                  <span>{user?.name || 'User'}</span>
                </div>
                
                <Link
                  to="/favorites"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition bg-gradient-to-r from-blue-500 to-blue-600 rounded-md hover:from-blue-600 hover:to-blue-700 shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  My Favorites
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 shadow-sm"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="flex items-center px-4 py-2 text-sm font-medium transition border border-gray-300 rounded-md text-primary hover:bg-gray-50 hover:text-blue-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center px-4 py-2 text-sm font-medium text-white transition bg-gradient-to-r from-blue-500 to-blue-600 rounded-md hover:from-blue-600 hover:to-blue-700 shadow-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
