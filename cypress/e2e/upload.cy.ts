/// <reference types="cypress" />

describe('Upload Video', () => {
  it('should upload video', () => {
    cy.visit('/');
    // check if login button is visible
    // cy.contains('Login')
    //   .should('be.visible')
    //   .then(() => cy.loginToApp('demo@demo.com', 'demodemo'));

    // if not then return

    // click on upload button
    cy.get('[routerlink="/upload"]').wait(1500).click();

    cy.wait(25000);
    cy.get('.upload_video').wait(1500).selectFile('video.mp4', {
      force: true,
    });
  });
});
