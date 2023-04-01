/// <reference types="cypress" />

describe('Upload Video', () => {
  it('should upload video', () => {
    cy.visit('/');
    // check if login button is visible
    // if not then return

    // click on upload button
    cy.get('[routerlink="/upload"]').wait(1500).click();

    // cy.get('.upload_video').wait(1500).attachFile('video.mp4', {});
  });
});
