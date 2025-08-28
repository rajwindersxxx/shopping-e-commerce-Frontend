import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { describe } from "node:test";
import { Input } from "../../components/ui/Input";

describe("Input component", () => {
  // Renders label correctly
  it("renders label when provided", () => {
    render(<Input label="Username" name="username" type="text" />);
    expect(screen.getByText(/username/i)).toBeInTheDocument();
  });

  // Shows required asterisk
  it("renders required asterisk if required prop is true", () => {
    render(<Input label="Email" name="email" type="email" required />);
    const label = screen.getByText(/email/i);
    expect(label).toHaveTextContent("*");
  });

  // Renders placeholder correctly
  it("renders placeholder", () => {
    render(<Input placeholder="Enter name" type="text" />);
    const input = screen.getByPlaceholderText(/enter name/i);
    expect(input).toBeInTheDocument();
  });

  // Renders disabled input
  it("renders disabled input when disabled prop is true", () => {
    render(<Input placeholder="Disabled" type="text" disabled />);
    const input = screen.getByPlaceholderText(/disabled/i);
    expect(input).toBeDisabled();
  });

  // Renders defaultValue correctly
  it("renders defaultValue correctly", () => {
    render(<Input placeholder="Name" type="text" defaultValue="John" />);
    const input = screen.getByPlaceholderText(/name/i);
    expect(input).toHaveValue("John");
  });

  // Controlled input accepts typing
  it("accepts user input when controlled", async () => {
    const user = userEvent.setup();
    let value = "";
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      value = value + e.target.value;
    };

    render(
      <Input
        placeholder="Type here"
        type="text"
        value={value}
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText(/Type here/i);
    await user.type(input, "Hello");
    // value won't update because it's controlled externally, but onChange called
    expect(value).toBe("Hello");
  });

  // Error message rendering
  it("renders error message if error prop is set", () => {
    render(<Input placeholder="Name" type="text" error="Invalid input" />);
    const error = screen.getByText(/invalid input/i);
    expect(error).toBeInTheDocument();
  });

  // Variant: rounded class applied
  it("applies rounded-full class for variant='rounded'", () => {
    render(<Input variant="rounded" type="text" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("rounded-full");
  });

  // Variant: default (non-rounded) class applied
  it("applies rounded class for default variant", () => {
    render(<Input type="text" />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("rounded"); // check your default class
  });

  // Children rendering
  it("renders children inside the component", () => {
    render(
      <Input type="text">
        <span data-testid="child">Child Element</span>
      </Input>,
    );
    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  // onChange is called
  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input placeholder="Type" type="text" onChange={handleChange} />);
    const input = screen.getByPlaceholderText(/type/i);
    await user.type(input, "abc");
    expect(handleChange).toHaveBeenCalledTimes(3); // one per character
  });

  // Renders type correctly
  it("applies correct type attribute", () => {
    render(<Input type="password" placeholder="Password" />);
    const input = screen.getByPlaceholderText(/password/i);
    expect(input).toHaveAttribute("type", "password");
  });
});
