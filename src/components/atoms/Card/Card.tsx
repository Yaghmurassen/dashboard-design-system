/**
 * Card Component (Atom)
 * Simple container with semantic HTML
 */

import React from "react";
import clsx from "clsx";
import type { BaseComponentProps } from "@/types";
import styles from "./Card.module.scss";

export interface CardProps extends BaseComponentProps {
  /** Padding variant */
  padding?: "none" | "sm" | "md" | "lg";
  /** Elevation level (shadow depth) */
  elevation?: 0 | 1 | 2 | 3;
  /** Custom HTML tag (default: div) */
  as?: keyof JSX.IntrinsicElements;
  /** Additional props for the element */
  [key: string]: any;
}

/**
 * Simple card container
 * For interactive cards, wrap in a button/link at a higher level
 */
export const Card: React.FC<CardProps> = ({
  children,
  padding = "md",
  elevation = 1,
  className = "",
  as: Component = "div",
  ...props
}) => {
  const classNames = clsx(
    styles.card,
    styles[`card--padding-${padding}`],
    styles[`card--elevation-${elevation}`],
    className
  );

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
};

/** Card Header - semantic header section */
export const CardHeader: React.FC<
  BaseComponentProps & { children: React.ReactNode }
> = ({ children, className = "", ...props }) => (
  <header className={clsx(styles.card__header, className)} {...props}>
    {children}
  </header>
);

/** Card Body - main content section */
export const CardBody: React.FC<
  BaseComponentProps & { children: React.ReactNode }
> = ({ children, className = "", ...props }) => (
  <div className={clsx(styles.card__body, className)} {...props}>
    {children}
  </div>
);

/** Card Footer - footer section */
export const CardFooter: React.FC<
  BaseComponentProps & { children: React.ReactNode }
> = ({ children, className = "", ...props }) => (
  <footer className={clsx(styles.card__footer, className)} {...props}>
    {children}
  </footer>
);
