/**
 * Modal Component (Atom)
 * Modal accessible avec backdrop et focus trap
 */

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";
import styles from "./Modal.module.scss";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className = "",
  size = "md",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Focus trap et gestion ESC
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      // Focus trap
      if (e.key === "Tab") {
        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        ref={modalRef}
        className={clsx(styles.modal, styles[`modal--${size}`], className)}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {title && (
          <div className={styles.modalHeader}>
            <h2 id="modal-title" className={styles.modalTitle}>
              {title}
            </h2>
            <button
              className={styles.modalClose}
              onClick={onClose}
              aria-label="Fermer"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
