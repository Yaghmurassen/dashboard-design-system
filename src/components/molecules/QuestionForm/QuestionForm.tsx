/**
 * QuestionForm Component (Molecule)
 * Formulaire pour créer/éditer une question
 */

import React, { useState, useEffect } from "react";
import { Button } from "@/components";
import type { Question } from "@/data";
import styles from "./QuestionForm.module.scss";

export interface QuestionFormProps {
  question?: Question;
  onSubmit: (question: Omit<Question, "id">) => void;
  onCancel: () => void;
}

const QUESTION_TYPES = [
  "Multiple Choice",
  "Open Text",
  "Rating",
  "Poll",
  "True/False",
  "Ranking",
];

export const QuestionForm: React.FC<QuestionFormProps> = ({
  question,
  onSubmit,
  onCancel,
}) => {
  // En mode création, initialiser avec le placeholder; en mode édition, avec la question
  const [title, setTitle] = useState(
    question?.title || "Enter your question here..."
  );
  const [type, setType] = useState(question?.type || QUESTION_TYPES[0]);
  const [errors, setErrors] = useState<{ title?: string }>({});
  const [isTouched, setIsTouched] = useState(!!question); // true si édition

  useEffect(() => {
    if (question) {
      setTitle(question.title);
      setType(question.type || QUESTION_TYPES[0]);
      setIsTouched(true);
    } else {
      // Mode création : réinitialiser avec le placeholder
      setTitle("Enter your question here...");
      setIsTouched(false);
    }
  }, [question]);

  const validate = () => {
    const newErrors: { title?: string } = {};

    // Ignorer le placeholder dans la validation
    const cleanTitle = title === "Enter your question here..." ? "" : title;

    if (!cleanTitle.trim()) {
      newErrors.title = "Le titre est requis";
    } else if (cleanTitle.trim().length < 3) {
      newErrors.title = "Le titre doit contenir au moins 3 caractères";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const cleanTitle = title === "Enter your question here..." ? "" : title;

    onSubmit({
      title: cleanTitle.trim(),
      type,
    });
  };

  // Gestion du focus pour vider le champ au premier clic
  const handleFocus = () => {
    if (!isTouched) {
      setTitle(""); // Vider le champ au premier clic
      setIsTouched(true);
    }
  };

  // Gestion de Enter pour soumettre (Ctrl+Enter n'est plus nécessaire)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter seul (sans Shift) soumet le formulaire
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
    // Shift+Enter permet le retour à la ligne
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {/* Titre */}
      <div className={styles.formGroup}>
        <label htmlFor="question-title" className={styles.formLabel}>
          Question Title <span className={styles.formRequired}>*</span>
        </label>
        <textarea
          id="question-title"
          className={styles.formTextarea}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          rows={3}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <span id="title-error" className={styles.formError}>
            {errors.title}
          </span>
        )}
      </div>

      {/* Type */}
      <div className={styles.formGroup}>
        <label htmlFor="question-type" className={styles.formLabel}>
          Question Type
        </label>
        <select
          id="question-type"
          className={styles.formSelect}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          {QUESTION_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className={styles.formActions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {question ? "Update Question" : "Create Question"}
        </Button>
      </div>
    </form>
  );
};
