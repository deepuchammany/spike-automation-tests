// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',  // URL for the tests
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // Test file pattern
    supportFile: 'cypress/support/commands.ts',  // Support file location
    viewportWidth: 1280,  // Width for the viewport
    viewportHeight: 720,  // Height for the viewport
    retries: {
      runMode: 2,
      openMode: 0
    }
  }
});
