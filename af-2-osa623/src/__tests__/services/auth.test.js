import { login, register, logout, getCurrentUser, isAuthenticated } from '../../services/auth';

// Use fake timers to control setTimeout
jest.useFakeTimers();

describe('Auth Service', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear();
  });

  // Test case 1: login with valid credentials
  test('login authenticates user with valid credentials', async () => {
    // Setup: Store a test user in localStorage
    const testUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    localStorage.setItem('users', JSON.stringify([testUser]));

    // Test: Call login with valid credentials
    const loginPromise = login('test@example.com', 'password123');
    jest.runAllTimers(); // Advance timers to resolve the Promise

    // Verify: User is authenticated and returned without password
    const user = await loginPromise;
    expect(user).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com'
    });

    // Verify: User is stored in localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    expect(currentUser).toEqual(user);
  });

  // Test case 2: login with invalid credentials
  test('login rejects with invalid credentials', async () => {
    // Setup: Store a test user in localStorage
    const testUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    localStorage.setItem('users', JSON.stringify([testUser]));

    // Test & Verify: Login with wrong password should reject
    const loginPromise = login('test@example.com', 'wrongpassword');
    jest.runAllTimers(); // Advance timers to reject the Promise
    
    await expect(loginPromise).rejects.toThrow('Invalid credentials');
  });

  // Test case 3: register creates a new user
  test('register creates a new user and logs them in', async () => {
    // Setup
    const name = 'New User';
    const email = 'new@example.com';
    const password = 'password123';

    // Test: Register a new user
    const registerPromise = register(name, email, password);
    jest.runAllTimers(); // Advance timers to resolve the Promise

    // Verify: User is created and returned without password
    const user = await registerPromise;
    expect(user).toHaveProperty('id');
    expect(user.name).toBe(name);
    expect(user.email).toBe(email);
    expect(user).not.toHaveProperty('password');

    // Verify: User was stored in localStorage
    const usersStr = localStorage.getItem('users');
    const users = JSON.parse(usersStr);
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe(name);
    expect(users[0].email).toBe(email);
    expect(users[0].password).toBe(password);

    // Verify: User is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    expect(currentUser).toEqual(user);
  });

  // Test case 4: register rejects when user already exists
  test('register rejects when user already exists', async () => {
    // Setup: Add existing user
    const existingUser = {
      id: '1746373165958',
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'password123'
    };
    localStorage.setItem('users', JSON.stringify([existingUser]));

    // Test: Try to register with same email
    const registerPromise = register('New Name', 'existing@example.com', 'newpassword');
    jest.runAllTimers(); // Immediately execute setTimeout

    // Verify: Registration is rejected
    await expect(registerPromise).rejects.toThrow('User already exists');
  });

  // Test case 5: logout removes the current user
  test('logout removes the current user from localStorage', () => {
    // Setup: Set a current user
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    // Test: Logout
    logout();

    // Verify: Current user is removed
    expect(localStorage.getItem('currentUser')).toBeNull();
  });

  // Test case 6: getCurrentUser returns current user
  test('getCurrentUser returns current user from localStorage', () => {
    // Setup: Set a current user
    const mockUser = { id: '1', name: 'Test User', email: 'test@example.com' };
    localStorage.setItem('currentUser', JSON.stringify(mockUser));

    // Test & Verify: Get current user
    const user = getCurrentUser();

    expect(user).toEqual(mockUser);
  });

  // Test case 7: getCurrentUser returns null when no user
  test('getCurrentUser returns null when no user is logged in', () => {
    // Setup: Make sure no user is in localStorage
    localStorage.removeItem('currentUser');

    // Test & Verify: Get current user should be null
    const user = getCurrentUser();
    expect(user).toBeNull();
  });

  // Test case 8: isAuthenticated returns true when user is logged in
  test('isAuthenticated returns true when user is logged in', () => {
    // Setup: Set a current user
    localStorage.setItem('currentUser', JSON.stringify({ id: '1', name: 'Test User' }));

    // Test & Verify: Should be authenticated
    expect(isAuthenticated()).toBe(true);
  });

  // Test case 9: isAuthenticated returns false when no user is logged in
  test('isAuthenticated returns false when no user is logged in', () => {
    // Setup: Remove any current user
    localStorage.removeItem('currentUser');

    // Test & Verify: Should not be authenticated
    expect(isAuthenticated()).toBe(false);
  });
});
