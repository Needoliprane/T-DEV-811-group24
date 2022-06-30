import { render, screen } from "@testing-library/react";
import Collection from "./Collection";
import "@testing-library/jest-dom";

describe("Collection", () => {
  it("renders the component", () => {
    render(<Collection />);
  });

  it("renders a collection", () => {
    render(<Collection />);
    const collection = screen.getByRole("region", { name: "collection" });
    expect(collection).toBeInTheDocument();
  });

  it("renders a collection with a title", () => {
    const title = "Test collection title";
    render(<Collection title={title} />);

    const heading = screen.getByRole("heading", {
      name: "collection title",
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe(title);
  });
});
