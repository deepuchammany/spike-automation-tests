// cypress/support/commands.d.ts

declare namespace Cypress {
  interface Chainable {
    visitPage(url: string): Chainable<void>;
    login(email: string, password: string): Chainable<void>;
    verifyVisible(selector: string): Chainable<void>;
  }
}
