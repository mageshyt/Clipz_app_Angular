describe('create Show', () => {
  beforeEach(() => {
    cy.visit('/bookShow');
    cy.wait(3000);
  });

  it('click on create show', () => {
    cy.get('.make_show_btn').first().wait(1500).click();

    // set title

    cy.get('[label="Title"] > .flex > .block').type('cypress testing');

    // set description

    cy.get('[label="Description"] > .flex > .block').type(
      'cypress testing for the clipz app'
    );

    // set price

    cy.get('[label="Price"] > .flex > .block').type('100');

    cy.wait(1500);
    // category

    cy.get('[label="Category"] > .flex > .block').type('testing');

    cy.wait(1500);
    // set date

    cy.get('[label="Date"] > .flex > .block').type('2021-10-10');

    cy.wait(1500);

    // set time

    cy.get('[label="Time"] > .flex > .block').type('10:00');

    cy.wait(1500);
    // set thumbnail

    cy.get('.upload_image').wait(1500).selectFile('thumbnail.png');
  });
});

describe('delete show', () => {
  beforeEach(() => {
    cy.visit('/bookShow');
  });

  it('delete show present for owner', () => {
    // login with another user

    cy.wait(3000);
    cy.get('.delete_btn_show').first().wait(1500).click();
  });

  it('delete show not present for non owner', () => {
    cy.get('.logout-btn').click();

    // login with another user

    cy.loginToApp('test1235@gmail.com', 'test123');
    cy.wait(3000);
    cy.visit('/bookShow');
    cy.wait(2000);
    cy.get('.delete_btn_show').should('exist').not('be.visible');
  });
});
