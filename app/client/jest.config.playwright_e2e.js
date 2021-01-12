module.exports = {
  preset: 'jest-playwright-preset',
  transform: { '^.+\\.tsx?$': 'ts-jest' },
  testMatch: ['**/src/test/e2e/playwright/*.test.ts'],
  globalSetup: "<rootDir>/src/test/e2e/playwright/setup.ts",
  globalTeardown: "<rootDir>/src/test/e2e/playwright/teardown.ts"
}