/**
 * QuestionForm Component Tests
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { QuestionForm } from "./QuestionForm";

describe("QuestionForm (Molecule)", () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockOnCancel.mockClear();
  });

  describe("Rendering", () => {
    it("should render form with title and type fields", () => {
      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByLabelText(/question title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/question type/i)).toBeInTheDocument();
    });

    it("should render submit and cancel buttons", () => {
      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(
        screen.getByRole("button", { name: /add question|create/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /cancel/i })
      ).toBeInTheDocument();
    });
  });

  describe("Edit mode", () => {
    it("should populate fields with question data", () => {
      const question = {
        id: 1,
        title: "What is TypeScript?",
        type: "Multiple Choice" as const,
      };

      render(
        <QuestionForm
          question={question}
          onSubmit={mockOnSubmit}
          onCancel={mockOnCancel}
        />
      );

      expect(
        screen.getByDisplayValue("What is TypeScript?")
      ).toBeInTheDocument();
    });
  });

  describe("Form validation", () => {
    it("should show error for empty title", async () => {
      const user = userEvent.setup();

      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/question title/i);
      await user.clear(titleInput);

      const submitButton = screen.getByRole("button", {
        name: /add question|create/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/le titre est requis|title.*required|required/i)
        ).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it("should show error for short title", async () => {
      const user = userEvent.setup();

      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/question title/i);
      await user.clear(titleInput);
      await user.type(titleInput, "Hi");

      const submitButton = screen.getByRole("button", {
        name: /add question|create/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/3 caractères|at least/i)).toBeInTheDocument();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe("Form submission", () => {
    it("should submit form with valid data", async () => {
      const user = userEvent.setup();

      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/question title/i);
      await user.clear(titleInput);
      await user.type(titleInput, "What is React?");

      const submitButton = screen.getByRole("button", {
        name: /add question|create/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith(
          expect.objectContaining({
            title: "What is React?",
          })
        );
      });
    });

    it("should call onCancel when cancel clicked", async () => {
      const user = userEvent.setup();

      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const cancelButton = screen.getByRole("button", { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe("Type selection", () => {
    it("should allow changing question type", async () => {
      const user = userEvent.setup();

      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const typeSelect = screen.getByLabelText(/question type/i);
      await user.selectOptions(typeSelect, "Rating");

      expect(typeSelect).toHaveValue("Rating");
    });
  });

  describe("Keyboard shortcuts", () => {
    it("should submit on Enter key", async () => {
      const user = userEvent.setup();

      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      const titleInput = screen.getByLabelText(/question title/i);
      await user.clear(titleInput);
      await user.type(titleInput, "Valid question");
      await user.keyboard("{Enter}");

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled();
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper labels", () => {
      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByLabelText(/question title/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/question type/i)).toBeInTheDocument();
    });

    it("should mark required fields", () => {
      render(<QuestionForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

      expect(screen.getByText(/\*/)).toBeInTheDocument();
    });
  });
});
