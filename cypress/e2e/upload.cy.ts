/// <reference types="cypress" />

describe('Upload Video', () => {
  it('should upload video', () => {
    cy.visit('/');
    cy.loginToApp('demo@demo.com', 'demodemo');

    // click on upload button
    cy.clickNavBtn('Upload');

    cy.get('.upload_video').wait(1500).attachFile('video.mp4', {});
  });
});
