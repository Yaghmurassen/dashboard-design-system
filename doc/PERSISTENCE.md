# 💾 Système de Persistance des Questions

Ce système utilise **localStorage** pour persister les questions de l'utilisateur entre les sessions.

## 🎯 Fonctionnalités

### ✅ Implémenté

- **Persistance automatique** : Les questions sont sauvegardées dans localStorage
- **Récupération au chargement** : Les questions sont restaurées depuis localStorage
- **Deux listes séparées** :
  - `Insert Questions` → clé : `wooclap-questions-insert`
  - `Update Presentation` → clé : `wooclap-questions-update`

### 🔧 Utilisation

#### Hook `useLocalStorage`

```tsx
const [questions, setQuestions] = useLocalStorage<Question[]>(
  "storage-key",
  defaultValue
);
```

#### Fonctions disponibles dans Dashboard

```tsx
// Ajouter une question
handleAddQuestion("insert", {
  title: "Ma nouvelle question",
  type: "Multiple Choice",
});

// Supprimer une question
handleDeleteQuestion("insert", questionId);

// Reset aux valeurs par défaut
handleResetQuestions("insert");
```

## 📁 Structure

```
src/
├── hooks/
│   └── useLocalStorage.ts         # Hook personnalisé
├── utils/
│   └── questionStorage.ts         # Utilitaires de gestion
└── data/
    └── questions.ts               # Données par défaut
```

## 🔑 Clés localStorage

- `wooclap-questions-insert` : Questions d'insertion
- `wooclap-questions-update` : Options de mise à jour

## 🧪 Test manuel

1. Ouvre DevTools (F12) → Console
2. Vérifie le localStorage :

```javascript
localStorage.getItem("wooclap-questions-insert");
```

3. Modifie une question (quand l'UI sera disponible)
4. Rafraîchis la page → Les modifications sont persistées ✅

## 🚀 Prochaines étapes (UI)

Pour activer complètement le système, ajoute dans `QuestionList` :

- Bouton pour ajouter une question
- Bouton pour supprimer une question
- Bouton pour reset aux valeurs par défaut

Exemple :

```tsx
<QuestionList
  questions={questionsInsert}
  onAdd={(q) => handleAddQuestion("insert", q)}
  onDelete={(id) => handleDeleteQuestion("insert", id)}
  onReset={() => handleResetQuestions("insert")}
/>
```

## 💡 Avantages

- ✅ **Pas de backend requis**
- ✅ **Fonctionne offline**
- ✅ **Persistance automatique**
- ✅ **Type-safe avec TypeScript**
- ✅ **Facile à tester**

## ⚠️ Limitations

- Limité à ~5-10MB selon le navigateur
- Stockage local uniquement (pas de sync entre appareils)
- Effacé si l'utilisateur vide le cache
