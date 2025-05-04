// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toBeInTheDocument();
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock CSS and image files
jest.mock('identity-obj-proxy', () => ({}), { virtual: true });

// Configure Jest to handle file imports
jest.mock('\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$', 
  () => 'test-file-stub',
  { virtual: true }
);

// Configure Jest to handle CSS/SCSS imports
jest.mock('\\.(css|less|scss|sass)$', 
  () => 'identity-obj-proxy',
  { virtual: true }
);

// This file is automatically executed before each test by Jest

// Mock localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

// Mock fetch API if needed
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true
  })
);

// Suppress React 18 console warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0]) ||
        /ReactDOM.act/.test(args[0]) ||
        /React Router/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
