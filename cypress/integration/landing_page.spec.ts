describe('Landing page', function () {
  it('Visit the landing page', function () {
    cy.visit('http://localhost:4200');
  });

  it('The page should contain a title', function () {
    cy.get('h1').contains('Welcome to Friday Tech Talks PWA');
  });
});

describe('Coming talks', function () {
  it('The page should contain a "Coming next" section', function () {
    cy.get('#primary').within(() => {
      cy.get('h3').contains('Coming Next');
    });
  });
});
