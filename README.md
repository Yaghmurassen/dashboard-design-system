# Wooclap Dashboard — Frontend Excellence Showcase

> Un projet React TypeScript démontrant les **meilleures pratiques frontend** : architecture scalable, accessibilité WCAG 2.1 AA, performance, design patterns modernes, et code maintenable.

## 🎯 Objectif du Projet

Ce dashboard est conçu pour mettre en valeur des compétences frontend avancées :

- ✅ **Architecture modulaire** (Atomic Design)
- ✅ **TypeScript strict** avec types exhaustifs
- ✅ **Accessibilité** (WCAG 2.1 AA, ARIA, navigation clavier)
- ✅ **Performance** (lazy loading, code splitting, optimisation images)
- ✅ **Design patterns** (Custom Hooks, Context API, Composition)
- ✅ **CSS moderne** (CSS Modules, Custom Properties, Modern Sass)
- ✅ **Responsive Design** (mobile-first, media queries sémantiques)
- ✅ **Theming** (dark/light mode avec Context)
- ✅ **HTML sémantique** (landmarks, heading hierarchy)
- ✅ **Optimisation images** (srcSet, loading lazy, formats modernes)

---

## 📦 Installation & Lancement

### Prérequis

- **Node.js** ≥ 18.x
- **npm** / **yarn** / **pnpm**

### Installation

```bash
# Cloner et installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le projet sera accessible sur `http://localhost:3000`

### Scripts disponibles

```bash
npm run dev       # Mode développement avec HMR
npm run build     # Build de production
npm run preview   # Preview du build de production
```

---

## 🏗️ Architecture du Projet

### Structure des dossiers

```
src/
├── components/          # Composants organisés selon Atomic Design
│   ├── atoms/          # Composants de base (Button, Card, Image)
│   ├── molecules/      # Compositions simples (Layout, ThemeToggle)
│   ├── organisms/      # Sections complexes (à venir)
│   └── Dashboard/      # Page principale
├── contexts/           # React Context (ThemeContext)
├── hooks/              # Custom hooks réutilisables (useMediaQuery)
├── styles/             # Styles globaux et design tokens
│   ├── main.scss     # Reset CSS et styles de base
│   └── tokens.scss     # Design tokens (couleurs, spacing, typo)
├── types/              # Définitions TypeScript
└── main.tsx            # Point d'entrée de l'application
```

### Design Patterns Implémentés

#### 1. **Atomic Design**

Organisation hiérarchique des composants pour réutilisabilité maximale :

- **Atoms** : boutons, cartes, images
- **Molecules** : layout, theme toggle
- **Organisms** : dashboard sections (à venir)

#### 2. **Composition Pattern**

Composants flexibles via `children` et props :

```tsx
<Card padding="lg" elevation={2}>
  <h3>Titre</h3>
  <p>Contenu</p>
</Card>
```

#### 3. **Custom Hooks**

Logique réutilisable encapsulée :

- `useTheme()` — gestion du thème
- `useMediaQuery()` — responsive queries

#### 4. **Context API**

État global sans prop drilling (ThemeContext)

---

## ♿ Accessibilité (WCAG 2.1 AA)

### Implémentation complète

✅ **Navigation clavier** : tous les interactifs accessibles au Tab  
✅ **Focus visible** : outline 2px sur `:focus-visible`  
✅ **ARIA** : labels, roles, live regions  
✅ **HTML sémantique** : `<header>`, `<nav>`, `<main>`, `<aside>`  
✅ **Contraste** : ratio ≥ 4.5:1 (texte), ≥ 3:1 (UI)  
✅ **Responsive text** : clamp() pour typographie fluide  
✅ **Skip links** : lien "Skip to main content"  
✅ **Reduced motion** : respect de `prefers-reduced-motion`

### Exemples de code

```tsx
// Button avec aria-label
<Button aria-label="Switch to dark mode" onClick={toggleTheme}>
  <MoonIcon />
</Button>

// Navigation avec aria-current
<a href="/dashboard" aria-current="page">Dashboard</a>
```

