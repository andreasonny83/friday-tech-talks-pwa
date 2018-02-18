describe('Login page', function () {
  it('Visit the login page', function () {
    cy.visitLogin();
  });

  describe('Login form should be displayed', function () {
    it('The page should contain a login form', function () {
      cy.get('.loginForm');
    });

    it('The form should contain username and password fields', function () {
      cy.get('.loginForm #username');
      cy.get('.loginForm #password');
    });

    it('The username field should be focused', function () {
      cy.focused()
        .should('have.id', 'username');
    });

    it('The submit button should be disabled', function () {
      cy.get('#loginBtn')
        .should('be.disabled');
    });

    it('It should accept text values', function () {
      cy.get('#username')
        .type('my@email');

      cy.get('#password')
        .type('password');
    });

    it('The submit button should now be enaabled', function () {
      cy.get('#loginBtn')
        .should('be.enabled');
    });
  });

  describe.only('Sign in', function () {
    it('Visit the login page', function () {
      cy.visitLogin();
    });

    it('displays errors on login', function() {
      cy.get('input[name=username]').type('jane@lae.com');
      cy.get('input[name=password]').type('password123{enter}');

      cy.get('#error')
        .should('be.visible')
        .and('contain', 'Username and/or password is incorrect.');
    });

    it('and the login button should be disabled', function() {
      cy.get('#loginBtn')
        .should('be.disabled');
    });

    it('when the user enters a valid username and password' +
    'the login button should be re-enabled', function() {
      cy.get('input[name=username]')
        .clear()
        .type('test-user@cypress.com');

      cy.get('input[name=password]')
        .clear()
        .type('Passw0rd123');

      cy.get('#loginBtn')
        .should('be.enabled');
    });

    it('when pressing login the user should be redirected to the homepage',
    function() {
      cy.get('#loginBtn').click();

      cy.url().should('match', /home/);
    });
  });
});
