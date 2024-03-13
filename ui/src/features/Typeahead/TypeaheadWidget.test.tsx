import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import TypeaheadWidgetComponent from "./TypeaheadWidget";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";

describe("TypeaheadWidget component", () => {
  test("renders correctly", () => {
    render(<TypeaheadWidgetComponent activeTab={1} />);
    const inputElement = screen.getByPlaceholderText("place");
    expect(inputElement).toBeInTheDocument();
  });

  test("changes text on input change", () => {
    render(<TypeaheadWidgetComponent activeTab={1} />);
    const inputElement = screen.getByPlaceholderText(
      "place"
    ) as HTMLInputElement;
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
    const inputElement = screen.getByPlaceholderText("place");
    fireEvent.change(inputElement, { target: { value: "Red" } });

    await waitFor(
      () => {
        expect(global.fetch).toHaveBeenCalledTimes(1);
      },
      { timeout: 1500 }
    );

    setTimeout(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8080/colors?q=Red"
      );
    }, 500); //
  });
});
