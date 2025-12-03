/**
 * Tests pour le composant Icon (Atom)
 */

import { describe, it, expect } from "vitest";
import { render } from "@/tests/utils/test-utils";
import { Icon } from "./Icon";

describe("Icon (Atom)", () => {
  describe("Rendering", () => {
    it("should render list-view icon", () => {
      const { container } = render(<Icon name="list-view" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("should render update-photo icon", () => {
      const { container } = render(<Icon name="update-photo" />);
      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("Props", () => {
    it("should apply custom size", () => {
      const { container } = render(<Icon name="list-view" size={32} />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "32");
      expect(svg).toHaveAttribute("height", "32");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Icon name="list-view" className="custom" />
      );
      const span = container.querySelector("span");
      expect(span).toHaveClass("custom");
    });

    it("should use default size when not specified", () => {
      const { container } = render(<Icon name="list-view" />);
      const svg = container.querySelector("svg");
      expect(svg).toHaveAttribute("width", "20");
      expect(svg).toHaveAttribute("height", "20");
    });
  });

  describe("CSS inheritance", () => {
    it("should use currentColor for SVG strokes and fills", () => {
      const { container } = render(
        <div style={{ color: "red" }}>
          <Icon name="list-view" />
        </div>
      );
      const svg = container.querySelector("svg");
      // Vérifie que le SVG utilise currentColor dans ses attributs
      const rect = svg?.querySelector("rect");
      expect(rect).toHaveAttribute("fill", "currentColor");
    });
  });
});
