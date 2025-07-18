// cypress/support/commands.ts

// Custom command to visit a page and log the page title
Cypress.Commands.add('visitPage', (url: string) => {
  cy.visit(url);
  cy.title().should('include', 'Automation Exercise');  // Basic check for page title
});

// Example of a custom command for logging in
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to verify if an element is visible
Cypress.Commands.add('verifyVisible', (selector: string) => {
  cy.get(selector).should('be.visible');
});
