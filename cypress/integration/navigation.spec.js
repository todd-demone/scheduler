describe("Navigation", () => {
  it("should visit root", () => {
    // cypress methods - .visit(), .get(), .contains(), .url(), .type(), .click(), .should()
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    // cy.get('.my-selector') is like $('.my-selector') - grabs an element
    // but unlike jquery there is no return object to be assigned to a variable
    // instead you chain a .then() with a callback function that receives element as 1st argument
    // also if no element is found after a period of time cypress simply times out and fails the test (jquery returns empty element/collection)

    // anti-pattern: targetting elements based on CSS attributes - subject to change, which breaks tests
    // targetting based on #id or [atttribute=value] better than <tag> or .class, but not ideal
    // targeting based on text content OK in some cases, but brittle since text content can change
    // cy.contains('Some text') - find an element that contains this text

    // best practice for selecting elements: target based on [data-cy=submit] (aka data-* attributes) - isolated from changes since used only for testing
    // options - data-cy, data-test, or data-testid
    // cy.get(`[data-test=${selector}]`, ..args)
    // cy.get('[data-testid=day]').contains('Tuesday')
    cy.contains("[data-testid=day]", "Tuesday")
      .click()

      // assertion - checking that an element is visible, has an attribute, CSS class or state
      // i.e., you describe the desired state of your application
      // assertions can be chained to the end of a query
      // e.g., should('have.class', ...), should('be.disabled'), should('not.have.value', ...)
      // .should("have.css", "background-color", "rgb(242, 242, 242)");
      .should("have.class", "day-list__item--selected");
  });
});
