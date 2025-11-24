/**
 * Input Component (Atom)
 * Simple, accessible input with variants
 */

import React, { forwardRef } from "react";
import clsx from "clsx";
import type { Size } from "@/types";
import styles from "./Input.module.scss";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  variant?: "default" | "search";
  size?: Size;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
}

/**
 * Simple input component with forward ref
 * For complex forms, compose at a higher level
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "default",
      size = "md",
      fullWidth = false,
      error = false,
      helperText,
      className = "",
      type = "text",
      ...props
    },
    ref
  ) => {
    const inputClassNames = clsx(
      styles.input,
      styles[`input--${variant}`],
      styles[`input--${size}`],
      fullWidth && styles["input--full-width"],
      error && styles["input--error"],
      className
    );

    return (
      <div
        className={clsx(
          styles.inputWrapper,
          fullWidth && styles["inputWrapper--full-width"]
        )}
      >
        <input
          ref={ref}
          type={type}
          className={inputClassNames}
          aria-invalid={error}
          {...props}
        />
        {helperText && (
          <span
            className={clsx(
              styles.helperText,
              error && styles["helperText--error"]
            )}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
