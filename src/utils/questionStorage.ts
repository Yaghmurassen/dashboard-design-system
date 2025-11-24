/**
 * Questions Storage Utilities
 * Fonctions pour gérer la persistance des questions
 */

import type { Question } from "@/data";

export const STORAGE_KEYS = {
  QUESTIONS_INSERT: "wooclap-questions-insert",
  QUESTIONS_UPDATE: "wooclap-questions-update",
} as const;

/**
 * Ajouter une question à une liste
 */
export const addQuestion = (
  questions: Question[],
  newQuestion: Omit<Question, "id">
): Question[] => {
  const maxId =
    questions.length > 0 ? Math.max(...questions.map((q) => q.id)) : 0;

  return [
    ...questions,
    {
      ...newQuestion,
      id: maxId + 1,
    },
  ];
};

/**
 * Supprimer une question par ID
 */
export const deleteQuestion = (
  questions: Question[],
  questionId: number
): Question[] => {
  return questions.filter((q) => q.id !== questionId);
};

/**
 * Mettre à jour une question
 */
export const updateQuestion = (
  questions: Question[],
  questionId: number,
  updates: Partial<Omit<Question, "id">>
): Question[] => {
  return questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q));
};

/**
 * Réorganiser les questions (drag & drop)
 */
export const reorderQuestions = (
  questions: Question[],
  startIndex: number,
  endIndex: number
): Question[] => {
  const result = Array.from(questions);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};
