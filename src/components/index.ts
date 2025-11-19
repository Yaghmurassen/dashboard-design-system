/**
 * Atomic Components Export
 * Centralized exports following Atomic Design
 */

// Atoms
export { Button } from "./atoms/Button/Button";
export type { ButtonProps } from "./atoms/Button/Button";

export { Card, CardHeader, CardBody, CardFooter } from "./atoms/Card/Card";
export type { CardProps } from "./atoms/Card/Card";

export { Image } from "./atoms/Image/Image";
export type { ImageProps } from "./atoms/Image/Image";

// Molecules
export { ThemeToggle } from "./molecules/ThemeToggle/ThemeToggle";

// Templates
export {
  Layout,
  LayoutHeader,
  LayoutSidebar,
  LayoutMain,
  LayoutFooter,
} from "./templates/Layout/Layout";

// Organisms
export { default as Dashboard } from "./organisms/Dashboard/Dashboard";
