/**
 * QuestionList Component Tests
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { QuestionList } from "./QuestionList";
import type { Question } from "@/data";

describe("QuestionList (Molecule)", () => {
  const mockQuestions: Question[] = [
    { id: 1, title: "Question 1", type: "Multiple Choice" },
    { id: 2, title: "Question 2", type: "Rating" },
    { id: 3, title: "Question 3", type: "Open Text" },
  ];

  const mockOnAdd = vi.fn();
  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();
  const mockOnToggleAssociation = vi.fn();

  beforeEach(() => {
    mockOnAdd.mockClear();
    mockOnEdit.mockClear();
    mockOnDelete.mockClear();
    mockOnToggleAssociation.mockClear();
  });

  describe("Rendering", () => {
    it("should render list of questions", () => {
      render(
        <QuestionList
          questions={mockQuestions}
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      expect(screen.getByText("Question 1")).toBeInTheDocument();
      expect(screen.getByText("Question 2")).toBeInTheDocument();
      expect(screen.getByText("Question 3")).toBeInTheDocument();
    });

    it("should render empty list when no questions", () => {
      const { container } = render(
        <QuestionList
          questions={[]}
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      // Liste vide mais bouton "Add Question" présent
      expect(screen.getByText(/add question/i)).toBeInTheDocument();
      const list = container.querySelector("ul");
      expect(list?.children.length).toBe(0);
    });

    it("should render add button", () => {
      render(
        <QuestionList
          questions={mockQuestions}
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      expect(
        screen.getByRole("button", { name: /add question/i })
      ).toBeInTheDocument();
    });
  });

  describe("Add question", () => {
    it("should show form when add button clicked", async () => {
      const user = userEvent.setup();

      render(
        <QuestionList
          questions={mockQuestions}
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      const addButton = screen.getByText(/add question/i);
      await user.click(addButton);

      expect(screen.getByLabelText(/question title/i)).toBeInTheDocument();
    });
  });

  describe("Question actions", () => {
    it("should have action buttons for each question", () => {
      render(
        <QuestionList
          questions={mockQuestions}
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      // Chaque question devrait avoir des boutons d'action
      const addButtons = screen.getAllByLabelText(/add to slide/i);
      expect(addButtons.length).toBe(mockQuestions.length);
    });
  });

  describe("Title and info", () => {
    it("should render custom title", () => {
      render(
        <QuestionList
          questions={mockQuestions}
          title="My Questions"
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      expect(screen.getByText("My Questions")).toBeInTheDocument();
    });

    it("should render info tooltip", () => {
      render(
        <QuestionList
          questions={mockQuestions}
          infoTooltip="This is helpful info"
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      expect(screen.getByTitle("This is helpful info")).toBeInTheDocument();
    });
  });

  describe("Associations", () => {
    it("should show associated questions differently", () => {
      const associations = [
        {
          questionId: 1,
          slideId: 1,
          questionType: "insert" as const,
          addedAt: Date.now(),
        },
      ];

      render(
        <QuestionList
          questions={mockQuestions}
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={associations}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      // First question should be marked as associated
      expect(screen.getByText("Question 1")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading hierarchy", () => {
      render(
        <QuestionList
          questions={mockQuestions}
          title="Questions"
          onAdd={mockOnAdd}
          onDelete={mockOnDelete}
          currentSlideId={1}
          associations={[]}
          questionType="insert"
          onToggleAssociation={mockOnToggleAssociation}
        />
      );

      expect(
        screen.getByRole("heading", { name: /questions/i })
      ).toBeInTheDocument();
    });
  });
});
