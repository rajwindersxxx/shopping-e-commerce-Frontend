import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CartButton from "../../components/ui/CartButton";
import { MemoryRouter } from "react-router-dom";

describe("Cart button", () => {
  it("should render components", () => {
    render(
      <MemoryRouter>
        <CartButton totalCartItems={2} />
      </MemoryRouter>,
    );
    expect(screen.getByText("2")).toBeInTheDocument();
  });
  it("should not return component", () => {
    render(
      <MemoryRouter>
        <CartButton totalCartItems={0} />
      </MemoryRouter>,
    );
    expect(screen.queryByText("0")).not.toBeInTheDocument();
  });
});
