/**
 * Card Component (Atom) - Compound Component Pattern
 * Container avec composition flexible
 */

import React, { createContext, useContext } from "react";
import clsx from "clsx";
import type { BaseComponentProps } from "@/types";
import styles from "./Card.module.scss";

// Context pour partager les props entre les sous-composants
interface CardContextValue {
  padding: "none" | "sm" | "md" | "lg";
  elevation: 0 | 1 | 2 | 3;
}

const CardContext = createContext<CardContextValue | null>(null);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("Card subcomponents must be used within a Card component");
  }
  return context;
};

// Types
export interface CardProps
  extends BaseComponentProps,
    React.HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
  elevation?: 0 | 1 | 2 | 3;
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
}

interface CardSubComponentProps extends BaseComponentProps {
  children: React.ReactNode;
}

// Composant principal
const CardRoot = React.memo<CardProps>(
  ({
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
      <CardContext.Provider value={{ padding, elevation }}>
        <Component className={classNames} {...props}>
          {children}
        </Component>
      </CardContext.Provider>
    );
  }
);

CardRoot.displayName = "Card";

// Sous-composants mémoïsés
const CardHeader = React.memo<CardSubComponentProps>(
  ({ children, className = "", ...props }) => (
    <header className={clsx(styles.card__header, className)} {...props}>
      {children}
    </header>
  )
);

CardHeader.displayName = "Card.Header";

const CardBody = React.memo<CardSubComponentProps>(
  ({ children, className = "", ...props }) => (
    <div className={clsx(styles.card__body, className)} {...props}>
      {children}
    </div>
  )
);

CardBody.displayName = "Card.Body";

const CardFooter = React.memo<CardSubComponentProps>(
  ({ children, className = "", ...props }) => (
    <footer className={clsx(styles.card__footer, className)} {...props}>
      {children}
    </footer>
  )
);

CardFooter.displayName = "Card.Footer";

// Export avec pattern Compound Component
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

// Exports de rétrocompatibilité
export { CardHeader, CardBody, CardFooter };
