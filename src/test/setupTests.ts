import '@testing-library/jest-dom';

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'test-toast-id'
  }
});

Object.defineProperty(window, 'location', {
  value: {
    assign: jest.fn()
  },
  writable: true
});
