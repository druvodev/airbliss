import { render, screen } from "@testing-library/react";
import RecommendedFlights from "./RecommendedFlights";

it("should have 3 cards", () => {
  render(<RecommendedFlights />);
  const cardsContainer = screen.getByTestId("cards-container"); // Replace "cards-container" with the actual data-testid or selector for your container
  const cards = cardsContainer.querySelectorAll(".card"); // Replace ".card" with the actual selector for your card components
  expect(cards.length).toBe(3);
});
