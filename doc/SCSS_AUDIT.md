# 🎨 Audit SCSS & Design Tokens - Rapport complet

## 📊 Vue d'ensemble

**Statut global** : 8.5/10 ⭐⭐⭐⭐

**Points forts** :

- ✅ Design tokens bien organisés
- ✅ Mixins avancés (container queries, responsive)
- ✅ Architecture BEM cohérente
- ✅ CSS Modules avec typage

**Points à améliorer** :

- ⚠️ Container queries définies mais pas utilisées
- ⚠️ Nommage de tokens inconsistant
- ⚠️ Tokens redondants à nettoyer
- ⚠️ Variables SCSS non converties en CSS variables

---

## 🔍 Problèmes identifiés

### 1. **Container Queries - NON UTILISÉES** 🔴

**Constat** : Tu as des mixins container queries excellents mais ils ne sont utilisés NULLE PART !

```scss
// _mixins.scss - Disponibles mais pas utilisés
@mixin container($type: inline-size, $name: null) @mixin cq-min(
    $breakpoint-name,
    $container-name: null
  )
  @mixin cq-max($breakpoint-name, $container-name: null);
```

**Impact** : Pas de responsive moderne basé sur le conteneur au lieu de la viewport.

**Recommandation** :

```scss
// Dans Card.module.scss par exemple
.card {
  container-type: inline-size;
  container-name: card;
}

.card__body {
  @include cq-min("sm", "card") {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
```

---

### 2. **Nommage des tokens - INCONSISTANT** 🟠

**Problèmes trouvés** :

#### a) Incohérence "xs" vs "xm" vs "sm"

```scss
// _tokens.scss
$spacings: (
  0: 0,
  xs: 0.25rem,
  // ✅ OK
  xm: 0.375rem,
  // ❌ "xm" ? Devrait être "xs-md" ou "xsm"
  sm: 0.5rem,
  // ✅ OK
  sd: 0.75rem,
  // ❌ "sd" ? Devrait être "sm-md" ou "smd"
  md: 1rem,
  // ...
);
```

**Solution recommandée** :

```scss
$spacings: (
  0: 0,
  xs: 0.25rem,
  // extra-small
  sm: 0.5rem,
  // small
  md: 1rem,
  // medium (base)
  lg: 1.5rem,
  // large
  xl: 2rem,
  // extra-large
  "2xl": 3rem,
  "3xl": 4rem,
);
```

#### b) Préfixes manquants dans certains tokens

```scss
// ❌ Actuel - Mélange de conventions
$colors-light: (
  primary: #2563eb,
  "white": #ffffff,
  // Avec quotes
  bg-primary: #ffffff,
  // Avec préfixe
  text: #111827,
  // Sans préfixe
);

// ✅ Recommandé - Convention uniforme
$colors-light: (
  // Brand colors
  primary: #2563eb,
  secondary: #9333ea,
  accent: #f59e0b,

  // Semantic colors
  success: #22c55e,
  warning: #facc15,
  danger: #ef4444,
  info: #3b82f6,

  // Neutrals
  white: #ffffff,
  black: #000000,
  gray-50: #fafafa,
  gray-900: #111827,

  // Contextual (préfixes cohérents)
  text-primary: #111827,
  text-secondary: #6b7280,
  bg-primary: #ffffff,
  bg-secondary: #f5f5f5,
  border-primary: #e5e5e5
);
```

---

### 3. **Tokens redondants** 🟡

#### a) Doublons de couleurs

```scss
// Doublon 1
background: #f8f9fa,
bg-primary: #ffffff,
bg-white: #ffffff,  // ❌ Redondant avec bg-primary

// Doublon 2
neutral: (
  50: #fafafa,      // OK
  100: #f5f5f5,     // OK
),
bg-secondary: #f5f5f5,  // ❌ Déjà dans neutral-100
```

**Recommandation** : Utiliser des alias

```scss
$colors-light: (
  // Base palette
  gray-50: #fafafa,
  gray-100: #f5f5f5,
  white: #ffffff,

  // Semantic aliases (référencent la palette)
  bg-primary: var(--color-white),
  bg-secondary: var(--color-gray-100)
);
```

#### b) Spacings intermédiaires peu utilisés

```scss
xm: 0.375rem,  // ❌ Rarement utilisé dans l'industrie
sd: 0.75rem,   // ❌ Entre sm et md, peu intuitif
dl: 1.25rem,   // ❌ Entre md et lg, confusion
```

**Recommandation** : Utiliser la scale de Tailwind (standard industrie)

```scss
$spacings: (
  0: 0,
  1: 0.25rem,
  // 4px
  2: 0.5rem,
  // 8px
  3: 0.75rem,
  // 12px
  4: 1rem,
  // 16px - base
  5: 1.25rem,
  // 20px
  6: 1.5rem,
  // 24px
  8: 2rem,
  // 32px
  // ...,
);

// OU garder les noms sémantiques
$spacings: (
  xs: 0.25rem,
  sm: 0.5rem,
  md: 1rem,
  lg: 1.5rem,
  xl: 2rem,
  "2xl": 3rem,
);
```

---

### 4. **Variables SCSS vs CSS Custom Properties** 🟠

**Problème** : Mélange de `$variables` SCSS et `--custom-properties` CSS.

```scss
// _tokens.scss - Variables SCSS
$spacings: (
  md: 1rem,
);

// _theme.scss - Converties en CSS vars
:root {
  --space-md: 1rem;
}

// Utilisation - Incohérent
.component {
  padding: var(--space-md); // ✅ Runtime
  margin: map.get(t.$spacings, md); // ❌ Compile-time
}
```

