import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";
import Application from "components/Application";
import "../../__mocks__/axios";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday, changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Add" button on the first empty appointment
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    const addButton = getByAltText(appointment, "Add");
    fireEvent.click(addButton);

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    const inputField = getByPlaceholderText(appointment, /enter student name/i);
    fireEvent.change(inputField, {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click the first interviewer in the list.
    const interviewer = getByAltText(appointment, "Sylvia Palmer");
    fireEvent.click(interviewer);

    // 6. Click the "Save" button on that same appointment.
    const saveButton = getByText(appointment, "Save");
    fireEvent.click(saveButton);

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();

    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    const days = getAllByTestId(container, "day");
    const day = days.find((day) => queryByText(day, "Monday"));
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });
});
