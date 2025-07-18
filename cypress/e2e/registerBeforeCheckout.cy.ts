import { faker } from '@faker-js/faker';

// Sample custom user object
const testUser = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: 'Test@1234',
};

describe('Test Case: Register Before Checkout', () => {
  before(() => {
    cy.visit('https://automationexercise.com');
  });

  it('should register and login user', () => {
    // Basic smoke step to validate registration page navigation
    cy.contains('Signup / Login').click();

    // Fill registration form (simplified)
    cy.get('input[data-qa="signup-name"]').type(testUser.name);
    cy.get('input[data-qa="signup-email"]').type(testUser.email);
    cy.get('button[data-qa="signup-button"]').click();

    // Wait for form to load
    cy.url().should('include', '/signup');
    cy.get('#id_gender1').check();
    cy.get('#password').type(testUser.password);
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');
    cy.get('#first_name').type('Test');
    cy.get('#last_name').type('User');
    cy.get('#address1').type('123 Test Street');
    cy.get('#state').type('California');
    cy.get('#city').type('LA');
    cy.get('#zipcode').type('12345');
    cy.get('#mobile_number').type('1234567890');

    cy.get('button[data-qa="create-account"]').click();

    cy.contains('Account Created!').should('be.visible');
    cy.get('a[data-qa="continue-button"]').click();
    cy.contains('Logged in as').should('contain', testUser.name);
  });

  after(() => {
    cy.contains('Delete Account').click();
    cy.contains('Account Deleted!').should('be.visible');
  });
});
