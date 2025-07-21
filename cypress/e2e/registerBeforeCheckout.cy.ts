// Test Case: Place Order - Register before Checkout
// This test verifies that a user can register, log in, add a product to the cart, and complete the checkout process.

import HomePage from '../pages/HomePage'
import SignupPage from '../pages/SignupPage'
import AccountPage from '../pages/AccountPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

describe('Place Order - Register before Checkout', () => {
  // Instantiate page objects for modular test steps
  const homePage = new HomePage()
  const signupPage = new SignupPage()
  const accountPage = new AccountPage()
  const productPage = new ProductPage()
  const cartPage = new CartPage()
  const checkoutPage = new CheckoutPage()

  // Generate unique credentials for each test run
  const username = `user${Date.now()}`
  const email = `user${Date.now()}@test.com`
  const password = 'Password123'

  before(() => {
    // Step 1: Visit homepage and register a new user
    cy.visit('https://automationexercise.com')
    homePage.clickSignupLogin()
    signupPage.register(username, email)
    signupPage.fillAccountDetails(password)
    homePage.verifyLoggedInAs(username)
  })

  it('should register, login, add product to cart, and complete checkout', () => {
    // Step 2: Add product to cart and complete checkout
    // Product → Cart → Checkout → Order
    productPage.addFirstProductToCart()
    cartPage.clickViewCart()
    cartPage.proceedToCheckout()
    checkoutPage.placeOrder()
  })

  after(() => {
    // Step 3: Cleanup - Delete the test account
    accountPage.deleteAccount()
  })
})
