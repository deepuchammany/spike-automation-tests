describe('Place Order: Register before Checkout', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should register, login, add product to cart, and complete checkout', () => {
    // Register
    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="signup-name"]').type('Test User');
    cy.get('input[data-qa="signup-email"]').type(`test${Date.now()}@test.com`);
    cy.get('button[data-qa="signup-button"]').click();

    // Fill registration form
    cy.get('#id_gender1').click();
    cy.get('#password').type('Test@123');
    cy.get('#days').select('10');
    cy.get('#months').select('May');
    cy.get('#years').select('1990');
    cy.get('#first_name').type('Test');
    cy.get('#last_name').type('User');
    cy.get('#address1').type('123 Main St');
    cy.get('#country').select('Canada');
    cy.get('#state').type('ON');
    cy.get('#city').type('Toronto');
    cy.get('#zipcode').type('12345');
    cy.get('#mobile_number').type('1234567890');
    cy.get('button[data-qa="create-account"]').click();

    // Confirm account created
    cy.contains('Account Created!').should('be.visible');
    cy.contains('Continue').click();

    // Ensure we're logged in
    cy.contains('Logged in as').should('contain', 'Test User');

    // Add product to cart
    cy.contains('Products').click();
    cy.url().should('include', '/products');

    cy.get('.product-overlay').first().invoke('show');
    cy.contains('Add to cart').first().click();
    cy.contains('View Cart').click();

    // Proceed to checkout
    cy.contains('Proceed To Checkout').click();
    cy.contains('Place Order').click();

    // Fill payment
    cy.get('[name="name_on_card"]').type('Test User');
    cy.get('[name="card_number"]').type('4111111111111111');
    cy.get('[name="cvc"]').type('123');
    cy.get('[name="expiry_month"]').type('12');
    cy.get('[name="expiry_year"]').type('2030');
    cy.get('#submit').click();

    // Verify success
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  });

  after(() => {
    cy.contains('Delete Account').click();
    cy.contains('Account Deleted!').should('be.visible');
    cy.contains('Continue').click();
  });
});
