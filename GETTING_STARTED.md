# 🚀 Getting Started with Cypress API & UI Tests

Welcome! This test suite covers both UI and API flows for https://automationexercise.com using Cypress.

---

## 📦 Project Setup

### 1. Clone the repository
```bash
git clone https://github.com/deepuchammany/spike-automation-tests
cd spike-automation-tests
```

### 2. Install dependencies
```bash
npm install
```

---

## 🧪 Running the Tests

### Open Cypress Test Runner (GUI)
```bash
npx cypress open
```

Select the desired test file from the UI.

### Run All Tests via CLI
```bash
npx cypress run
```

---

## 📁 Test Files Overview

| File                         | Description                                                        |
|------------------------------|--------------------------------------------------------------------|
| `verifyLogin.cy.ts`          | API tests for account creation, login, user detail fetch, deletion |
| `registerBeforeCheckout.cy.ts` | UI flow to register during checkout                              |
| `placeOrderWhileCheckout.cy.ts`| Complete UI flow from cart → registration → payment confirmation |

---

## 🧱 Page Object Files Used

- `HomePage.ts`
- `ProductPage.ts`
- `CartPage.ts`
- `SignupLoginPage.ts`
- `SignupPage.ts`
- `CheckoutPage.ts`
- `PaymentPage.ts`
- `OrderSuccessPage.ts`

These files encapsulate DOM interactions, making the tests modular and easier to maintain.

---

## 🔐 Auth Notes

- API tests create **unique test users** dynamically using timestamps.
- No real authentication tokens are used — all requests are unauthenticated POST/GETs.

---

## ✅ Recommended Order of Running

1. `verifyLogin.cy.ts`
2. `registerBeforeCheckout.cy.ts`
3. `placeOrderWhileCheckout.cy.ts`

---

Happy testing!
