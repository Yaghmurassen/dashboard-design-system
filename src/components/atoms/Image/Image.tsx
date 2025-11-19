/**
 * Image Component (Atom)
 * Simple wrapper for semantic, responsive, and accessible images
 */

import React from "react";
import type { BaseComponentProps } from "@/types";
import styles from "./Image.module.scss";

export interface ImageProps
  extends BaseComponentProps,
    React.ImgHTMLAttributes<HTMLImageElement> {
  /** Alternative text for accessibility (REQUIRED) */
  alt: string;
  /** Object fit style */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}

/**
 * Simple, accessible image component
 * Handles modern attributes (srcSet, loading, decoding) via native HTML props
 */
export const Image: React.FC<ImageProps> = ({
  alt,
  objectFit = "cover",
  loading = "lazy",
  decoding = "async",
  className = "",
  ...props
}) => {
  const classNames = [
    styles.image,
    objectFit && styles[`image--${objectFit}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <img
      alt={alt}
      loading={loading}
      decoding={decoding}
      className={classNames}
      {...props}
    />
  );
};
