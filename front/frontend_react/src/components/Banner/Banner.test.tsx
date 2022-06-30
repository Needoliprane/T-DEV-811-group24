import { render, screen, within } from "@testing-library/react";
import Banner from "./Banner";
import "@testing-library/jest-dom";

describe("Banner without state change", () => {
  beforeEach(() => {
    render(<Banner />);
  });

  it("renders a banner", () => {
    const banner = screen.getByLabelText("banner");
    expect(banner).toBeInTheDocument();
  });

  it("renders an image within the banner", () => {
    const banner = screen.getByLabelText("banner");
    const image = within(banner).getByAltText("background");
    expect(image).toBeInTheDocument();
  });

  it("renders a text within the banner", () => {
    const banner = screen.getByLabelText("banner");
    const text = within(banner).getByLabelText("discover text");
    expect(text).toBeInTheDocument();
    expect(text.textContent).toBe("Discover activities nearby !");
  });

  it("renders a button within the banner", () => {
    const banner = screen.getByLabelText("banner");
    const button = within(banner).getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe("Learn more");
  });
});
