/**
 * Card Component Tests
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import { Card, CardHeader, CardBody, CardFooter } from "./Card";

describe("Card (Atom)", () => {
  describe("Rendering", () => {
    it("should render card with children", () => {
      render(
        <Card>
          <p>Card content</p>
        </Card>
      );

      expect(screen.getByText("Card content")).toBeInTheDocument();
    });

    it("should render with custom className", () => {
      const { container } = render(
        <Card className="custom-class">Content</Card>
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Padding variants", () => {
    it.each<"none" | "sm" | "md" | "lg">(["none", "sm", "md", "lg"])(
      "should render with %s padding",
      (padding) => {
        const { container } = render(<Card padding={padding}>Content</Card>);

        expect(container.firstChild).toBeInTheDocument();
      }
    );
  });

  describe("Elevation variants", () => {
    it.each<0 | 1 | 2 | 3>([0, 1, 2, 3])(
      "should render with elevation %s",
      (elevation) => {
        const { container } = render(
          <Card elevation={elevation}>Content</Card>
        );

        expect(container.firstChild).toBeInTheDocument();
      }
    );
  });

  describe("Compound Components", () => {
    it("should render with Card.Header syntax", () => {
      render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });

    it("should render with legacy syntax", () => {
      render(
        <Card>
          <CardHeader>Header</CardHeader>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText("Header")).toBeInTheDocument();
      expect(screen.getByText("Body")).toBeInTheDocument();
      expect(screen.getByText("Footer")).toBeInTheDocument();
    });
  });

  describe("Custom element", () => {
    it("should render as different HTML element", () => {
      const { container } = render(<Card as="article">Content</Card>);

      expect(container.querySelector("article")).toBeInTheDocument();
    });

    it("should render as section by default", () => {
      const { container } = render(<Card as="section">Content</Card>);

      expect(container.querySelector("section")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should pass through aria attributes", () => {
      render(
        <Card aria-label="User card">
          <p>Content</p>
        </Card>
      );

      expect(screen.getByLabelText("User card")).toBeInTheDocument();
    });
  });
});
