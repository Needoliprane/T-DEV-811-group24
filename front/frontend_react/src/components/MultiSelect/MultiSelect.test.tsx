import { act, render, screen } from "@testing-library/react";
import MultiSelect from "./MultiSelect";
import "@testing-library/jest-dom";

const testLabel = "Test label";
const testOptions = [
  { label: "Test option 1", color: "rgb(239, 239, 239)" },
  { label: "Test option 2", color: "rgb(239, 239, 239)" },
  { label: "Test option 3", color: "rgb(239, 239, 239)" },
];
const testSelection = ["Test option 1"];
const testOnSelect = (val: string) => console.log(val);
const testOnSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
  console.log(e.target.value);

describe("MultiSelect", () => {
  beforeEach(() => {
    render(
      <MultiSelect
        label={testLabel}
        selection={testSelection}
        onSelect={testOnSelect}
        onSearch={testOnSearch}
        options={testOptions}
      />
    );
  });

  it("renders a label", () => {
    const name = testLabel + " " + testSelection.length;
    const label = screen.getByRole("button", {
      name: name,
    });
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe(name);
  });
});

describe("MultiSelect function", () => {
  beforeEach(() => {
    render(
      <MultiSelect
        label={testLabel}
        selection={testSelection}
        onSelect={testOnSelect}
        onSearch={testOnSearch}
        options={testOptions}
      />
    );
    const name = testLabel + " " + testSelection.length;
    const label = screen.getByRole("button", {
      name: name,
    });
    act(() => label.click());
  });

  it("renders a search input", () => {
    const search = screen.getByRole("searchbox");
    expect(search).toBeInTheDocument();
  });

  it("renders a list", () => {
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
  });

  it("renders a list item for each option", () => {
    const list = screen.getByRole("list");
    expect(list.children.length).toBe(testOptions.length + 1);
  });

  it("renders a list item with the correct text", () => {
    const list = screen.getByRole("list");
    expect(list.children[1].textContent).toBe(testOptions[0].label);
  });

  it("renders a list item with the correct color", () => {
    const list = screen.getByRole("list");
    expect((list.children[2] as HTMLElement).style.color).toBe(
      testOptions[1].color
    );
  });

  it("renders a list item with the correct background color", () => {
    const list = screen.getByRole("list");
    expect((list.children[2] as HTMLElement).style.backgroundColor).toBe(
      "white"
    );
  });

  it("renders a list item with the correct background color when selected", () => {
    const list = screen.getByRole("list");
    expect((list.children[1] as HTMLElement).style.backgroundColor).toBe(
      testOptions[0].color
    );
  });
});
