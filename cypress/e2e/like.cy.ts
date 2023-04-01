describe('Like ,subscribe', () => {
  it('Like the Video', () => {
    cy.visit('/');
    cy.get('app-game-clips >.grid > app-game-card').first().click();

    cy.get('.space-x-3 > .items-center').wait(1500).click();
    cy.wait(1500);
  });

  //   dislike

  it('Dislike the Video', () => {
    cy.visit('/');
    cy.get('app-game-clips >.grid > app-game-card').first().click();

    cy.get('.dislike').wait(1500).click();

    cy.wait(1500);
  });

  //   subscribe

  it('Subscribe the Video', () => {
    cy.visit('/');
    cy.get('app-game-clips >.grid > app-game-card').first().click();

    cy.get('.subscribe').wait(1500).click();
  });
});
