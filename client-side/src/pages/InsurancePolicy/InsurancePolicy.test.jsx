import React from "react";
import { render, screen } from "@testing-library/react";
import InsurancePolicy from "./InsurancePolicy";

describe("InsurancePolicy Component", () => {
  it("renders the component without errors", () => {
    render(<InsurancePolicy />);

    // Check if the component renders without throwing any errors
    expect(
      screen.getByText("Important Disclosures and Insurance Policy")
    ).toBeInTheDocument();
    expect(screen.getByText("Important Disclosures")).toBeInTheDocument();
    expect(screen.getByText("Cancellation Policy")).toBeInTheDocument();
    expect(screen.getByText("Travel Documents")).toBeInTheDocument();
    expect(screen.getByText("Baggage Policy")).toBeInTheDocument();
    expect(screen.getByText("Check-in and Boarding")).toBeInTheDocument();
    expect(screen.getByText("Insurance Policy")).toBeInTheDocument();
    expect(screen.getByText("Coverage")).toBeInTheDocument();
    expect(screen.getByText("Trip Cancellation Coverage:")).toBeInTheDocument();
    expect(screen.getByText("Delayed Flight Coverage:")).toBeInTheDocument();
    expect(screen.getByText("Lost Luggage Coverage:")).toBeInTheDocument();
    expect(
      screen.getByText("Medical Coverage During Your Trip:")
    ).toBeInTheDocument();
    expect(screen.getByText("Policy Terms")).toBeInTheDocument();
    expect(screen.getByText("Claims Procedure")).toBeInTheDocument();
  });

  it("matches snapshot", () => {
    const { asFragment } = render(<InsurancePolicy />);
    // Compare the rendered component with a saved snapshot
    expect(asFragment()).toMatchSnapshot();
  });
});
