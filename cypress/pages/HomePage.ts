class HomePage {
  clickSignupLogin() {
    cy.contains('Signup / Login').click()
  }

  verifyLoggedInAs(username: string) {
    cy.contains(`Logged in as ${username}`).should('be.visible')
  }
}

export default HomePage
