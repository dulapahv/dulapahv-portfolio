import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMediaQuery } from "./use-media-query";

describe("useMediaQuery", () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;
  let listeners: Array<(event: MediaQueryListEvent) => void> = [];

  beforeEach(() => {
    listeners = [];
    mockMatchMedia = vi.fn((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(
        (event: string, handler: (event: MediaQueryListEvent) => void) => {
          if (event === "change") {
            listeners.push(handler);
          }
        }
      ),
      removeEventListener: vi.fn(
        (event: string, handler: (event: MediaQueryListEvent) => void) => {
          if (event === "change") {
            const index = listeners.indexOf(handler);
            if (index !== -1) {
              listeners.splice(index, 1);
            }
          }
        }
      ),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: mockMatchMedia,
    });
  });

  it("should return false initially when media query does not match", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);
  });

  it("should return true initially when media query matches", () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      media: "(min-width: 768px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);
  });

  it("should update value when media query changes to match", async () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(false);

    // Simulate media query change
    const changeEvent = new Event("change") as MediaQueryListEvent;
    Object.defineProperty(changeEvent, "matches", { value: true });

    act(() => {
      for (const listener of listeners) {
        listener(changeEvent);
      }
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it("should update value when media query changes to not match", async () => {
    mockMatchMedia.mockReturnValue({
      matches: true,
      media: "(min-width: 768px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(
        (event: string, handler: (event: MediaQueryListEvent) => void) => {
          if (event === "change") {
            listeners.push(handler);
          }
        }
      ),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });

    const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    expect(result.current).toBe(true);

    // Simulate media query change
    const changeEvent = new Event("change") as MediaQueryListEvent;
    Object.defineProperty(changeEvent, "matches", { value: false });

    act(() => {
      for (const listener of listeners) {
        listener(changeEvent);
      }
    });

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  it("should handle different media queries", () => {
    renderHook(() => useMediaQuery("(min-width: 768px)"));
    renderHook(() => useMediaQuery("(prefers-color-scheme: dark)"));

    expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");
    expect(mockMatchMedia).toHaveBeenCalledWith("(prefers-color-scheme: dark)");
  });

  it("should clean up event listener on unmount", () => {
    const removeEventListener = vi.fn();
    mockMatchMedia.mockReturnValue({
      matches: false,
      media: "(min-width: 768px)",
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener,
      dispatchEvent: vi.fn(),
    });

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });

  it("should re-initialize when query changes", () => {
    const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: "(min-width: 768px)" },
    });

    expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 768px)");

    rerender({ query: "(min-width: 1024px)" });

    expect(mockMatchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
  });

  it("should handle complex media queries", () => {
    const complexQuery = "(min-width: 768px) and (max-width: 1024px)";
    renderHook(() => useMediaQuery(complexQuery));

    expect(mockMatchMedia).toHaveBeenCalledWith(complexQuery);
  });

  it("should handle orientation media queries", () => {
    const orientationQuery = "(orientation: portrait)";
    renderHook(() => useMediaQuery(orientationQuery));

    expect(mockMatchMedia).toHaveBeenCalledWith(orientationQuery);
  });

  it("should handle prefers-reduced-motion", () => {
    const motionQuery = "(prefers-reduced-motion: reduce)";
    renderHook(() => useMediaQuery(motionQuery));

    expect(mockMatchMedia).toHaveBeenCalledWith(motionQuery);
  });
});
