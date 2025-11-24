import React, { useState } from "react";
import { Reorder } from "framer-motion";
import {
  Layout,
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
import { SLIDES, QUESTIONS_INSERT, QUESTIONS_UPDATE } from "@/data";
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

const Dashboard: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  // Persistance de l'ordre des slides dans localStorage
  const [slides, setSlides] = useLocalStorage<Slide[]>(
    "wooclap-slides-order",
    SLIDES
  );

  // Persistance des questions dans localStorage
  const [questionsInsert, setQuestionsInsert] = useLocalStorage<Question[]>(
    STORAGE_KEYS.QUESTIONS_INSERT,
    QUESTIONS_INSERT
  );

  const [questionsUpdate, setQuestionsUpdate] = useLocalStorage<Question[]>(
    STORAGE_KEYS.QUESTIONS_UPDATE,
    QUESTIONS_UPDATE
  );

  // Persistance des associations question-slide
  const [associations, setAssociations] = useLocalStorage<
    QuestionSlideAssociation[]
  >(STORAGE_KEY_ASSOCIATIONS, []);

  const filteredSlides = searchQuery.trim()
    ? slides.filter(
        (slide) =>
          slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          slide.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : slides;

  const handlePrevious = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  // Fonctions pour gérer les questions
  const handleAddQuestion = (
    type: "insert" | "update",
    question: Omit<Question, "id">
  ) => {
    if (type === "insert") {
      const maxId =
        questionsInsert.length > 0
          ? Math.max(...questionsInsert.map((q) => q.id))
          : 0;
      setQuestionsInsert([...questionsInsert, { ...question, id: maxId + 1 }]);
    } else {
      const maxId =
        questionsUpdate.length > 0
          ? Math.max(...questionsUpdate.map((q) => q.id))
          : 0;
      setQuestionsUpdate([...questionsUpdate, { ...question, id: maxId + 1 }]);
    }
  };

  const handleEditQuestion = (
    type: "insert" | "update",
    id: number,
    question: Omit<Question, "id">
  ) => {
    if (type === "insert") {
      setQuestionsInsert(
        questionsInsert.map((q) => (q.id === id ? { ...question, id } : q))
      );
    } else {
      setQuestionsUpdate(
        questionsUpdate.map((q) => (q.id === id ? { ...question, id } : q))
      );
    }
  };

  const handleDeleteQuestion = (type: "insert" | "update", id: number) => {
    if (type === "insert") {
      setQuestionsInsert(questionsInsert.filter((q) => q.id !== id));
    } else {
      setQuestionsUpdate(questionsUpdate.filter((q) => q.id !== id));
    }
  };

  // @ts-expect-error - Fonction disponible pour usage futur
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleResetQuestions = (type: "insert" | "update") => {
    if (type === "insert") {
      setQuestionsInsert(QUESTIONS_INSERT);
    } else {
      setQuestionsUpdate(QUESTIONS_UPDATE);
    }
  };

  // Gérer l'association/dissociation d'une question à un slide
  const handleToggleAssociation = (
    questionId: number,
    slideId: number,
    questionType: "insert" | "update"
  ) => {
    if (isQuestionAssociated(associations, questionId, slideId, questionType)) {
      // Dissocier
      setAssociations(
        removeAssociation(associations, questionId, slideId, questionType)
      );
    } else {
      // Associer
      setAssociations(
        addAssociation(associations, questionId, slideId, questionType)
      );
    }
  };

  // Obtenir les questions pour le slide actuel
  const getQuestionsForCurrentSlide = (
    allQuestions: Question[],
    questionType: "insert" | "update"
  ): Question[] => {
    const currentSlideId = slides[currentSlide].id;

    // Récupérer les IDs des questions associées au slide actuel
    const associatedQuestionIds = associations
      .filter(
        (a) => a.slideId === currentSlideId && a.questionType === questionType
      )
      .map((a) => a.questionId);

    // Récupérer les IDs des questions associées à d'autres slides
    const questionsOnOtherSlides = associations
      .filter(
        (a) => a.slideId !== currentSlideId && a.questionType === questionType
      )
      .map((a) => a.questionId);

    // Retourner les questions qui sont :
    // - Soit associées au slide actuel
    // - Soit non associées à aucun slide (disponibles)
    return allQuestions.filter(
      (q) =>
        associatedQuestionIds.includes(q.id) || // Sur ce slide
        !questionsOnOtherSlides.includes(q.id) // Pas sur un autre slide
    );
  };

  // Gérer la réorganisation des slides avec Framer Motion
  const handleReorderSlides = (newOrder: Slide[]) => {
    const oldSlideId = slides[currentSlide].id;
    setSlides(newOrder);

    // Mettre à jour l'index du slide actif
    const newIndex = newOrder.findIndex((slide) => slide.id === oldSlideId);
    if (newIndex !== -1) {
      setCurrentSlide(newIndex);
    }
  };

  return (
    <Layout>
      <LayoutMain>
        <div className={styles.viewer} onKeyDown={handleKeyDown} tabIndex={0}>
          <div className={styles.carousel}>
            <div className={styles.slide}>
              <div
                className={styles.slideBackground}
                style={{ background: slides[currentSlide].bgColor }}
              ></div>
              <h2 className={styles.slideTitle}>
                {slides[currentSlide].title}
              </h2>
              <p className={styles.slideSubtitle}>
                {slides[currentSlide].subtitle}
              </p>
              <div className={styles.slideLine}></div>
            </div>
          </div>

          <div className={styles.controls}>
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentSlide === 0}
              aria-label="Slide précédente"
              className={styles.controlButton}
            >
              <img
                src="/assets/icons/left-direction-arrow-blue.svg"
                alt="Précédent"
                width="20"
                height="20"
              />
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
              <img
                src="/assets/icons/right-direction-arrow-blue.svg"
                alt="Suivant"
                width="20"
                height="20"
              />
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
          onReorder={(newOrder) => {
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
          }}
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

      {/* Nouveau Aside à droite avec onglets */}
      <LayoutAside>
        <Tabs
          tabs={[
            {
              id: "insert",
              label: "Insert Question",
              content: (
                <QuestionList
                  questions={getQuestionsForCurrentSlide(
                    questionsInsert,
                    "insert"
                  )}
                  title={`Questions for Slide ${slides[currentSlide].id}`}
                  infoTooltip="Click + to add a question to this slide. Questions with ✓ are already added."
                  onAdd={(q) => handleAddQuestion("insert", q)}
                  onDelete={(id) => handleDeleteQuestion("insert", id)}
                  currentSlideId={slides[currentSlide].id}
                  associations={associations}
                  questionType="insert"
                  onToggleAssociation={(qId, sId) =>
                    handleToggleAssociation(qId, sId, "insert")
                  }
                />
              ),
            },
            {
              id: "update",
              label: "Update Presentation",
              content: (
                <QuestionList
                  questions={getQuestionsForCurrentSlide(
                    questionsUpdate,
                    "update"
                  )}
                  title={`Updates for Slide ${slides[currentSlide].id}`}
                  infoTooltip="Click + to add an update to this slide. Updates with ✓ are already added."
                  onEdit={(id, q) => handleEditQuestion("update", id, q)}
                  currentSlideId={slides[currentSlide].id}
                  associations={associations}
                  questionType="update"
                  onToggleAssociation={(qId, sId) =>
                    handleToggleAssociation(qId, sId, "update")
                  }
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
