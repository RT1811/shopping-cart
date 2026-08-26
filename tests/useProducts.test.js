import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import useProducts from "../src/hooks/useProducts.js";

describe("useProducts", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it("starts in a loading state", () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
  });

  it("sets products on a successful fetch", async () => {
    const mockProducts = [{ id: 1, title: "Fake Product", price: 9.99 }];
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it("sets an error when the response is not ok", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("HTTP Error: 500");
    expect(result.current.products).toEqual([]);
  });

  it("sets an error when fetch itself rejects", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network failure"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network failure");
  });
});