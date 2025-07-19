// cypress/support/commands.d.ts
/* eslint-disable @typescript-eslint/no-namespace */

export {}; // Ensures this is treated as a module

declare global {
  namespace Cypress {
    interface Chainable {
      visitPage(url: string): Chainable<void>;
      login(email: string, password: string): Chainable<void>;
      verifyVisible(selector: string): Chainable<void>;
    }
  }
}
