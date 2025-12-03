/**
 * ThemeToggle Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle (Molecule)", () => {
  describe("Rendering", () => {
    it("should render toggle button", () => {
      render(<ThemeToggle />);

      const button = screen.getByRole("button", {
        name: /switch to (dark|light) mode/i,
      });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Theme switching", () => {
    it("should toggle theme when clicked", async () => {
      const user = userEvent.setup();

      render(<ThemeToggle />);

      const button = screen.getByRole("button", {
        name: /switch to (dark|light) mode/i,
      });
      const initialLabel = button.getAttribute("aria-label");

      await user.click(button);

      const afterLabel = button.getAttribute("aria-label");
      expect(afterLabel).not.toBe(initialLabel);
    });

    it("should update on multiple clicks", async () => {
      const user = userEvent.setup();

      render(<ThemeToggle />);

      const button = screen.getByRole("button", {
        name: /switch to (dark|light) mode/i,
      });

      // Click multiple times
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(button).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have aria-label attribute", () => {
      render(<ThemeToggle />);

      const button = screen.getByRole("button", {
        name: /switch to (dark|light) mode/i,
      });
      expect(button).toHaveAttribute("aria-label");
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();

      render(<ThemeToggle />);

      await user.tab();
      const button = screen.getByRole("button", {
        name: /switch to (dark|light) mode/i,
      });
      expect(button).toHaveFocus();

      const beforeLabel = button.getAttribute("aria-label");
      await user.keyboard("{Enter}");
      const afterLabel = button.getAttribute("aria-label");

      expect(afterLabel).not.toBe(beforeLabel);
    });
  });

  describe("Icon display", () => {
    it("should render sun/moon icons", () => {
      const { container } = render(<ThemeToggle />);

      // Icons should be present (SVG or image)
      expect(
        container.querySelector("svg") || container.querySelector("img")
      ).toBeInTheDocument();
    });
  });
});
