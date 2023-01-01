describe('My First Test', () => {
  it('Sanity test', () => {
    // lgoin
    cy.visit('/');
  });

  it('should login to app', () => {
 
    cy.visit('/');

    // check if login button is visible
    cy.get('.login_btn').should('be.visible');
    // click on login button

    cy.get('.login_btn').wait(1500).click();
    // fill the form
    cy.get('input[name=email]').type('demo@demo.com');
    cy.get('input[name=password]').type('demodemo');

    // click on login button
    cy.get('.submit_btn').wait(1500).click();
  });

  it('logout of the app', () => {
    // click on logout button
    cy.contains('Logout').wait(1500).click();
  });
});
