import React, { useState } from "react";
import clsx from "clsx";
import { Layout, LayoutMain, LayoutSidebar, Button } from "@/components";
import styles from "./Dashboard.module.scss";

const SLIDES = [
  {
    id: 1,
    title: "Making PowerPoint Slides",
    subtitle: "Avoiding the Pitfalls of Bad Slides",
    bgColor: "#8bc7a0",
  },
  {
    id: 2,
    title: "Design Principles",
    subtitle: "Creating Effective Visual Content",
    bgColor: "#7eb3d9",
  },
  {
    id: 3,
    title: "Typography Matters",
    subtitle: "Choosing the Right Fonts",
    bgColor: "#f4a261",
  },
  {
    id: 4,
    title: "Color Theory",
    subtitle: "Using Colors Effectively",
    bgColor: "#e76f51",
  },
  {
    id: 5,
    title: "Layout & Composition",
    subtitle: "Structuring Your Content",
    bgColor: "#a8dadc",
  },
  {
    id: 6,
    title: "Visual Hierarchy",
    subtitle: "Guiding the Eye",
    bgColor: "#f1faee",
  },
  {
    id: 7,
    title: "Images & Graphics",
    subtitle: "Using Visuals Wisely",
    bgColor: "#457b9d",
  },
  {
    id: 8,
    title: "Data Visualization",
    subtitle: "Charts and Graphs",
    bgColor: "#1d3557",
  },
  {
    id: 9,
    title: "Animations",
    subtitle: "Adding Motion Carefully",
    bgColor: "#c77dff",
  },
  {
    id: 10,
    title: "Accessibility",
    subtitle: "Designing for Everyone",
    bgColor: "#6a994e",
  },
  {
    id: 11,
    title: "Best Practices",
    subtitle: "Summary & Tips",
    bgColor: "#bc4749",
  },
];

const Dashboard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(SLIDES.length - 1, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <Layout>
      <LayoutMain>
        <div className={styles.viewer} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className={styles.carousel}>
            <div
              className={styles.slide}
              style={{ background: SLIDES[currentSlide].bgColor }}
            >
              <h2 className={styles.slideTitle}>
                {SLIDES[currentSlide].title}
              </h2>
              <p className={styles.slideSubtitle}>
                {SLIDES[currentSlide].subtitle}
              </p>
            </div>
          </div>

          {/* Contrôles */}
          <div className={styles.controls}>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              aria-label="Slide précédente"
            >
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet="/assets/icons/arrow-back-60.png"
                />
                <img
                  src="/assets/icons/arrow-back-30.png"
                  alt="Précédent"
                  width="10"
                  height="10"
                />
              </picture>
            </Button>
            <div className={styles.controlsCounter}>
              <span className={styles.controlsCurrent}>{currentSlide + 1}</span>{" "}
              / {SLIDES.length}
            </div>
            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentSlide === SLIDES.length - 1}
              aria-label="Slide suivante"
            >
              <picture>
                <source
                  media="(min-width: 768px)"
                  srcSet="/assets/icons/arrow-next-60.png"
                />
                <img
                  src="/assets/icons/arrow-next-30.png"
                  alt="Suivant"
                  width="10"
                  height="10"
                />
              </picture>
            </Button>
          </div>
        </div>
      </LayoutMain>

      <LayoutSidebar>
        <div className={styles.thumbnails}>
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={clsx(styles.thumbnail, {
                [styles.thumbnailActive]: index === currentSlide,
              })}
              onClick={() => setCurrentSlide(index)}
            >
              <span className={styles.thumbnailNumber}>{slide.id}</span>
              <div
                className={styles.thumbnailPreview}
                style={{ background: slide.bgColor }}
              >
                <div className={styles.thumbnailContent}>
                  <strong>{slide.title}</strong>
                  <span>{slide.subtitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LayoutSidebar>
    </Layout>
  );
};

export default Dashboard;
