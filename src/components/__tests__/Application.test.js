import React from "react";
import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
} from "@testing-library/react";
import Application from "components/Application";
import "../../__mocks__/axios";

afterEach(cleanup);

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   // Jest replaces the REAL axios library with the MOCK module imported by ../../__mocks__/axios
//   // Jest calls the mock axios.get function to get the fixture data

//   // pause until we get an element with the text "Monday"
//   // waitForElement returns a Promise and the promise either
//   // (a) resolves when the callback returns an element with the text "Monday" OR
//   // (b) rejects when the callback keeps trying to find "Monday" and then times out after a period...
//   return waitForElement(() => getByText("Monday")).then(() => {
//     // then click the Tuesday button
//     fireEvent.click(getByText("Tuesday"));
//     // assert that the text "Leopold Silvers" is in the document
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });

it("defaults to Monday, changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});
