/**
 * ActionBar Component Tests
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { ActionBar } from "./ActionBar";

describe("ActionBar (Molecule)", () => {
  describe("Rendering", () => {
    it("should render discard and save buttons", () => {
      render(<ActionBar onDiscard={() => {}} onSave={() => {}} />);

      expect(
        screen.getByRole("button", { name: /discard/i })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });

    it("should render with custom labels", () => {
      render(
        <ActionBar
          discardLabel="Cancel"
          saveLabel="Confirm"
          onDiscard={() => {}}
          onSave={() => {}}
        />
      );

      expect(
        screen.getByRole("button", { name: /cancel/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /confirm/i })
      ).toBeInTheDocument();
    });
  });

  describe("User interactions", () => {
    it("should call onDiscard when discard button clicked", async () => {
      const user = userEvent.setup();
      const handleDiscard = vi.fn();

      render(<ActionBar onDiscard={handleDiscard} onSave={() => {}} />);

      const discardButton = screen.getByRole("button", { name: /discard/i });
      await user.click(discardButton);

      expect(handleDiscard).toHaveBeenCalledTimes(1);
    });

    it("should call onSave when save button clicked", async () => {
      const user = userEvent.setup();
      const handleSave = vi.fn();

      render(<ActionBar onDiscard={() => {}} onSave={handleSave} />);

      const saveButton = screen.getByRole("button", { name: /save/i });
      await user.click(saveButton);

      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });

  describe("Disabled states", () => {
    it("should disable discard button", () => {
      render(
        <ActionBar
          discardDisabled={true}
          onDiscard={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByRole("button", { name: /discard/i })).toBeDisabled();
    });

    it("should disable save button", () => {
      render(
        <ActionBar saveDisabled={true} onDiscard={() => {}} onSave={() => {}} />
      );

      expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
    });

    it("should disable both buttons", () => {
      render(
        <ActionBar
          discardDisabled={true}
          saveDisabled={true}
          onDiscard={() => {}}
          onSave={() => {}}
        />
      );

      expect(screen.getByRole("button", { name: /discard/i })).toBeDisabled();
      expect(screen.getByRole("button", { name: /save/i })).toBeDisabled();
    });
  });

  describe("Accessibility", () => {
    it("should be keyboard accessible", async () => {
      const user = userEvent.setup();
      const handleSave = vi.fn();

      render(<ActionBar onDiscard={() => {}} onSave={handleSave} />);

      await user.tab(); // Focus discard
      await user.tab(); // Focus save
      await user.keyboard("{Enter}");

      expect(handleSave).toHaveBeenCalledTimes(1);
    });
  });

  describe("Custom styling", () => {
    it("should accept custom className", () => {
      const { container } = render(
        <ActionBar
          className="custom-action-bar"
          onDiscard={() => {}}
          onSave={() => {}}
        />
      );

      expect(container.firstChild).toHaveClass("custom-action-bar");
    });
  });
});
