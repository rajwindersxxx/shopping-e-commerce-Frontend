import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import useAuth from "../../hooks/useAuth";
import { getAuthDetails, loginUser } from "../../api/auth";

function wrapper() {
  const queryclient = new QueryClient();
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryclient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  );
}
vi.mock("../../api/auth.ts", () => ({
  loginUser: vi.fn(),
  logoutUser: vi.fn(),
  getAuthDetails: vi.fn()
}))
describe("useAuth hook", () => {
  it("returns default state before fetching", () => {
    const { result } = renderHook(() => useAuth(), { wrapper: wrapper() });
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.role).toBe(null);
  });
  it("calls login and update role", async () => {
    vi.mocked(loginUser).mockResolvedValueOnce({
      role: "ADMIN",
      email: "test@gmail.com",
    });
    vi.mocked(getAuthDetails).mockResolvedValueOnce({
      role: "ADMIN",
      email: "test@gmail.com",
      id: 1,
      name: "test",
    });
    const { result } = renderHook(() => useAuth(), { wrapper: wrapper() });
    await act(async () => {
      result.current.login({ email: "test@gmail.com", password: "test" });
    });
    expect(result.current.role).toBe("ADMIN");
    expect(result.current.isLoggedIn).toBe(true);
  });
});
