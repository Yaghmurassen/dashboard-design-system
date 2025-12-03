/**
 * Tests pour le composant Button (Atom)
 *
 * Stratégie de test :
 * 1. Rendering - Le composant s'affiche correctement
 * 2. Interactions - Gestion des clics, disabled, etc.
 * 3. Variants - Toutes les variantes visuelles
 * 4. Props - Toutes les combinaisons de props
 * 5. Accessibilité - ARIA, keyboard navigation
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button (Atom)", () => {
  describe("Rendering", () => {
    it("should render with text", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole("button")).toHaveClass("custom-class");
    });
  });

  describe("Interactions", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should not call onClick when disabled", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
      expect(button).toBeDisabled();
    });

    it("should be focusable with keyboard", async () => {
      const user = userEvent.setup();
      render(<Button>Focus me</Button>);

      const button = screen.getByRole("button");
      await user.tab();

      expect(button).toHaveFocus();
    });
  });

  describe("Variants", () => {
    it.each(["primary" as const, "secondary" as const, "tertiary" as const])(
      "should render %s variant",
      (variant) => {
        render(<Button variant={variant}>Button</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      }
    );
  });

  describe("Sizes", () => {
    it.each(["sm" as const, "md" as const, "lg" as const])(
      "should render %s size",
      (size) => {
        render(<Button size={size}>Button</Button>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      }
    );
  });

  describe("Props combinations", () => {
    it("should render fullWidth button", () => {
      render(<Button fullWidth>Full Width</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should render with type submit", () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });
  });

  describe("Accessibility", () => {
    it("should have accessible name", () => {
      render(<Button aria-label="Custom label">Icon only</Button>);
      expect(screen.getByLabelText(/custom label/i)).toBeInTheDocument();
    });

    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Press me</Button>);

      await user.tab();
      await user.keyboard("{Enter}");

      expect(handleClick).toHaveBeenCalled();
    });
  });
});
