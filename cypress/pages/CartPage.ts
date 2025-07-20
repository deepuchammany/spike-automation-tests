class CartPage {
  clickViewCart() {
    cy.contains('View Cart').click({ force: true })
  }

  clickContinueShopping() {
    cy.contains('Continue Shopping').click({ force: true })
  }

  proceedToCheckout() {
    cy.contains('Proceed To Checkout').click({ force: true })
  }
  clickRegisterLogin() {
    // If checkout modal exists and is visible, close it
    cy.get('body').then(($body) => {
      const $modal = $body.find('#checkoutModal');

      if ($modal.length > 0 && $modal.is(':visible')) {
        cy.wrap($modal).within(() => {
          // Try clicking 'Continue' button or '×' icon
          cy.get('button, .close').contains(/continue|×/i).click({ force: true });
        });

        // Wait for the modal to completely disappear
        cy.get('#checkoutModal').should('not.be.visible');
      }
    });

    // Click the Signup/Login link
    cy.contains('Signup / Login').click({ force: true });
  }

}

export default CartPage
