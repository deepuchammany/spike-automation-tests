describe('API Tests - verifyLogin and related APIs', () => {
  it('should create account, verify login, get user details and delete account', () => {
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@mail.com`;
    const password = 'test1234';
    const name = 'Test User';

    cy.log(`📧 Generated email: ${email}`);

    // Create Account
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

    // Verify Login
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

    // Get User Detail by Email
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

    // Delete Account
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
