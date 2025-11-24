/**
 * useLocalStorage Hook
 * Custom hook pour gérer la persistance dans localStorage
 */

import { useState } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State pour stocker la valeur
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // Récupérer depuis localStorage
      const item = window.localStorage.getItem(key);
      // Parser la valeur JSON stockée ou retourner initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Fonction pour sauvegarder dans localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permettre à value d'être une fonction pour une syntaxe similaire à useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Sauvegarder dans le state
      setStoredValue(valueToStore);

      // Sauvegarder dans localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
