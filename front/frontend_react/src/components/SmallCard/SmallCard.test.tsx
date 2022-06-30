import { render, screen, within } from "@testing-library/react";
import SmallCard from "./SmallCard";
import "@testing-library/jest-dom";

describe("SmallCard", () => {
  const testCity = "Test city";
  const testDescription = "Test description";
  const testImage = "https://via.placeholder.com/1080x1080";
  const testDistance = 100;
  const testLink = "https://www.google.com";

  beforeEach(() => {
    render(
      <SmallCard
        city={testCity}
        description={testDescription}
        image={testImage}
        distance={testDistance}
        link={testLink}
      />
    );
  });

  it("renders a small card", () => {
    const card = screen.getByLabelText("small card");
    expect(card).toBeInTheDocument();
  });

  it("renders a city", () => {
    const container = screen.getByLabelText("card content");
    const city = within(container).getByRole("heading", {
      level: 3,
    });
    expect(city).toBeInTheDocument();
    expect(city.textContent).toBe(testCity);
  });

  it("renders a description", () => {
    const container = screen.getByLabelText("card content");
    const description = within(container).getByLabelText("description");
    expect(description).toBeInTheDocument();
    expect(description.textContent).toBe(testDescription);
  });

  it("renders a distance", () => {
    const container = screen.getByLabelText("card content");
    const distance = within(container).getByLabelText("distance");
    expect(distance).toBeInTheDocument();
    expect(distance.textContent).toBe(`${testDistance} km`);
  });
});
