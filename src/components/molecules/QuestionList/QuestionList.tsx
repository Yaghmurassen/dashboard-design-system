/**
 * QuestionList Component (Molecule)
 * Liste de questions avec tooltip info et actions
 */

import React, { useState } from "react";
import { Modal, QuestionForm, Button } from "@/components";
import type { Question } from "@/data";
import type { QuestionSlideAssociation } from "@/utils/questionSlideAssociations";
import styles from "./QuestionList.module.scss";

export interface QuestionListProps {
  questions: Question[];
  title?: string;
  infoTooltip?: string;
  onAdd?: (question: Omit<Question, "id">) => void;
  onEdit?: (id: number, question: Omit<Question, "id">) => void;
  onDelete?: (id: number) => void;
  // Nouveaux props pour les associations
  currentSlideId?: number;
  associations?: QuestionSlideAssociation[];
  questionType?: "insert" | "update";
  onToggleAssociation?: (questionId: number, slideId: number) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  title = "Questions",
  infoTooltip = "How to participate",
  onAdd,
  onEdit,
  onDelete,
  currentSlideId,
  associations = [],
  questionType = "insert",
  onToggleAssociation,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (question: Question) => {
    setEditingQuestion(question);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  const handleSubmit = (questionData: Omit<Question, "id">) => {
    if (editingQuestion && onEdit) {
      onEdit(editingQuestion.id, questionData);
    } else if (onAdd) {
      onAdd(questionData);
    }
    handleCloseModal();
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      onDelete?.(id);
    }
  };

  const isAssociated = (questionId: number) => {
    if (!currentSlideId) return false;
    return associations.some(
      (a) =>
        a.questionId === questionId &&
        a.slideId === currentSlideId &&
        a.questionType === questionType
    );
  };

  const getAssociatedSlideCount = (questionId: number) => {
    return associations.filter(
      (a) => a.questionId === questionId && a.questionType === questionType
    ).length;
  };

  return (
    <div className={styles.questionList}>
      {/* Header avec tooltip */}
      <div className={styles.questionListHeader}>
        <h3 className={styles.questionListTitle}>{title}</h3>
        <button
          className={styles.questionListInfo}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          aria-label="Information"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="10"
              cy="10"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M10 14V10M10 6H10.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Tooltip */}
          {showTooltip && (
            <span className={styles.questionListTooltip}>{infoTooltip}</span>
          )}
        </button>
      </div>
      {/* Bouton d'ajout */}
      {onAdd && (
        <div className={styles.questionListAddButton}>
          <Button
            variant="primary"
            size="sm"
            onClick={handleOpenAddModal}
            fullWidth
          >
            + Add Question
          </Button>
        </div>
      )}
      {/* Liste des questions */}
      <ul className={styles.questionListItems}>
        {questions.map((question, index) => {
          const isCurrentSlideAssociated = isAssociated(question.id);

          return (
            <li
              key={question.id}
              className={`${styles.questionListItem} ${
                isCurrentSlideAssociated
                  ? styles["questionListItem--associated"]
                  : ""
              }`}
            >
              <span className={styles.questionListNumber}>{index + 1}</span>
              <div className={styles.questionListContent}>
                <p className={styles.questionListItemTitle}>{question.title}</p>
                <div className={styles.questionListItemMeta}>
                  {question.type && (
                    <span className={styles.questionListItemType}>
                      {question.type}
                    </span>
                  )}
                  {isCurrentSlideAssociated && (
                    <span className={styles.questionListItemCurrentBadge}>
                      On this slide
                    </span>
                  )}
                  {getAssociatedSlideCount(question.id) > 0 && (
                    <span className={styles.questionListItemBadge}>
                      {getAssociatedSlideCount(question.id)} slide
                      {getAssociatedSlideCount(question.id) > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className={styles.questionListActions}>
                {/* Bouton d'association avec le slide actuel */}
                {onToggleAssociation && currentSlideId && (
                  <button
                    onClick={() =>
                      onToggleAssociation(question.id, currentSlideId)
                    }
                    className={styles.questionListActionButton}
                    aria-label={
                      isAssociated(question.id)
                        ? "Remove from slide"
                        : "Add to slide"
                    }
                    title={
                      isAssociated(question.id)
                        ? "Remove from current slide"
                        : "Add to current slide"
                    }
                  >
                    {isAssociated(question.id) ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 5v14m-7-7h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                )}

                {onEdit && (
                  <button
                    onClick={() => handleOpenEditModal(question)}
                    className={styles.questionListActionButton}
                    aria-label="Edit"
                    title="Edit question"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => handleDelete(question.id)}
                    className={styles.questionListActionButton}
                    aria-label="Delete"
                    title="Delete question"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>{" "}
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingQuestion ? "Edit Question" : "Add New Question"}
        size="md"
      >
        <QuestionForm
          question={editingQuestion || undefined}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
