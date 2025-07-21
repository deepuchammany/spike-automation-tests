// Page Object for Signup and Account Creation flows
class SignupPage {
  // Fills signup form and submits
  register(username: string, email: string) {
    cy.get('[data-qa="signup-name"]', { timeout: 10000 }).should('be.visible').type(username)
    cy.get('[data-qa="signup-email"]').should('be.visible').type(email)
    cy.get('[data-qa="signup-button"]').should('be.visible').click()
  }

  // Fills account details form and completes registration
  fillAccountDetails(password: string) {
    cy.get('#id_gender1').check({ force: true })
    cy.get('#password').type(password)
    cy.get('#days').select('1')
    cy.get('#months').select('January')
    cy.get('#years').select('2000')

    cy.get('#newsletter').check()
    cy.get('#optin').check()

    cy.get('#first_name').type('John')
    cy.get('#last_name').type('Doe')
    cy.get('#company').type('ACME Corp')
    cy.get('#address1').type('123 Main St')
    cy.get('#address2').type('Suite 4')
    cy.get('#country').select('United States')
    cy.get('#state').type('California')
    cy.get('#city').type('Los Angeles')
    cy.get('#zipcode').type('90001')
    cy.get('#mobile_number').type('1234567890')

    cy.get('[data-qa="create-account"]').click()
    cy.contains('Account Created!').should('be.visible')
    cy.get('[data-qa="continue-button"]').click()
  }
}

export default SignupPage
