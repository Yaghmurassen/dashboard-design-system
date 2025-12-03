/**
 * Image Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import { Image } from "./Image";

describe("Image (Atom)", () => {
  describe("Rendering", () => {
    it("should render image with src and alt", () => {
      render(<Image src="/test.jpg" alt="Test image" />);

      const img = screen.getByAltText("Test image");
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "/test.jpg");
    });

    it("should require alt text for accessibility", () => {
      render(<Image src="/test.jpg" alt="Descriptive text" />);

      expect(screen.getByAltText("Descriptive text")).toBeInTheDocument();
    });
  });

  describe("Object fit variants", () => {
    it.each<"contain" | "cover" | "fill" | "none" | "scale-down">([
      "contain",
      "cover",
      "fill",
      "none",
      "scale-down",
    ])("should render with object-fit %s", (objectFit) => {
      const { container } = render(
        <Image src="/test.jpg" alt="Test" objectFit={objectFit} />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe("Loading behavior", () => {
    it("should lazy load by default", () => {
      render(<Image src="/test.jpg" alt="Test" />);

      const img = screen.getByAltText("Test");
      expect(img).toHaveAttribute("loading", "lazy");
    });

    it("should support eager loading", () => {
      render(<Image src="/test.jpg" alt="Test" loading="eager" />);

      const img = screen.getByAltText("Test");
      expect(img).toHaveAttribute("loading", "eager");
    });
  });

  describe("Decoding", () => {
    it("should use async decoding by default", () => {
      render(<Image src="/test.jpg" alt="Test" />);

      const img = screen.getByAltText("Test");
      expect(img).toHaveAttribute("decoding", "async");
    });

    it("should support sync decoding", () => {
      render(<Image src="/test.jpg" alt="Test" decoding="sync" />);

      const img = screen.getByAltText("Test");
      expect(img).toHaveAttribute("decoding", "sync");
    });
  });

  describe("Custom styling", () => {
    it("should accept custom className", () => {
      render(<Image src="/test.jpg" alt="Test" className="custom-class" />);

      expect(screen.getByAltText("Test")).toHaveClass("custom-class");
    });
  });

  describe("Native attributes", () => {
    it("should support srcSet", () => {
      render(
        <Image
          src="/test.jpg"
          alt="Test"
          srcSet="/test-2x.jpg 2x, /test-3x.jpg 3x"
        />
      );

      const img = screen.getByAltText("Test");
      expect(img).toHaveAttribute("srcSet");
    });

    it("should support width and height", () => {
      render(<Image src="/test.jpg" alt="Test" width={200} height={100} />);

      const img = screen.getByAltText("Test");
      expect(img).toHaveAttribute("width", "200");
      expect(img).toHaveAttribute("height", "100");
    });
  });
});
