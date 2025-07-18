class AccountPage {
  deleteAccount() {
    cy.contains('Delete Account').click({ force: true })
    cy.contains('Account Deleted!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  }
}

export default AccountPage
