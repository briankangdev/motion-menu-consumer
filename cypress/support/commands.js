// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("waitForPageLoad", () => {
  // This function checks if the page is completely loaded and ready to interact with.
  const checkReadyState = (resolve) => {
    cy.document().then((doc) => {
      if (doc.readyState === "complete") {
        resolve();
      } else {
        // If the page is not ready yet, it waits for 100ms and checks again.
        setTimeout(() => checkReadyState(resolve), 100);
      }
    });
  };

  // Creates a new Cypress Promise that resolves when the page is fully loaded and ready.
  const waitForPageLoad = new Cypress.Promise((resolve) => {
    checkReadyState(resolve);
  });

  // This command wraps the Promise and sets a timeout of 10 seconds for the page to load.
  cy.wrap(waitForPageLoad, { timeout: 10000 });
});
