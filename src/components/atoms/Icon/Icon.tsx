/**
 * Icon Component (Atom)
 * Composant d'icône SVG avec support de currentColor
 */

import React from "react";
import styles from "./Icon.module.scss";

export type IconName = "list-view" | "update-photo";

export interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = "",
}) => {
  const icons: Record<IconName, React.ReactNode> = {
    "list-view": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <rect x="3" y="5" width="4" height="4" fill="currentColor" />
        <rect x="3" y="10" width="4" height="4" fill="currentColor" />
        <rect x="3" y="15" width="4" height="4" fill="currentColor" />
        <line
          x1="9"
          y1="7"
          x2="21"
          y2="7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="12"
          x2="21"
          y2="12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="9"
          y1="17"
          x2="21"
          y2="17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    "update-photo": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
      >
        <path
          d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="17 8 12 3 7 8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="12"
          y1="3"
          x2="12"
          y2="15"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  };

  return <span className={`${styles.icon} ${className}`}>{icons[name]}</span>;
};
