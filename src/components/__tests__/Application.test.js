import React from "react";
import axios from "axios";
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
  queryByAltText,
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
    const { container } = render(<Application />);

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

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3.1 Find the first Show component (booked appointment).
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );

    // 3.2 Click the Delete button on the Show component.
    const deleteButton = queryByAltText(appointment, "Delete");
    fireEvent.click(deleteButton);

    // 4. Check that the Confirm component is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the Confirm component.
    const confirmButton = queryByText(appointment, "Confirm");
    fireEvent.click(confirmButton);

    // 6. Check that the Status component is displayed with the text "Deleting"
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 7. Check that the Empty component (empty appointment element) is displayed
    await waitForElementToBeRemoved(() => queryByText(appointment, "Deleting"));
    expect(getByAltText(appointment, "Add")).toBeInTheDocument();

    // 8. Check that DayListItem component with the text "Monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    // 3. Find an existing interview
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    // 4. Click the edit button
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 5. Select (click) on the interviewer "Sylvia Palmer"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the save button
    fireEvent.click(queryByText(appointment, "Save"));

    // 7. Check that the 'Saving" element is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Check that the Show component is displayed and has the student "Archie Cohen" and interviewer ""
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));
    expect(getByText(appointment, "Sylvia Palmer")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Edit" button on the first appointment
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));

    // 4. Select the interviewer "Sylvia Palmer"
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the save button
    fireEvent.click(queryByText(appointment, "Save"));

    // 7. Check that the "Saving" element is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait for "Saving" element to be removed
    await waitForElementToBeRemoved(() => queryByText(appointment, "Saving"));

    // 9. Check that the Error component is displayed
    expect(
      getByText(appointment, /could not book appointment/i)
    ).toBeInTheDocument();

    // 9. Click the close button
    fireEvent.click(getByAltText(appointment, "Close"));

    // 10. Check that the 'Create' element is displayed
    expect(
      getByPlaceholderText(appointment, /enter student name/i)
    ).toBeInTheDocument();
  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. click the "Delete" button on the first appointment
    const appointment = getAllByTestId(container, "appointment").find(
      (appointment) => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    // 6. Click the confirm button
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 7. Check that the "Deleting" element is displayed
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    // 8. Wait for "Deleting" element to be removed
    await waitForElementToBeRemoved(() => queryByText(appointment, "Deleting"));

    // 9. Check that the Error component is displayed
    expect(
      getByText(appointment, /could not delete appointment/i)
    ).toBeInTheDocument();

    // 9. Click the close button
    fireEvent.click(getByAltText(appointment, "Close"));

    // 10. Check that the 'Empty' appointment component is displayed
    expect(queryByText(appointment, "Archie Cohen")).toBeInTheDocument();
  });
});
