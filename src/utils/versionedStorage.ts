/**
 * Versioned Storage
 * Gère le localStorage avec versioning automatique
 */

/**
 * Génère un hash simple à partir d'une structure de données
 */
function simpleHash(data: any): string {
  const str = JSON.stringify(data);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

/**
 * Hook useLocalStorage avec versioning automatique
 * Si les données initiales changent, le cache est invalidé automatiquement
 */
export function useVersionedLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Génère un hash de la valeur initiale
  const version = simpleHash(initialValue);
  const versionedKey = `${key}@v${version}`;

  // Nettoie les anciennes versions
  const cleanup = () => {
    Object.keys(localStorage).forEach((storageKey) => {
      if (storageKey.startsWith(`${key}@v`) && storageKey !== versionedKey) {
        localStorage.removeItem(storageKey);
        console.log(`🗑️ Cleaned old storage: ${storageKey}`);
      }
    });
  };

  // Récupère la valeur
  const getStoredValue = (): T => {
    try {
      const item = localStorage.getItem(versionedKey);
      if (item) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.error(`Error loading ${versionedKey}:`, error);
    }

    // Nettoie les anciennes versions
    cleanup();

    return initialValue;
  };

  const [storedValue, setStoredValue] = React.useState<T>(getStoredValue);

  // Sauvegarde dans localStorage
  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(versionedKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving ${versionedKey}:`, error);
    }
  };

  return [storedValue, setValue];
}

// Import React pour useState
import React from "react";
