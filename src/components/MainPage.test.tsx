import React from "react";
import { render, screen } from "@testing-library/react";
import { MainPage } from "./MainPage";

describe("Main page", () => {
  test("render loading while data fetching", async () => {
    render(<MainPage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
