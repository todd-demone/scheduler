// Default Assertions
// many cy commands have a built-in assertion.
// cy.contains by default asserts (more specifically, expects) the content to exist in the DOM
// if the content doesn't exist, the test fails
// DOM-based commands will wait for their elements to appear before eventually failing
// action-based commands (click, type) wait for their element to be in an actionable state before failing
// cypress waits for elements to pass their default assertions (ie have timeout values)
// if you want it to wait until element disappears, add .should('not.exist')

describe("Appointment", () => {
  beforeEach(() => {
    // Reset the database
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    // Ensure that data loads - ie check that the text "Monday" is in the DOM
    cy.contains("Monday");
  });

  it("should book an interview", () => {
    // click the first Add button
    cy.get("[alt=Add]").first().click();

    // Type the name "Lydia Miller-Jones" into the student input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Select the interviewer with the name "Sylvia Palmer"
    cy.get("[alt='Sylvia Palmer']").click();

    // Click the save button
    cy.contains("Save").click();

    // Verify that Appointment has student and interviewer names and has class .appointment__card--show
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    // click the edit button
    cy.get("[alt=Edit]").first().click({ force: true });

    // clear the student input field and type a new name
    cy.get("[data-testid=student-name-input]").clear().type("Ed Itappointment");

    // select the interviewer "Tori Malcolm"
    cy.get("[alt='Tori Malcolm']").click();

    // Click the save button
    cy.contains("Save").click();

    // Verify that Appointment has student and interviewer names and has class .appointment__card--show
    cy.contains(".appointment__card--show", "Ed Itappointment");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    // click the delete button for the existing appointment
    cy.get("[alt=Delete]").first().click({ force: true });

    // click the confirm button
    cy.contains("Confirm").click();

    // check that the appointment slot is empty (multiple steps):

    // 1. check that "Deleting" indicator exists
    cy.contains("Deleting").should("exist");

    // 2. check that "Deleting" indicator does not exist
    cy.contains("Deleting").should("not.exist");

    // 3. check that the .appointment__card--show element that contains text "Archie Cohen" does not exist
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
