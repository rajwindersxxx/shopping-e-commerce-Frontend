import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { useCustomParams } from "../../hooks/useCustomParams";

interface props {
  children: ReactNode;
}
function wrapper({ children }: props) {
  return (
    <MemoryRouter initialEntries={["/test?foo=123"]}>
      <Routes>
        <Route path="/test" element={children} />
      </Routes>
    </MemoryRouter>
  );
}
describe("useCustomParams", () => {
  it("getParams should return query values ", () => {
    const { result } = renderHook(() => useCustomParams(), { wrapper });
    const params = result.current.getParams("foo");
    expect(params.foo).toBe("123");
  });
  it("setParams should update query string", () => {
    const { result } = renderHook(() => useCustomParams(), { wrapper });
    act(() => {
      result.current.setParams({ bar: "456" });
    });
    const params = result.current.getParams("foo", "bar");
    expect(params.bar).toBe("456");
    expect(params.foo).toBe("123")
  });
});
