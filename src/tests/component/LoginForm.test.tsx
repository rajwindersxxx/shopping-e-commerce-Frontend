import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginForm from "../../components/forms/LoginForm";
import { MemoryRouter } from "react-router-dom";
const mockLogin = vi.fn();

vi.mock("../../context/AuthContext.tsx", () => {
  return {
    useAuthContext: () => ({
      login: mockLogin,
      isLoggingIn: false,
    }),
  };
});

describe("loginForm", () => {
  it("calls login with form Data", async () => {
    render(<MemoryRouter><LoginForm /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        {
          email: "test@gmail.com",
          password: "secret123",
        },
        expect.any(Object),
      );
    });
  });
});
