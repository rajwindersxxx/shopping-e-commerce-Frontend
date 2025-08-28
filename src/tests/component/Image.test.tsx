import { fireEvent, render, screen } from "@testing-library/react";
import { describe } from "node:test";
import Image from "../../components/ui/Image";
import { expect, it } from "vitest";

describe("Image component", () => {
  it("should show spinner initially", () => {
    render(<Image src="test.jpg" alt="test Image" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
  it("should hide spinner after image loads", () => {
    render(<Image src="test.jpg" alt="test image" />);
    const img = screen.getByAltText("test image");
    const spinner = screen.getByRole("status")
    expect(spinner).toBeInTheDocument()
    fireEvent.load(img)
    expect(screen.queryByRole("status")).not.toBeInTheDocument()
    expect(img).toHaveClass("opacity-100")
  });
});
