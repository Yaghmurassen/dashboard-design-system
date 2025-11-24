/**
 * Question-Slide Associations
 * Gestion des liens entre questions et slides
 */

export interface QuestionSlideAssociation {
  questionId: number;
  slideId: number;
  questionType: "insert" | "update";
  addedAt: number; // timestamp
}

export const STORAGE_KEY_ASSOCIATIONS = "wooclap-question-slide-associations";

/**
 * Associer une question à un slide
 */
export const addAssociation = (
  associations: QuestionSlideAssociation[],
  questionId: number,
  slideId: number,
  questionType: "insert" | "update"
): QuestionSlideAssociation[] => {
  // Vérifier si l'association existe déjà
  const exists = associations.some(
    (a) =>
      a.questionId === questionId &&
      a.slideId === slideId &&
      a.questionType === questionType
  );

  if (exists) return associations;

  return [
    ...associations,
    {
      questionId,
      slideId,
      questionType,
      addedAt: Date.now(),
    },
  ];
};

/**
 * Retirer une association
 */
export const removeAssociation = (
  associations: QuestionSlideAssociation[],
  questionId: number,
  slideId: number,
  questionType: "insert" | "update"
): QuestionSlideAssociation[] => {
  return associations.filter(
    (a) =>
      !(
        a.questionId === questionId &&
        a.slideId === slideId &&
        a.questionType === questionType
      )
  );
};

/**
 * Obtenir toutes les questions associées à un slide
 */
export const getQuestionsForSlide = (
  associations: QuestionSlideAssociation[],
  slideId: number
): QuestionSlideAssociation[] => {
  return associations.filter((a) => a.slideId === slideId);
};

/**
 * Obtenir tous les slides associés à une question
 */
export const getSlidesForQuestion = (
  associations: QuestionSlideAssociation[],
  questionId: number,
  questionType: "insert" | "update"
): QuestionSlideAssociation[] => {
  return associations.filter(
    (a) => a.questionId === questionId && a.questionType === questionType
  );
};

/**
 * Vérifier si une question est associée à un slide
 */
export const isQuestionAssociated = (
  associations: QuestionSlideAssociation[],
  questionId: number,
  slideId: number,
  questionType: "insert" | "update"
): boolean => {
  return associations.some(
    (a) =>
      a.questionId === questionId &&
      a.slideId === slideId &&
      a.questionType === questionType
  );
};
