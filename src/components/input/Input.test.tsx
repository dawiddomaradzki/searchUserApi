import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";

const mockedOnChange = jest.fn();
const mockedResetInput = jest.fn();

describe("Search input", () => {
  test("check if input is rendered", async () => {
    render(
      <Input
        onChange={mockedOnChange}
        resetInput={mockedResetInput}
        inputValue=""
      />
    );
    const inputElement = screen.getByPlaceholderText("Search User");
    expect(inputElement).toBeInTheDocument();
  });

  test("should be able to type in input", async () => {
    render(
      <Input
        onChange={mockedOnChange}
        resetInput={mockedResetInput}
        inputValue="Novak"
      />
    );
    const inputElement = screen.getByPlaceholderText("Search User");
    fireEvent.change(inputElement, {
      target: { value: "Novak" },
    });
    expect((inputElement as HTMLInputElement).value).toBe("Novak");
  });

  test("clear input on blur", async () => {
    render(
      <Input
        onChange={mockedOnChange}
        resetInput={mockedResetInput}
        inputValue="Novak"
      />
    );
    const inputElement = screen.getByPlaceholderText("Search User");
    fireEvent.change(inputElement, {
      target: { value: null },
    });
    expect((inputElement as HTMLInputElement).onblur).toBe(null);
  });
});
