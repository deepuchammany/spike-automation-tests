// Test Case 14: Place Order - Register while Checkout
import HomePage from '../pages/HomePage'
import SignupPage from '../pages/SignupPage'
import AccountPage from '../pages/AccountPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

describe('Test Case 14: Place Order - Register while Checkout', () => {
    // Instantiate page objects
    const homePage = new HomePage()
    const signupPage = new SignupPage()
    const accountPage = new AccountPage()
    const productPage = new ProductPage()
    const cartPage = new CartPage()
    const checkoutPage = new CheckoutPage()

    // Generate unique user credentials
    const timestamp = Date.now()
    const username = `user${timestamp}`
    const email = `user${timestamp}@test.com`
    const password = 'Password123'

    before(() => {
        // Visit homepage
        cy.visit('https://automationexercise.com')

        // Add first product to cart and proceed to checkout
        productPage.addFirstProductToCart()
        cartPage.clickViewCart()
        cartPage.proceedToCheckout()

        // Click Register/Login from checkout modal
        cy.log('Clicking Register/Login...')
        cartPage.clickRegisterLogin()

        // Ensure redirect to login/signup page
        cy.url().should('include', '/login')

        // Wait for signup form to appear
        cy.wait(3000)
        cy.contains('New User Signup!', { timeout: 10000 }).should('be.visible')

        // Complete registration and account creation
        signupPage.register(username, email)
        signupPage.fillAccountDetails(password)
        homePage.verifyLoggedInAs(username)
    })

    it('should complete checkout after registering during checkout flow', () => {
        // After registration, complete checkout and place order
        cartPage.clickViewCart()
        cartPage.proceedToCheckout()
        checkoutPage.placeOrder()
    })

    after(() => {
        // Cleanup: Delete account if link is present
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
