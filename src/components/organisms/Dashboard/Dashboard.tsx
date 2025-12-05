import React, { useState, useMemo, useCallback } from "react";
import { Reorder, AnimatePresence, motion } from "framer-motion";
import {
  Layout,
  LayoutHeader,
  LayoutMain,
  LayoutSidebar,
  LayoutAside,
  Button,
  Input,
  ActionBar,
  LayoutFooter,
  Tabs,
  QuestionList,
  DraggableSlide,
} from "@/components";
import { useLocalStorage } from "@/hooks";
import { useVersionedLocalStorage } from "@/utils/versionedStorage";
import { SLIDES, QUESTIONS_INSERT } from "@/data";
import type { Question, Slide } from "@/data";
import { STORAGE_KEYS } from "@/utils/questionStorage";
import type { QuestionSlideAssociation } from "@/utils/questionSlideAssociations";
import {
  STORAGE_KEY_ASSOCIATIONS,
  addAssociation,
  removeAssociation,
  isQuestionAssociated,
} from "@/utils/questionSlideAssociations";
import styles from "./Dashboard.module.scss";

// Import des icônes
import leftArrow from "@/assets/icons/left-direction-arrow-blue.svg";
import rightArrow from "@/assets/icons/right-direction-arrow-blue.svg";

const Dashboard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Persistance de l'ordre des slides avec versioning automatique
  // 🔥 Si SLIDES change, le cache est automatiquement invalidé
  const [slides, setSlides] = useVersionedLocalStorage<Slide[]>(
    "wooclap-slides-order",
    SLIDES
  );

  // Persistance des questions dans localStorage
  const [questions, setQuestions] = useLocalStorage<Question[]>(
    STORAGE_KEYS.QUESTIONS_INSERT,
    QUESTIONS_INSERT
  );

  // Persistance des associations question-slide
  const [associations, setAssociations] = useLocalStorage<
    QuestionSlideAssociation[]
  >(STORAGE_KEY_ASSOCIATIONS, []);

  // Memoize filteredSlides pour éviter les recalculs inutiles
  const filteredSlides = useMemo(() => {
    if (!searchQuery.trim()) return slides;

    const query = searchQuery.toLowerCase();
    return slides.filter(
      (slide) =>
        slide.title.toLowerCase().includes(query) ||
        slide.subtitle.toLowerCase().includes(query)
    );
  }, [slides, searchQuery]);

  // Memoize slide direction state
  const [slideDirection, setSlideDirection] = useState(0);

  // useCallback pour les handlers de navigation
  const handlePrevious = useCallback(() => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
    setSlideDirection(-1);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
    setSlideDirection(1);
  }, [slides.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrevious, handleNext]
  );

  // Gestion des questions avec useCallback
  const handleAddQuestion = useCallback(
    (question: Omit<Question, "id">) => {
      const currentSlideId = slides[currentSlide].id;
      const maxId =
        questions.length > 0 ? Math.max(...questions.map((q) => q.id)) : 0;
      const newQuestion = { ...question, id: maxId + 1 };

      setQuestions([...questions, newQuestion]);
      setAssociations(
        addAssociation(associations, newQuestion.id, currentSlideId, "insert")
      );
    },
    [
      slides,
      currentSlide,
      questions,
      associations,
      setQuestions,
      setAssociations,
    ]
  );

  const handleEditQuestion = useCallback(
    (id: number, question: Omit<Question, "id">) => {
      setQuestions(
        questions.map((q) => (q.id === id ? { ...question, id } : q))
      );
    },
    [questions, setQuestions]
  );

  const handleDeleteQuestion = useCallback(
    (id: number) => {
      setQuestions(questions.filter((q) => q.id !== id));
      // Nettoyer les associations
      setAssociations(associations.filter((a) => a.questionId !== id));
    },
    [questions, associations, setQuestions, setAssociations]
  );

  // Gérer l'association/dissociation d'une question à un slide
  const handleToggleAssociation = useCallback(
    (questionId: number, slideId: number) => {
      if (isQuestionAssociated(associations, questionId, slideId, "insert")) {
        setAssociations(
          removeAssociation(associations, questionId, slideId, "insert")
        );
      } else {
        setAssociations(
          addAssociation(associations, questionId, slideId, "insert")
        );
      }
    },
    [associations, setAssociations]
  );

  // Memoize les questions pour le slide actuel
  const currentSlideQuestions = useMemo((): Question[] => {
    const currentSlideId = slides[currentSlide].id;
    const associatedQuestionIds = associations
      .filter(
        (a) => a.slideId === currentSlideId && a.questionType === "insert"
      )
      .map((a) => a.questionId);

    return questions.filter((q) => associatedQuestionIds.includes(q.id));
  }, [slides, currentSlide, associations, questions]);

  // Gérer la réorganisation des slides avec Framer Motion
  const handleReorderSlides = useCallback(
    (newOrder: Slide[]) => {
      const oldSlideId = slides[currentSlide].id;
      setSlides(newOrder);

      // Mettre à jour l'index du slide actif
      const newIndex = newOrder.findIndex((slide) => slide.id === oldSlideId);
      if (newIndex !== -1) {
        setCurrentSlide(newIndex);
      }
    },
    [slides, currentSlide, setSlides]
  );

  // Gérer la réorganisation avec filtrage de recherche
  const handleReorderWithFilter = useCallback(
    (newOrder: Slide[]) => {
      // Si on filtre, on doit merger le nouvel ordre avec les slides filtrés
      if (searchQuery.trim()) {
        // Créer une map des nouveaux ordres
        const orderMap = new Map(
          newOrder.map((slide, index) => [slide.id, index])
        );
        // Trier tous les slides selon le nouvel ordre
        const sortedSlides = [...slides].sort((a, b) => {
          const aOrder = orderMap.get(a.id) ?? Infinity;
          const bOrder = orderMap.get(b.id) ?? Infinity;
          return aOrder - bOrder;
        });
        handleReorderSlides(sortedSlides);
      } else {
        handleReorderSlides(newOrder);
      }
    },
    [searchQuery, slides, handleReorderSlides]
  );

  return (
    <Layout>
      <LayoutHeader>
        <h1 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 600 }}>
          Wooclap Presentation
        </h1>
      </LayoutHeader>

      <LayoutMain>
        <div className={styles.viewer} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className={styles.carousel}>
            <AnimatePresence
              initial={false}
              mode="popLayout"
              custom={slideDirection}
            >
              <motion.div
                key={currentSlide}
                custom={slideDirection}
                variants={{
                  enter: (direction: number) => ({
                    x: direction > 0 ? "100%" : "-100%",
                    opacity: 0,
                  }),
                  center: {
                    x: 0,
                    opacity: 1,
                  },
                  exit: (direction: number) => ({
                    x: direction > 0 ? "-100%" : "100%",
                    opacity: 0,
                  }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.25,
                  ease: [0.4, 0, 0.2, 1],
                }}
                // style={{
                //   width: "25rem",
                //   marginLeft: "6rem",
                //   position: "relative", // 🔥 FIX: Conteneur pour les absolute children
                // }}
                style={{
                  width: "100%",
                }}
              >
                <div
                  className={styles.slide}
                  style={{
                    background: slides[currentSlide].bgColor,
                  }}
                ></div>
                {/* Contenu de la slide */}
                <h2 className={styles.slideTitle}>
                  {slides[currentSlide].title}
                </h2>
                <div className={styles.slideSubtitleContainer}>
                  <p className={styles.slideSubtitle}>
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className={styles.slideLine}></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.controls}>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              aria-label="Slide précédente"
              className={styles.controlButton}
            >
              <img src={leftArrow} alt="Précédent" width="20" height="20" />
            </Button>
            <div className={styles.controlsCounter}>
              <span className={styles.controlsCurrent}>{currentSlide + 1}</span>{" "}
              /{slides.length}
            </div>
            <Button
              variant="secondary"
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              aria-label="Slide suivante"
              className={styles.controlButton}
            >
              <img src={rightArrow} alt="Suivant" width="20" height="20" />
            </Button>
          </div>

          {/* Input de recherche */}
          <div className={styles.searchSection}>
            <Input
              variant="search"
              size="sm"
              placeholder="Rechercher une slide..."
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              fullWidth
              aria-label="Rechercher une slide"
            />
          </div>
        </div>
      </LayoutMain>

      <LayoutSidebar>
        <Reorder.Group
          axis="y"
          values={filteredSlides}
          onReorder={handleReorderWithFilter}
          className={styles.thumbnails}
        >
          {filteredSlides.length ? (
            filteredSlides.map((slide) => (
              <DraggableSlide
                key={slide.id}
                slide={slide}
                index={slides.indexOf(slide)}
                isActive={slides[currentSlide].id === slide.id}
                onClick={() => setCurrentSlide(slides.indexOf(slide))}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <p>Aucune slide ne correspond à votre recherche</p>
            </div>
          )}
        </Reorder.Group>
      </LayoutSidebar>

      {/* Aside à droite avec onglets */}
      <LayoutAside>
        <Tabs
          tabs={[
            {
              id: "insert",
              label: "Insert Questions",
              icon: "list-view",
              content: (
                <QuestionList
                  questions={currentSlideQuestions}
                  title="How to participate ?"
                  infoTooltip="Questions added here are specific to this slide only."
                  onAdd={handleAddQuestion}
                  onDelete={handleDeleteQuestion}
                  currentSlideId={slides[currentSlide].id}
                  associations={associations}
                  questionType="insert"
                  onToggleAssociation={handleToggleAssociation}
                />
              ),
            },
            {
              id: "update",
              label: "Update Presentation",
              icon: "update-photo",
              content: (
                <QuestionList
                  questions={currentSlideQuestions}
                  title={`Update Slide ${currentSlide + 1} Questions`}
                  infoTooltip="Click on a question to edit it."
                  onEdit={handleEditQuestion}
                  onDelete={handleDeleteQuestion}
                  currentSlideId={slides[currentSlide].id}
                  associations={associations}
                  questionType="insert"
                  onToggleAssociation={handleToggleAssociation}
                />
              ),
            },
          ]}
          defaultTab="insert"
        />
      </LayoutAside>

      <LayoutFooter>
        <ActionBar
          discardLabel="Discard"
          saveLabel="Save"
          onDiscard={() => console.log("Discard clicked")}
          onSave={() => console.log("Save clicked")}
        />
      </LayoutFooter>
    </Layout>
  );
};
export default Dashboard;
