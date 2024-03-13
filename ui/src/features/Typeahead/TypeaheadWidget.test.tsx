import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TypeaheadWidgetComponent from "./TypeaheadWidget";
import "@testing-library/jest-dom";
import { BASE_URL } from "../../shared/consts";

describe("TypeaheadWidget component", () => {
  test("renders correctly", () => {
    render(<TypeaheadWidgetComponent activeTab={1} />);
    const inputElement = screen.getByTestId("color-input");
    expect(inputElement).toBeInTheDocument();
  });

  test("changes text on input change", () => {
    render(<TypeaheadWidgetComponent activeTab={1} />);
    const inputElement = screen.getByTestId("color-input") as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "New Text" } });
    expect(inputElement.value).toBe("New Text");
  });

  test("fetches suggestions on input change", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({ items: [{ name: "Red" }, { name: "Blue" }] }),
    });

    render(<TypeaheadWidgetComponent activeTab={1} />);
    const inputElement = screen.getByTestId("color-input");
    fireEvent.change(inputElement, { target: { value: "Red" } });

    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );

    setTimeout(() => {
      expect(global.fetch).toHaveBeenCalledWith(`${BASE_URL}?q=Red`);
    }, 500);
  });
});
