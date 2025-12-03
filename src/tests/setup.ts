/**
 * Configuration globale pour les tests
 */

import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Étend les matchers de Vitest avec ceux de jest-dom
expect.extend(matchers);

// Nettoie après chaque test
afterEach(() => {
  cleanup();
});

// Mock des fonctions globales si nécessaire
global.matchMedia = vi.fn().mockImplementation((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
