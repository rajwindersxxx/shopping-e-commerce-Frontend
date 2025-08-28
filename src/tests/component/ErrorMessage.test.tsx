import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { expect, it } from "vitest";

describe("ErrorMessage", () => {
  it("should return error message", () => {
    render(<ErrorMessage>this is error message</ErrorMessage>);
    expect(screen.getByText("this is error message")).toBeInTheDocument();
  });
});
