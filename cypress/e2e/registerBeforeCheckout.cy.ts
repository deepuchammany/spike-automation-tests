import HomePage from '../pages/HomePage'
import SignupPage from '../pages/SignupPage'
import AccountPage from '../pages/AccountPage'
import ProductPage from '../pages/ProductPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckoutPage'

describe('Place Order - Register before Checkout', () => {
  const homePage = new HomePage()
  const signupPage = new SignupPage()
  const accountPage = new AccountPage()
  const productPage = new ProductPage()
  const cartPage = new CartPage()
  const checkoutPage = new CheckoutPage()

  const username = `user${Date.now()}`
  const email = `user${Date.now()}@test.com`
  const password = 'Password123'

  before(() => {
    cy.visit('https://automationexercise.com')
    homePage.clickSignupLogin()
    signupPage.register(username, email)
    signupPage.fillAccountDetails(password)
    homePage.verifyLoggedInAs(username)
  })

  it('should register, login, add product to cart, and complete checkout', () => {
    // Product → Cart → Checkout → Order
    productPage.addFirstProductToCart()
    cartPage.clickViewCart()
    cartPage.proceedToCheckout()
    checkoutPage.placeOrder()
  })

  after(() => {
    // Cleanup account
    accountPage.deleteAccount()
  })
})
