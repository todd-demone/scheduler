import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    const placeholderText = getByPlaceholderText("Enter Student Name");
    expect(placeholderText).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
    );
    const studentNameInput = getByTestId("student-name-input");
    expect(studentNameInput).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop, the student prop should be blank or undefined */
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
    const errorMessage = getByText(/student name cannot be blank/i);

    expect(errorMessage).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("calls onSave function when the name is defined", () => {
    /* 1. Create the mock onSave function */
    const onSave = jest.fn();

    /* 2. Render the Form with interviewers, name and the onSave mock function passed as an onSave prop */
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Miller-Jones"
        onSave={onSave}
      />
    );
    /* 3. Click the save button */
    const saveButton = getByText("Save");
    fireEvent.click(saveButton);
    const errorMessage = queryByText(/student name cannot be blank/i);
    expect(errorMessage).toBeNull();
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });
});
