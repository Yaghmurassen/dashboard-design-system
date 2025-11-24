/**
 * DraggableSlide Component
 * Slide avec drag & drop animé
 */

import React from "react";
import { Reorder } from "framer-motion";
import clsx from "clsx";
import type { Slide } from "@/data";
import styles from "./DraggableSlide.module.scss";

interface DraggableSlideProps {
  slide: Slide;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export const DraggableSlide: React.FC<DraggableSlideProps> = ({
  slide,
  index,
  isActive,
  onClick,
}) => {
  return (
    <Reorder.Item
      value={slide}
      className={clsx(styles.thumbnail, {
        [styles.thumbnailActive]: isActive,
      })}
      onClick={onClick}
      whileDrag={{
        scale: 1.05,
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        cursor: "grabbing",
      }}
      dragTransition={{
        bounceStiffness: 600,
        bounceDamping: 20,
      }}
    >
      <span className={styles.thumbnailNumber}>{index + 1}</span>
      <div
        className={styles.thumbnailPreview}
        style={{ background: slide.bgColor }}
      >
        <div className={styles.thumbnailContent}>
          <strong>{slide.title}</strong>
          <span>{slide.subtitle}</span>
        </div>
      </div>
      <div className={styles.thumbnailDragHandle}>⋮⋮</div>
    </Reorder.Item>
  );
};
