import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import OurServices from "./OurServices";

// Mock the global fetch function
global.fetch = jest.fn();

describe("OurServices Component", () => {
  it("renders the component with fetched data", async () => {
    // Mock a successful fetch response
    global.fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve([
          { title: "Service 1", details: "Details 1", image: "image1.jpg" },
        ]),
    });

    render(<OurServices />);

    // Wait for the data to be fetched
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Your assertions for the rendered component with fetched data
    expect(screen.getByText("Service 1")).toBeInTheDocument();
    expect(screen.getByText("Details 1")).toBeInTheDocument();
  });

  it("renders an error message when data fetching fails", async () => {
    // Mock a failed fetch response
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch data"));

    render(<OurServices />);

    // Wait for the data fetching to occur and fail
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    // Assert that the error message is rendered
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });
});
