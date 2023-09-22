import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer Component", () => {
  it("renders the Footer component", () => {
    render(<Footer />);

    // Check if the component renders without throwing any errors

    expect(screen.getByText("Quick Links")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("Recent Postes")).toBeInTheDocument();
    expect(screen.getByText("Payment Partner")).toBeInTheDocument();
  });
});
