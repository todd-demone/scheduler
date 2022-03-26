describe("Navigation", () => {
  // Cypress Docs notes:
  // Cypress methods - .visit(), .get(), .contains(), .url(), .type(), .click(), .should()

  // Cypress is like jQuery in some ways but not others
  // cy.get('.my-selector') is like $('.my-selector') - grabs an element
  // but unlike jquery there is no return object to be assigned to a variable
  // instead you chain a .then() with a callback function that receives element as 1st argument
  // also if no element is found after a period of time cypress simply times out and fails the test (jquery returns empty element/collection)

  // Best practice for selecting elements
  // anti-pattern: targetting elements based on CSS attributes - subject to change, which breaks tests
  // targetting based on #id or [atttribute=value] better than <tag> or .class, but not ideal
  // targeting based on text content OK in some cases, but brittle since text content can change
  // cy.contains('Some text') - find an element that contains this text
  // best practice for selecting elements: target based on [data-cy=submit] (aka data-* attributes) - isolated from changes since used only for testing
  // options - data-cy, data-test, or data-testid
  // cy.get(`[data-test=${selector}]`, ..args)
  // cy.get('[data-testid=day]').contains('Tuesday')

  // Assertions - checking that an element is visible, has an attribute, CSS class or state
  // i.e., you describe the desired state of your application
  // assertions can be chained to the end of a query
  // e.g., should('have.class', ...), should('be.disabled'), should('not.have.value', ...)
  // .should("have.css", "background-color", "rgb(242, 242, 242)");

  // Commands are async
  // Cypress invokes a test function, but it doesn't immediately run each statement in the function
  // Rather, it puts each statement in a queue to be run later.
  // When the function is finished running, it runs each statement in the queue
  // Exception - synchronous Cypress commands (e.g., Cypress.$('new-el')) is run immediately
  // best practice - if you want sync commands to wait for prior async commands to run, chain them to the prior command with a .then()
  // avoid loops
  // can't use async/await in Cypress - regular Promise syntax only

  // Commands run serially
  // once Cypress starts executing commands in the queue, the commands run one after the other
  // commands don't run in parallel to each other
  // because Cypress waits a set amount of time for each command to resolve
  // amount of time it waits (aka timeout value) depends on the command

  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
