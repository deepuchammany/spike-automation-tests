class CheckoutPage {
  placeOrder() {
    cy.get('textarea[name="message"]').type('Please deliver quickly.')
    cy.contains('Place Order').click()
    cy.get('input[name="name_on_card"]').type('John Doe')
    cy.get('input[name="card_number"]').type('4111111111111111')
    cy.get('input[name="cvc"]').type('123')
    cy.get('input[name="expiry_month"]').type('12')
    cy.get('input[name="expiry_year"]').type('2025')
    cy.contains('Pay and Confirm Order').click()

    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  }
}

export default CheckoutPage
