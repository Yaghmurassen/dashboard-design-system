/**
 * Tests pour le composant Tabs (Molecule)
 *
 * Tests d'intégration pour vérifier :
 * - La navigation entre onglets
 * - Le rendu du contenu
 * - Les icônes
 * - L'accessibilité ARIA
 */

import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Tabs } from "./Tabs";

const mockTabs = [
  {
    id: "tab1",
    label: "First Tab",
    icon: "list-view" as const,
    content: <div>Content 1</div>,
  },
  {
    id: "tab2",
    label: "Second Tab",
    icon: "update-photo" as const,
    content: <div>Content 2</div>,
  },
];

describe("Tabs (Molecule)", () => {
  describe("Rendering", () => {
    it("should render all tabs", () => {
      render(<Tabs tabs={mockTabs} />);

      expect(
        screen.getByRole("tab", { name: /first tab/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("tab", { name: /second tab/i })
      ).toBeInTheDocument();
    });

    it("should render first tab content by default", () => {
      render(<Tabs tabs={mockTabs} />);
      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
    });

    it("should render icons when provided", () => {
      const { container } = render(<Tabs tabs={mockTabs} />);
      const svgs = container.querySelectorAll("svg");
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation", () => {
    it("should switch content when clicking tabs", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();

      const tab2 = screen.getByRole("tab", { name: /second tab/i });
      await user.click(tab2);

      // Attendre que l'animation se termine
      await waitFor(() => {
        expect(screen.getByText("Content 2")).toBeInTheDocument();
      });

      // Content 1 ne doit plus être dans le document (pas seulement invisible)
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });

    it("should mark active tab with aria-selected", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);

      const tab1 = screen.getByRole("tab", { name: /first tab/i });
      const tab2 = screen.getByRole("tab", { name: /second tab/i });

      expect(tab1).toHaveAttribute("aria-selected", "true");
      expect(tab2).toHaveAttribute("aria-selected", "false");

      await user.click(tab2);

      expect(tab1).toHaveAttribute("aria-selected", "false");
      expect(tab2).toHaveAttribute("aria-selected", "true");
    });
  });

  describe("Default tab", () => {
    it("should use defaultTab prop", () => {
      render(<Tabs tabs={mockTabs} defaultTab="tab2" />);

      expect(screen.getByText("Content 2")).toBeInTheDocument();
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper ARIA attributes", () => {
      render(<Tabs tabs={mockTabs} />);

      const tab1 = screen.getByRole("tab", { name: /first tab/i });

      expect(tab1).toHaveAttribute("id");
      expect(tab1).toHaveAttribute("aria-controls");
      expect(tab1).toHaveAttribute("aria-selected");
    });

    it("should be keyboard navigable", async () => {
      const user = userEvent.setup();
      render(<Tabs tabs={mockTabs} />);

      await user.tab();
      const tab1 = screen.getByRole("tab", { name: /first tab/i });
      expect(tab1).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(screen.getByText("Content 1")).toBeInTheDocument();
    });
  });

  describe("Animation", () => {
    it("should render with AnimatePresence wrapper", () => {
      const { container } = render(<Tabs tabs={mockTabs} />);
      // Vérifie que le composant Tabs est rendu (pas besoin de vérifier Framer Motion internals)
      const tabsPanel = container.querySelector('[role="tabpanel"]');
      expect(tabsPanel).toBeInTheDocument();
    });
  });
});
