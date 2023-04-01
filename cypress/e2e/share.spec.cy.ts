describe('Like ,subscribe', () => {
 

    it('Share the Video', () => {
      cy.visit('/');
      cy.get('app-game-clips >.grid > app-game-card').first().click();

      cy.get('.share_video').wait(1500).click();
      cy.wait(1500);
    });

 
});
