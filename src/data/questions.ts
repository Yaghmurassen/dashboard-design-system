/**
 * Questions Data
 * Mock data pour les questions
 */

export type QuestionType =
  | "Multiple Choice"
  | "Rating"
  | "Open Text"
  | "Poll"
  | "Text Input"
  | "Color Picker"
  | "Action"
  | "Drag & Drop";

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
}

export const QUESTIONS_INSERT: Question[] = [
  {
    id: 1,
    title: "What is your favorite programming language?",
    type: "Multiple Choice",
  },
  {
    id: 2,
    title: "Rate your experience with TypeScript",
    type: "Rating",
  },
  {
    id: 3,
    title: "Describe your ideal development environment",
    type: "Open Text",
  },
  {
    id: 4,
    title: "Which design pattern do you use most?",
    type: "Multiple Choice",
  },
  {
    id: 5,
    title: "How often do you write tests?",
    type: "Poll",
  },
];

export const QUESTIONS_UPDATE: Question[] = [
  {
    id: 1,
    title: "Update presentation title",
    type: "Text Input",
  },
  {
    id: 2,
    title: "Change slide background color",
    type: "Color Picker",
  },
  {
    id: 3,
    title: "Add new slide after current",
    type: "Action",
  },
  {
    id: 4,
    title: "Reorder slides",
    type: "Drag & Drop",
  },
  {
    id: 5,
    title: "Delete selected slide",
    type: "Action",
  },
];
