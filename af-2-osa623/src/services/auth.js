/**
 * Authentication service for handling user login, registration, and session management.
 */

// Simulate a delay for async operations (ms)
const DELAY = 500;

/**
 * Authenticates a user with the provided credentials
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} Promise that resolves with user data or rejects with an error
 */
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        // Create a session user object (without password)
        const sessionUser = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        
        // Store the current user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        
        // Dispatch event for user login
        window.dispatchEvent(new Event('userLoggedIn'));
        
        resolve(sessionUser);
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, DELAY);
  });
};

/**
 * Registers a new user with the provided information
 * @param {string} name - The user's name
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise} Promise that resolves with user data or rejects with an error
 */
export const register = (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Get existing users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user with this email already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        reject(new Error('User already exists'));
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password
      };
      
      // Add to users array and save back to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Create a session user object (without password)
      const sessionUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      // Store the current user in localStorage
      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      
      // Dispatch event for user login
      window.dispatchEvent(new Event('userLoggedIn'));
      
      resolve(sessionUser);
    }, DELAY);
  });
};

/**
 * Logs out the current user
 */
export const logout = () => {
  localStorage.removeItem('currentUser');
  
  // Dispatch event for user logout
  window.dispatchEvent(new Event('userLoggedOut'));
};

/**
 * Gets the currently logged in user
 * @returns {Object|null} The current user object or null if not logged in
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('currentUser');
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * Checks if a user is currently authenticated
 * @returns {boolean} True if a user is logged in, false otherwise
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};
