describe('Book Show', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should be enable for non owner', () => {
    // log out and login with another user

    cy.loginToApp('test1235@gmail.com', 'test123');

    cy.wait(3000);
    cy.visit('/bookShow');

    // get button and check btn is disabled or not

    cy.get('.bookshow_btn:nth-child(1)').first().wait(1500).click();
  });

  it('should be disable for owner', () => {
    cy.get('.logout-btn').click();
    cy.loginToApp('demo@demo.com', 'demodemo');
    cy.wait(2000);

    cy.visit('/bookShow');

    cy.wait(2000);

    // get button and check btn is disabled or not

    cy.get('.bookshow_btn').should('be.disabled');
  });
});
