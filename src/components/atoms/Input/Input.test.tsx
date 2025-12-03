/**
 * Input Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input (Atom)", () => {
  describe("Rendering", () => {
    it("should render input with placeholder", () => {
      render(<Input placeholder="Enter text" />);

      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    });

    it("should render with value", () => {
      render(<Input value="Test value" onChange={() => {}} />);

      expect(screen.getByDisplayValue("Test value")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it.each<"default" | "search">(["default", "search"])(
      "should render %s variant",
      (variant) => {
        render(<Input variant={variant} placeholder="Test" />);

        expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
      }
    );
  });

  describe("Sizes", () => {
    it.each<"sm" | "md" | "lg">(["sm", "md", "lg"])(
      "should render %s size",
      (size) => {
        render(<Input size={size} placeholder="Test" />);

        expect(screen.getByPlaceholderText("Test")).toBeInTheDocument();
      }
    );
  });

  describe("States", () => {
    it("should be disabled", () => {
      render(<Input disabled placeholder="Disabled" />);

      expect(screen.getByPlaceholderText("Disabled")).toBeDisabled();
    });

    it("should show error state", () => {
      render(<Input error placeholder="Error input" />);

      const input = screen.getByPlaceholderText("Error input");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Full width", () => {
    it("should render full width", () => {
      const { container } = render(<Input fullWidth placeholder="Test" />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("should call onChange when typing", async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} placeholder="Type here" />);

      const input = screen.getByPlaceholderText("Type here");
      await user.type(input, "Hello");

      expect(handleChange).toHaveBeenCalled();
      expect(handleChange).toHaveBeenCalledTimes(5); // "H", "e", "l", "l", "o"
    });

    it("should call onFocus when focused", async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} placeholder="Focus me" />);

      const input = screen.getByPlaceholderText("Focus me");
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("should call onBlur when blurred", async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Input onBlur={handleBlur} placeholder="Blur me" />);

      const input = screen.getByPlaceholderText("Blur me");
      await user.click(input);
      await user.tab(); // Blur by tabbing away

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("should support aria-label", () => {
      render(<Input aria-label="Search input" />);

      expect(screen.getByLabelText("Search input")).toBeInTheDocument();
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Keyboard test" />);

      await user.tab();
      expect(screen.getByPlaceholderText("Keyboard test")).toHaveFocus();
    });
  });

  describe("Input types", () => {
    it("should support different input types", () => {
      const { rerender } = render(<Input type="text" placeholder="Test" />);

      expect(screen.getByPlaceholderText("Test")).toHaveAttribute(
        "type",
        "text"
      );

      rerender(<Input type="email" placeholder="Test" />);
      expect(screen.getByPlaceholderText("Test")).toHaveAttribute(
        "type",
        "email"
      );

      rerender(<Input type="password" placeholder="Test" />);
      expect(screen.getByPlaceholderText("Test")).toHaveAttribute(
        "type",
        "password"
      );
    });
  });
});
