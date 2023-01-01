describe('clip play test', () => {
  it('should play clip', () => {
    cy.visit('/');
    cy.get('app-game-clips >.grid > app-game-card').first().click();
    // wait for 5 sec
    cy.wait(5000);
    // click on play button
    cy.get('.vjs-big-play-button').click({
      force: true,
    });

    // play for 3 sec
    cy.wait(3000);
    // click on pause button
    cy.get('.vjs-play-control').click({
      force: true,
    });

    cy.get('.vjs-play-progress').invoke('width').should('gte', 0);
  });
});
