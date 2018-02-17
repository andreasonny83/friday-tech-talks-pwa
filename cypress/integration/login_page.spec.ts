describe('Login page', function () {
  it('Visit the login page', function () {
    cy.visitLogin();
  });

  it('The page should contain a login form', function () {
    cy.get('.loginForm');
  });

  it('The form should contain an email and password fields', function () {
    cy.get('.loginForm #email');
    cy.get('.loginForm #password');
  });

  it('The email field should be focused', function () {
    cy.focused()
      .should('have.id', 'email');
  });

  it('The submit button should be disabled', function () {
    cy.get('#loginBtn')
      .should('be.disabled');
  });

  it('It should accept text values', function () {
    cy.get('#email')
      .type('my@email');

    cy.get('#password')
      .type('password');
  });

  it('The submit button should now be enaabled', function () {
    cy.get('#loginBtn')
      .should('be.enabled');
  });
});
