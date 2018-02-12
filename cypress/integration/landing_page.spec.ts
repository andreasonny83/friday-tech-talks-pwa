describe('Landing page', function () {
  it('Visit the landing page', function () {
    cy.visitLogin();
  });

  it('The page should contain a title', function () {
    cy
      .get('h1')
      .contains(/^Welcome to [\w ]+$/);
  });

  it('The page should contain a version number', function () {
    cy
      .get('#appVersion')
      .contains(/v.[0-9].[0-9].[0-9]$/);
    });
});
