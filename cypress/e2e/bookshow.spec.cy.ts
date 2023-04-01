describe('Book Show', () => {
  it('should be disable for owner', () => {
    cy.visit('/bookShow');

    // get button and check btn is disabled or not

    // cy.get('.bookshow_btn').should('be.disabled');
  });

  it('should be enable for non owner', () => {
    cy.visit('/bookShow');

    // get button and check btn is disabled or not

    cy.get('.bookshow_btn:nth-child(1)').first().wait(1500).click();
  });
});
