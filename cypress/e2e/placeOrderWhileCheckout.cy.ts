import HomePage from '../pages/HomePage'
import SignupPage from '../pages/SignupPage'
import AccountPage from '../pages/AccountPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

describe('Test Case 14: Place Order - Register while Checkout', () => {
    const homePage = new HomePage()
    const signupPage = new SignupPage()
    const accountPage = new AccountPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()

    const timestamp = Date.now()
    const username = `user${timestamp}`
    const email = `user${timestamp}@test.com`
    const password = 'Password123'

    before(() => {
        cy.visit('https://automationexercise.com')

        productPage.addFirstProductToCart()
        cartPage.clickViewCart()
        cartPage.proceedToCheckout()

        // Click Register/Login
        cy.log('Clicking Register/Login...')
        cartPage.clickRegisterLogin()

        // Check if redirect happened
        cy.url().should('include', '/login')

        // Wait a bit for page load and confirm heading
        cy.wait(3000)
        cy.contains('New User Signup!', { timeout: 10000 }).should('be.visible')

        // Complete registration
        signupPage.register(username, email)
        signupPage.fillAccountDetails(password)
        homePage.verifyLoggedInAs(username)
    })


    it('should complete checkout after registering during checkout flow', () => {
        cartPage.clickViewCart()
        cartPage.proceedToCheckout()
        checkoutPage.placeOrder()
    })

    after(() => {
        cy.get('body').then($body => {
            if ($body.text().includes('Delete Account')) {
                cy.contains('Delete Account').click({ force: true })
                cy.contains('Account Deleted!').should('be.visible')
                cy.get('[data-qa="continue-button"]').click()
            } else {
                cy.log('⚠️ Delete Account link not found — skipping deletion.')
            }
        })
    })


})
