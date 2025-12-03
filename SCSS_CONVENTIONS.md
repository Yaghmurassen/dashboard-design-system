# 📐 Conventions de Nommage SCSS - Guide de Style

## 🎯 Philosophie

**Cohérence > Flexibilité**  
Une convention stricte permet à toute l'équipe de collaborer sans friction.

---

## 🎨 Design Tokens

### 1. **Spacing - Échelle standardisée**

✅ **Convention adoptée** : Basée sur Tailwind CSS (industrie standard)

```scss
$spacings: (
  0: 0,
  xs: 0.25rem,
  // 4px
  sm: 0.5rem,
  // 8px
  md: 1rem,
  // 16px - BASE
  lg: 1.5rem,
  // 24px
  xl: 2rem,
  // 32px
  "2xl": 3rem,
  // 48px
  "3xl": 4rem,
  // 64px
  "4xl": 6rem,
  // 96px
  "5xl": 8rem,
  // 128px
);
```

**Utilisation** :

```scss
padding: var(--space-md); // ✅
margin: var(--space-lg); // ✅

// ❌ ÉVITER (anciennes valeurs supprimées)
padding: var(--space-xm); // ❌ N'existe plus
margin: var(--space-sd); // ❌ N'existe plus
padding: var(--space-dl); // ❌ N'existe plus
```

**Mnémotechnique** :

- **xs** = extra small
- **sm** = small
- **md** = medium (base = 1rem = 16px)
- **lg** = large
- **xl** = extra large
- **2xl, 3xl...** = multiples

---

### 2. **Couleurs - Structure sémantique**

✅ **Convention** : Préfixes clairs + contexte

```scss
$colors-light: (
  // === BRAND COLORS (sans préfixe) ===
  primary: #2563eb,
  secondary: #9333ea,
  accent: #f59e0b,

  // === SEMANTIC COLORS (sans préfixe) ===
  success: #22c55e,
  warning: #facc15,
  danger: #ef4444,
  info: #3b82f6,

  // === NEUTRALS (gray-XXX) ===
  white: #ffffff,
  black: #000000,
  gray-50: #fafafa,
  gray-100: #f5f5f5,
  gray-900: #111827,

  // === CONTEXTUAL (préfixe obligatoire) ===
  text-primary: #111827,
  text-secondary: #6b7280,
  text-tertiary: #9ca3af,

  bg-primary: #ffffff,
  bg-secondary: #f8f9fa,

  border-primary: #e5e5e5,
  border-secondary: #d6d6d6
);
```

**Règles** :

1. **Brand colors** = Pas de préfixe (`primary`, `secondary`)
2. **Semantic** = Pas de préfixe (`success`, `danger`)
3. **Neutrals** = `gray-XXX` ou `white/black`
4. **Contextual** = Préfixe obligatoire (`text-`, `bg-`, `border-`)

**Utilisation** :

```scss
color: var(--color-text-primary); // ✅
background: var(--color-bg-secondary); // ✅
border: 1px solid var(--color-border-primary); // ✅

// ❌ ÉVITER
background: var(--color-white); // ❌ Utiliser --color-bg-primary
```

---

### 3. **Typography**

✅ **Convention** : `font-size-XXX`, `font-weight-XXX`

```scss
$font-sizes: (
  xs: 0.75rem,
  // 12px
  sm: 0.875rem,
  // 14px
  base: 1rem,
  // 16px - BASE
  md: 1.125rem,
  // 18px
  lg: 1.25rem,
  // 20px
  xl: 1.5rem,
  // 24px
  "2xl": 2rem,
  // 32px
  "3xl": 3rem,
  // 48px
);

$font-weights: (
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
);
```

**Utilisation** :

```scss
font-size: var(--font-size-md);
font-weight: var(--font-weight-bold);
```

---

### 4. **Breakpoints**

✅ **Convention** : Mobile-first avec noms intuitifs

```scss
$breakpoints: (
  xs: 320px,
  // Phone small
  sm: 480px,
  // Phone
  md: 768px,
  // Tablet
  lg: 1024px,
  // Desktop
  xl: 1280px,
  // Desktop large
  "2xl": 1536px,
  // Desktop XL
);
```

**Utilisation** :

```scss
// Media Query
@include respond-to("md") {
  font-size: var(--font-size-lg);
}

// Container Query
@container card (min-width: 500px) {
  display: grid;
}
```

---

## 🧱 Classes CSS (BEM)

### Convention BEM stricte

```scss
.block {
}
.block__element {
}
.block--modifier {
}
.block__element--modifier {
}
```

**Exemples réels** :

```scss
// ✅ CORRECT
.card {
}
.card__header {
}
.card__body {
}
.card__footer {
}
.card--padding-md {
}
.card--elevation-2 {
}

// ✅ CORRECT - Element + Modifier
.button {
}
.button--primary {
}
.button--secondary {
}
.button--size-lg {
}

// ❌ INCORRECT
.cardHeader {
} // Pas de camelCase
.card-header {
} // Pas assez explicite (- ou __ ?)
.card__header__title {
} // Max 2 niveaux
.card-padding-md {
} // Manque --
```

