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
}

export default CartPage
