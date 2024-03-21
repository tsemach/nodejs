// This file is used to set up the Jest environment before running tests
// You can add global setup code here, such as:
// - Setting up environment variables
// - Configuring global mocks
// - Setting up test databases
// - Adding custom matchers
import { jest } from '@jest/globals';

// Increase the timeout for all tests (in milliseconds)
jest.setTimeout(30000);

// Add any global beforeAll hooks here if needed
// beforeAll(async () => {
//   // Setup code that runs once before all tests
// });

// Add any global afterAll hooks here if needed
// afterAll(async () => {
//   // Cleanup code that runs once after all tests
// });
