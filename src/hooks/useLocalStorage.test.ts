/**
 * Tests pour le hook useLocalStorage
 *
 * Tests des hooks personnalisés
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should use initial value when no stored value exists", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      expect(result.current[0]).toBe("initial");
    });

    it("should use stored value when it exists", () => {
      localStorage.setItem("test-key", JSON.stringify("stored"));

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      expect(result.current[0]).toBe("stored");
    });

    it("should handle objects", () => {
      const obj = { name: "test", value: 42 };
      localStorage.setItem("test-key", JSON.stringify(obj));

      const { result } = renderHook(() =>
        useLocalStorage("test-key", { name: "", value: 0 })
      );

      expect(result.current[0]).toEqual(obj);
    });
  });

  describe("setValue", () => {
    it("should update state and localStorage", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      act(() => {
        result.current[1]("updated");
      });

      expect(result.current[0]).toBe("updated");
      expect(localStorage.getItem("test-key")).toBe(JSON.stringify("updated"));
    });

    it("should support function updater", () => {
      const { result } = renderHook(() => useLocalStorage("test-key", 0));

      act(() => {
        result.current[1]((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);
    });

    it("should handle complex objects", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", { count: 0 })
      );

      act(() => {
        result.current[1]({ count: 5 });
      });

      expect(result.current[0]).toEqual({ count: 5 });
      expect(JSON.parse(localStorage.getItem("test-key")!)).toEqual({
        count: 5,
      });
    });
  });

  describe("Error handling", () => {
    it("should handle JSON parse errors gracefully", () => {
      localStorage.setItem("test-key", "invalid-json");

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "fallback")
      );

      expect(result.current[0]).toBe("fallback");
    });

    it("should handle localStorage errors", () => {
      const mockSetItem = vi.spyOn(Storage.prototype, "setItem");
      mockSetItem.mockImplementation(() => {
        throw new Error("QuotaExceededError");
      });

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial")
      );

      expect(() => {
        act(() => {
          result.current[1]("new value");
        });
      }).not.toThrow();

      mockSetItem.mockRestore();
    });
  });
});
