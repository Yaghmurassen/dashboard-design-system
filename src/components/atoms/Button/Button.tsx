/**
 * Button Component (Atom)
 * Simple, accessible button with variants
 */

import React, { forwardRef } from "react";
import clsx from "clsx";
import type { Variant, Size } from "@/types";
import styles from "./Button.module.scss";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

/**
 * Simple button component with forward ref
 * For loading states or complex icons, compose at a higher level
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      fullWidth = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const classNames = clsx(
      styles.button,
      styles[`${variant}`],
      styles[`button--${size}`],
      fullWidth && styles.buttonFullWidth,
      className
    );

    return (
      <button ref={ref} type={type} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
