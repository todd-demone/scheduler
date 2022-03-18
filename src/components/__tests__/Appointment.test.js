import React from "react";
import { render } from "@testing-library/react";
import Appointment from "components/Appointment";

describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    // test code
  });

  xit("does something else it is supposed to do", () => {
    // test code
  });
});
