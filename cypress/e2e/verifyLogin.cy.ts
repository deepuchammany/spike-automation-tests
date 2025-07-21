// API Tests - verifyLogin and related APIs
// This test covers the full lifecycle of a user account using the Automation Exercise API:
// 1. Account creation
// 2. Login verification
// 3. Fetching user details by email
// 4. Account deletion

describe('API Tests - verifyLogin and related APIs', () => {
  it('should create account, verify login, get user details and delete account', () => {
    // Generate unique credentials for test isolation
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@mail.com`;
    const password = 'test1234';
    const name = 'Test User';

    cy.log(`📧 Generated email: ${email}`);

    // Step 1: Create Account via API
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name,
        email,
        password,
        title: 'Mr',
        birth_date: '10',
        birth_month: '5',
        birth_year: '1990',
        firstname: 'Test',
        lastname: 'User',
        company: 'OpenAI',
        address1: '123 Main St',
        address2: 'Suite 4',
        country: 'India',
        zipcode: '12345',
        state: 'StateName',
        city: 'CityName',
        mobile_number: '1234567890'
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('📬 createAccount response:', response.body);
      const parsed = JSON.parse(response.body);
      expect(response.status).to.eq(200);
      expect(parsed.responseCode).to.eq(201);
      expect(parsed.message).to.include('User created!');
    });

    // Step 2: Verify Login via API
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      form: true,
      body: {
        email,
        password,
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('🔐 verifyLogin response:', response.body);
      const parsed = JSON.parse(response.body);
      expect(response.status).to.eq(200);
      expect(parsed.responseCode).to.eq(200);
      expect(parsed.message).to.include('User exists');
    });

    // Step 3: Get User Detail by Email via API
    cy.request({
      method: 'GET',
      url: `https://automationexercise.com/api/getUserDetailByEmail?email=${email}`,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);

      const parsed = JSON.parse(response.body);
      cy.log('🧾 Parsed response:', parsed);

      expect(parsed).to.have.property('responseCode', 200);
      expect(parsed).to.have.property('user');
      expect(parsed.user).to.have.property('email');
      expect(parsed.user.email).to.eq(email);
    });

    // Step 4: Delete Account via API
    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/deleteAccount',
      form: true,
      body: {
        email,
        password,
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('🗑️ deleteAccount response:', response.body);
      const parsed = JSON.parse(response.body);
      expect(response.status).to.eq(200);
      expect(parsed.responseCode).to.eq(200);
      expect(parsed.message).to.include('Account deleted!');
    });
  });
});
