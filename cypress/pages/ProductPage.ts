class ProductPage {
  addFirstProductToCart() {
    cy.get('.features_items .product-image-wrapper').first().trigger('mouseover')
    cy.contains('Add to cart').first().click({ force: true })
    cy.contains('Continue Shopping').click()
  }
}

export default ProductPage
