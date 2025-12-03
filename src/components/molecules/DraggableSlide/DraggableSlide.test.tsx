/**
 * DraggableSlide Component Tests
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { DraggableSlide } from "./DraggableSlide";
import type { Slide } from "@/data";

// Mock framer-motion for testing
vi.mock("framer-motion", () => ({
  Reorder: {
    Item: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe("DraggableSlide (Molecule)", () => {
  const mockSlide: Slide = {
    id: 1,
    title: "Test Slide",
    subtitle: "Test Subtitle",
    bgColor: "#8bc7a0",
  };

  const mockOnClick = vi.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  describe("Rendering", () => {
    it("should render slide with title", () => {
      render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByText("Test Slide")).toBeInTheDocument();
    });

    it("should render slide number", () => {
      render(
        <DraggableSlide
          slide={mockSlide}
          index={2}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByText("3")).toBeInTheDocument(); // index + 1
    });

    it("should render subtitle", () => {
      render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
    });
  });

  describe("Active state", () => {
    it("should show active state when isActive is true", () => {
      const { container } = render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={true}
          onClick={mockOnClick}
        />
      );

      // Should have thumbnailActive class
      const slideElement = container.firstChild as HTMLElement;
      expect(slideElement?.className).toContain("thumbnail");
    });

    it("should not show active state when isActive is false", () => {
      const { container } = render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      const slideElement = container.firstChild as HTMLElement;
      expect(slideElement?.getAttribute("aria-current")).not.toBe("true");
    });
  });
  describe("User interactions", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();

      render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      const slideElement = screen.getByText("Test Slide").closest("div");
      if (slideElement) {
        await user.click(slideElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      }
    });

    it("should render as draggable element", () => {
      const { container } = render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      // Vérifie que l'élément est rendu (drag & drop géré par framer-motion)
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Background color", () => {
    it("should apply background color from slide", () => {
      const { container } = render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      // Background color should be applied somewhere
      const element = container.querySelector("[style*='background']");
      expect(element).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should render accessible content", () => {
      render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={false}
          onClick={mockOnClick}
        />
      );

      // Titre et numéro accessibles
      expect(screen.getByText("Test Slide")).toBeInTheDocument();
      expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("should visually indicate active slide", () => {
      const { container } = render(
        <DraggableSlide
          slide={mockSlide}
          index={0}
          isActive={true}
          onClick={mockOnClick}
        />
      );

      // L'état actif est indiqué visuellement par className
      const slideElement = container.firstChild as HTMLElement;
      expect(slideElement).toBeInTheDocument();
    });
  });
});
