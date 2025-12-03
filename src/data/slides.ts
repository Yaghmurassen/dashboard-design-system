/**
 * Slides Data
 * Données de présentation pour le Dashboard
 */

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bgColor: string;
}

export const SLIDES: Slide[] = [
  {
    id: 1,
    title: "Making PowerPoint Slides",
    subtitle: "Avoiding the Pitfalls of Bad Slides",
    bgColor: "#9c9",
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
    bgColor: "#a9ed93",
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