---

## 📦 Fichiers SCSS

### Structure des dossiers

```
styles/
├── _tokens.scss        # Source de vérité (variables)
├── _functions.scss     # Fonctions utilitaires
├── _mixins.scss        # Mixins réutilisables
├── _theme.scss         # Application des tokens (CSS vars)
├── _reset.scss         # Normalisation
└── main.scss           # Entry point
```

### Ordre des propriétés

```scss
.component {
  /* 1. Positioning */
  position: relative;
  top: 0;
  left: 0;
  z-index: 1;

  /* 2. Box Model */
  display: flex;
  width: 100%;
  padding: var(--space-md);
  margin: 0;
  border: 1px solid var(--color-border-primary);

  /* 3. Typography */
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  color: var(--color-text-primary);

  /* 4. Visual */
  background: var(--color-bg-primary);
  box-shadow: var(--shadow-md);
  border-radius: var(--radius-md);

  /* 5. Animation */
  transition: all var(--transition-base);

  /* 6. Misc */
  cursor: pointer;
  user-select: none;

  /* 7. Container Queries */
  container-type: inline-size;

  /* 8. Nested Elements */
  &__element {
  }

  /* 9. Modifiers */
  &--modifier {
  }

  /* 10. States */
  &:hover {
  }
  &:focus {
  }

  /* 11. Media/Container Queries */
  @container (min-width: 500px) {
  }
  @media (min-width: 768px) {
  }
}
```

---

## 🎯 Exemples concrets

### Card Component

```scss
.card {
  /* Base */
  container-type: inline-size;
  container-name: card;

  background: var(--color-bg-primary);
  border: 1px solid var(--color-border-primary);
  border-radius: var(--radius-md);

  /* Elements */
  &__header {
    padding: var(--space-md);
    border-bottom: 1px solid var(--color-border-primary);

    @container card (max-width: 300px) {
      padding: var(--space-sm);
    }
  }

  &__body {
    padding: var(--space-md);

    @container card (min-width: 500px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-md);
    }
  }

  /* Modifiers */
  &--padding-sm {
    padding: var(--space-sm);
  }

  &--elevation-2 {
    box-shadow: var(--shadow-md);
  }
}
```

### Button Component

```scss
.button {
  /* Base */
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);

  padding: var(--space-sm) var(--space-md);

  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);

  border: none;
  border-radius: var(--radius-md);

  cursor: pointer;
  transition: all var(--transition-fast);

  /* Variants */
  &--primary {
    background: var(--color-primary);
    color: white;

    &:hover {
      background: var(--color-interactive-hover);
    }
  }

  &--secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-primary);
  }

  /* Sizes */
  &--size-sm {
    padding: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-sm);
  }

  &--size-lg {
    padding: var(--space-md) var(--space-lg);
    font-size: var(--font-size-lg);
  }
}
```

---

## 🚫 Anti-patterns à éviter

### 1. **Magic Numbers**

```scss
// ❌ BAD
padding: 13px;
margin: 27px;

// ✅ GOOD
padding: var(--space-md);
margin: var(--space-lg);
```

### 2. **Couleurs en dur**

```scss
// ❌ BAD
color: #111827;
background: #f5f5f5;

// ✅ GOOD
color: var(--color-text-primary);
background: var(--color-bg-secondary);
```

### 3. **Nesting trop profond**

```scss
// ❌ BAD (> 3 niveaux)
.card {
  .header {
    .title {
      .icon {
        color: red;
      }
    }
  }
}

// ✅ GOOD (BEM)
.card {
}
.card__header {
}
.card__title {
}
.card__icon {
  color: var(--color-danger);
}
```

### 4. **Media queries au lieu de Container queries**

```scss
// ⚠️ OK mais moins optimal
@media (min-width: 768px) {
  .card__body {
    display: grid;
  }
}

// ✅ MEILLEUR - S'adapte au conteneur
.card {
  container-type: inline-size;
}

.card__body {
  @container card (min-width: 500px) {
    display: grid;
  }
}
```

---

## ✅ Checklist avant commit

- [ ] Aucune valeur en dur (couleurs, espacements)
- [ ] Utilisation de `var(--xxx)` partout
- [ ] BEM strict (block\_\_element--modifier)
- [ ] Nesting ≤ 3 niveaux
- [ ] Container queries quand approprié
- [ ] Ordre des propriétés respecté
- [ ] Pas de `!important` (sauf exception documentée)
- [ ] Mobile-first (min-width, pas max-width)

---

## 📚 Ressources

- **Tokens** : `src/styles/_tokens.scss`
- **Mixins** : `src/styles/_mixins.scss`
- **BEM** : https://getbem.com/
- **Container Queries** : https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
- **Tailwind Scale** : https://tailwindcss.com/docs/customizing-spacing

---

**Version** : 1.0.0  
**Dernière mise à jour** : 2 décembre 2025
