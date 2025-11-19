/**
 * Layout Component (Molecule)
 * Main application layout with responsive grid
 */

import React from "react";
import clsx from "clsx";
import type { BaseComponentProps } from "@/types";
import styles from "./Layout.module.scss";

interface LayoutProps extends BaseComponentProps {
  children: React.ReactNode;
}

/** Main application layout wrapper */
export const Layout: React.FC<LayoutProps> = ({
  children,
  className = "",
  ...props
}) => (
  <div className={clsx(styles.layout, className)} {...props}>
    {children}
  </div>
);

/** Header component - top navigation area */
export const LayoutHeader: React.FC<LayoutProps> = ({
  children,
  className = "",
  ...props
}) => (
  <header
    className={clsx(styles.layoutHeader, className)}
    role="banner"
    {...props}
  >
    {children}
  </header>
);

/** Sidebar component - side navigation */
export const LayoutSidebar: React.FC<LayoutProps> = ({
  children,
  className = "",
  ...props
}) => (
  <aside
    className={clsx(styles.layoutSidebar, className)}
    role="navigation"
    aria-label="Main navigation"
    {...props}
  >
    {children}
  </aside>
);

/** Main content area */
export const LayoutMain: React.FC<LayoutProps> = ({
  children,
  className = "",
  ...props
}) => (
  <main
    className={clsx(styles.layoutMain, className)}
    role="main"
    id="main-content"
    {...props}
  >
    {children}
  </main>
);

/** Footer component */
export const LayoutFooter: React.FC<LayoutProps> = ({
  children,
  className = "",
  ...props
}) => (
  <footer
    className={clsx(styles.layoutFooter, className)}
    role="contentinfo"
    {...props}
  >
    {children}
  </footer>
);