---

## 🎨 Theming & Design Tokens

### Système de design tokens

Toutes les valeurs de design sont centralisées dans `tokens.scss` :

```scss
:root {
  /* Spacing (8px grid) */
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */

  /* Typography */
  --font-size-base: 1rem;
  --font-weight-semibold: 600;

  /* Colors */
  --color-primary-500: #3b82f6;
  --color-text-primary: var(--color-neutral-900);

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Dark Mode

Bascule automatique via `data-theme="dark"` sur `<html>` :

```scss
[data-theme="dark"] {
  --color-text-primary: var(--color-neutral-50);
  --color-bg-primary: #0a0e1a;
}
```

Le contexte `ThemeContext` gère la persistance (localStorage).

---

## 🖼️ Optimisation des Images

### Composant `<Image />` avec lazy loading

```tsx
<Image
  src="/hero.jpg"
  srcSet="/hero-400.jpg 400w, /hero-800.jpg 800w, /hero-1200.jpg 1200w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Description accessible"
  loading="lazy"
  objectFit="cover"
/>
```

**Features** :

- ✅ `srcSet` pour images responsive
- ✅ `sizes` pour optimisation du chargement
- ✅ `loading="lazy"` natif
- ✅ Placeholder avec shimmer effect
- ✅ Gestion des erreurs de chargement
- ✅ `decoding="async"` pour performance

---

## 📱 Responsive Design

### Approche Mobile-First

Tous les composants sont développés mobile-first :

```scss
.card {
  padding: var(--space-md); /* Mobile par défaut */

  @media (min-width: 768px) {
    padding: var(--space-lg); /* Tablette */
  }

  @media (min-width: 1024px) {
    padding: var(--space-xl); /* Desktop */
  }
}
```

### Breakpoints

```scss
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

---

## 🎯 Performance

### Optimisations implémentées

✅ **Code splitting** : lazy loading des routes (à venir)  
✅ **Tree shaking** : imports nommés  
✅ **CSS Modules** : scoping automatique, pas de CSS inutilisé  
✅ **Modern Sass API** : compilation plus rapide  
✅ **Images optimisées** : srcSet, lazy loading  
✅ **Fonts** : `display=swap` pour éviter le FOIT

### Configuration Vite

```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'], // Séparation vendor bundle
      },
    },
  },
}
```

---

## 🧪 Qualité du Code

### TypeScript Strict

Configuration stricte activée :

```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

### CSS Modules avec Types

Typage automatique des classes CSS :

```tsx
import styles from "./Button.module.scss";
// styles.button est typé !
```

### Conventions de nommage

- **Composants** : PascalCase (`Button.tsx`)
- **Fichiers styles** : kebab-case avec `.module.scss`
- **Classes CSS** : camelCase (via CSS Modules)
- **Hooks** : `use` prefix (`useTheme`)

---

## 🚀 Prochaines Étapes (Roadmap)

- [ ] **Tests** : Jest + React Testing Library
- [ ] **Storybook** : documentation des composants
- [ ] **Routing** : React Router avec code splitting
- [ ] **Forms** : React Hook Form + validation
- [ ] **Data fetching** : TanStack Query
- [ ] **CI/CD** : GitHub Actions
- [ ] **E2E tests** : Playwright

---

## 📚 Ressources & Standards

### Références utilisées

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
- [Modern CSS Solutions](https://moderncss.dev/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Vite Documentation](https://vitejs.dev/)

### Technologies

- **React 18** — UI library
- **TypeScript 5** — type safety
- **Vite 5** — build tool
- **Sass (modern API)** — CSS preprocessor
- **CSS Modules** — scoped styles

---

## 👨‍💻 Auteur

Projet créé pour démontrer l'expertise frontend et les bonnes pratiques de développement web moderne.

**Contact** : [Yaghmurassen Sainson](https://www.linkedin.com/in/yaghmurassen/)

---

## 📝 License

MIT — Usage libre pour évaluation et apprentissage.
