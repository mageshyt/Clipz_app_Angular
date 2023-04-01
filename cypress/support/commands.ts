// create chainable

declare namespace Cypress {
  interface Chainable {
    loginToApp(email: string, password: string): void;
    clickNavBtn(label: string): void;
  }
}

Cypress.Commands.add('loginToApp', (email, password) => {
  // check if login button is visible
  // if not then return


  // click on login button

  cy.get('.login_btn').wait(1500).click();
  // fill the form
  cy.get('input[name=email]').type('demo@demo.com');
  cy.get('input[name=password]').type('demodemo');

  // click on login button
  cy.get('.submit_btn').wait(1500).click();
});

// ! to click nav btn

Cypress.Commands.add('clickNavBtn', (label) => {
  cy.contains(label).wait(1500).click();
});
