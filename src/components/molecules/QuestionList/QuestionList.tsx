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
  currentSlideId?: number;
  associations?: QuestionSlideAssociation[];
  questionType?: "insert" | "update";
  onToggleAssociation?: (questionId: number, slideId: number) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  title = "Questions",
  infoTooltip = "How to participate ?",
  onAdd,
  onEdit,
  onDelete,
  currentSlideId,
  associations = [],
  questionType = "insert",
  onToggleAssociation,
}) => {
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

  // Mode édition : clic direct sur l'item (onglet Update)
  const isEditMode = onEdit && !onDelete;

  return (
    <div className={styles.questionList}>
      {/* Header */}
      <div className={styles.questionListHeader}>
        {infoTooltip && (
          <button
            className={styles.questionListInfoBadge}
            title={infoTooltip}
            type="button"
            aria-label="Information"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
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
          </button>
        )}
        <h3 className={styles.questionListTitle}>{title}</h3>
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
        {questions.map((question, index) => (
          <li
            key={question.id}
            className={`${styles.questionListItem} ${
              isEditMode ? styles["questionListItem--editable"] : ""
            }`}
            onClick={() => isEditMode && handleOpenEditModal(question)}
          >
            <span className={styles.questionListNumber}>{index + 1}</span>
            <div className={styles.questionListContent}>
              <p className={styles.questionListItemTitle}>{question.title}</p>
              {question.type && (
                <span className={styles.questionListItemType}>
                  {question.type}
                </span>
              )}
            </div>

            {/* Actions */}
            {!isEditMode && (
              <div className={styles.questionListActions}>
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
                  >
                    {isAssociated(question.id) ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          d="M12 5v14m-7-7h14"
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
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                        strokeLinecap="round"
                      />
                      <path
                        d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}

                {onDelete && (
                  <button
                    onClick={() => handleDelete(question.id)}
                    className={styles.questionListActionButton}
                    aria-label="Delete"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
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
