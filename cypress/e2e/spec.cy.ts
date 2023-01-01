describe('My First Test', () => {
  it('Sanity test', () => {
    cy.visit('/');
    cy.contains('a', 'Clipz');
    // cy.contains('.logout-btn', 'Logout').click();
    cy.contains('span', 'About').click();
  });
});