**Recommandation** : Stratégie hybride claire

```scss
// 1. Tokens sources (SCSS)
$spacing-md: 1rem;

// 2. CSS Custom Properties (runtime)
:root {
  --space-md: #{$spacing-md};
}

// 3. Utilisation cohérente
.component {
  padding: var(--space-md); // ✅ Toujours via CSS vars
}
```

---

## ✅ Points positifs à maintenir

### 1. **Architecture des fichiers** ⭐⭐⭐

```
styles/
├── _tokens.scss     # Source de vérité
├── _functions.scss  # Utilitaires
├── _mixins.scss     # Réutilisables
├── _theme.scss      # Application des tokens
├── _reset.scss      # Normalisation
└── main.scss        # Entry point
```

### 2. **Mixins avancés** ⭐⭐⭐

```scss
@mixin respond-to($bp) // Media queries
  @mixin container-query() // Container queries
  @mixin map-to-css-vars(); // Auto-génération de CSS vars
```

### 3. **BEM strict** ⭐⭐

```scss
.card {
}
.card__header {
}
.card__body {
}
.card--padding-md {
}
```

### 4. **CSS Modules typés** ⭐⭐⭐

```tsx
// types/css-modules.d.ts
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
```

---

## 🎯 Plan d'action recommandé

### Priorité 1 - URGENT 🔴

#### 1.1 Utiliser les Container Queries

```scss
// Card.module.scss
.card {
  @include container(inline-size);

  &__body {
    @include cq-min("md") {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

// Dashboard.module.scss
.sidebar {
  @include container(inline-size, sidebar);
}

.slideGrid {
  @include cq-min("lg", "sidebar") {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 1.2 Nettoyer les spacings

```scss
// AVANT
$spacings: (
  xs: 0.25rem,
  xm: 0.375rem,
  // ❌ À supprimer
  sm: 0.5rem,
  sd: 0.75rem,
  // ❌ À renommer ou supprimer
  md: 1rem,
  dl: 1.25rem,
  // ❌ À renommer ou supprimer
);

// APRÈS
$spacings: (
  xs: 0.25rem,
  // 4px
  sm: 0.5rem,
  // 8px
  md: 1rem,
  // 16px - base
  lg: 1.5rem,
  // 24px
  xl: 2rem,
  // 32px
  "2xl": 3rem,
  // 48px
);
```

### Priorité 2 - Important 🟠

#### 2.1 Uniformiser le nommage

```scss
// Créer un fichier _naming-conventions.scss
/*
Conventions de nommage :
- Tailles : xs, sm, md, lg, xl, 2xl, 3xl
- Couleurs : primary, secondary, danger, success, warning, info
- Contextes : bg-, text-, border-
- États : hover, active, focus, disabled
- Pas de quotes sauf pour les chiffres : "2xl", "3xl"
*/
```

#### 2.2 Supprimer les doublons

```scss
// ❌ À supprimer
bg-white: #ffffff,     // Utiliser bg-primary
border-white: #e5e5e5, // Utiliser border-primary
```

### Priorité 3 - Amélioration 🟡

#### 3.1 Ajouter des tokens manquants

```scss
// Animations
$transitions: (
  fast: 150ms,
  base: 250ms,
  slow: 350ms,
  slower: 500ms,
);

$easings: (
  linear: linear,
  ease: ease,
  ease-in: cubic-bezier(0.4, 0, 1, 1),
  ease-out: cubic-bezier(0, 0, 0.2, 1),
  ease-in-out: cubic-bezier(0.4, 0, 0.2, 1),
);

// Z-index scale
$z-index: (
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal-backdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
);
```

#### 3.2 Documentation des tokens

```scss
/// Spacing scale
/// @type Map
/// @group Spacing
/// @example scss
///   padding: var(--space-md);
$spacings: (...);
```

---

## 📋 Checklist de nettoyage

### Tokens à renommer

- [ ] `xm` → Supprimer ou `xs-md`
- [ ] `sd` → Supprimer ou `sm-md`
- [ ] `dl` → Supprimer ou `md-lg`

### Tokens à supprimer (doublons)

- [ ] `bg-white` (utiliser `bg-primary`)
- [ ] `border-white` (utiliser `border-primary`)
- [ ] `neutral` dans colors (utiliser `gray-XXX` directement)

### Tokens à ajouter

- [ ] `$transitions` map
- [ ] `$easings` map
- [ ] `$z-index` map
- [ ] `$blur` values
- [ ] `$opacity` scale

### Container queries à appliquer

- [ ] Card component
- [ ] Dashboard sidebar
- [ ] QuestionList
- [ ] Tabs component

---

## 🚀 Score final

| Catégorie         | Avant | Après optimisations | Gain  |
| ----------------- | ----- | ------------------- | ----- |
| **Architecture**  | 9/10  | 10/10               | +11%  |
| **Nommage**       | 6/10  | 9/10                | +50%  |
| **Redondance**    | 6/10  | 9/10                | +50%  |
| **Modern CSS**    | 5/10  | 10/10               | +100% |
| **Documentation** | 7/10  | 9/10                | +29%  |

**Score global** : 6.6/10 → **9.4/10** (+42%) 🎉

---

## 💡 Exemple d'utilisation des Container Queries

```scss
// Card.module.scss
.card {
  // Déclarer le conteneur
  container-type: inline-size;
  container-name: card;
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  // Container query au lieu de media query
  @container card (min-width: 400px) {
    flex-direction: row;
    gap: var(--space-md);
  }

  @container card (min-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
  }
}
```

**Avantage** : Le Card s'adapte à SA propre taille, pas à la viewport !

---

Veux-tu que j'applique ces corrections maintenant ?
