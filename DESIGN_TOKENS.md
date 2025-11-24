# 🎨 Design Tokens - Documentation complète

Ce fichier documente tous les tokens CSS disponibles dans le système de design.

## 📋 Table des matières

- [Colors](#colors)
- [Typography](#typography)
- [Spacing](#spacing)
- [Borders](#borders)
- [Shadows](#shadows)
- [Z-Index](#z-index)
- [Opacities](#opacities)
- [Transitions](#transitions)
- [Max Widths](#max-widths)

---

## 🎨 Colors

### Couleurs principales

```css
--color-primary
--color-secondary
--color-accent
--color-white
--color-black
```

### Couleurs neutres

```css
--color-neutral-50   /* Le plus clair */
--color-neutral-100
--color-neutral-200
--color-neutral-800
--color-neutral-900  /* Le plus foncé */
```

### Couleurs sémantiques

```css
--color-success
--color-warning
--color-danger
--color-info
--color-active
```

### États

```css
--color-disabled
--color-disabled-bg
--color-focus
--color-focus-ring
--color-overlay
```

### Backgrounds

```css
--color-bg-primary
--color-bg-secondary
--color-bg-tertiary
--color-bg-white
```

### Borders

```css
--color-border-primary
--color-border-secondary
--color-border-white
```

### Text

```css
--color-text-primary
--color-text-secondary
--color-text-tertiary
```

### Interactive

```css
--color-interactive
--color-interactive-hover
--color-interactive-active
```

---

## 📝 Typography

### Font Families

```css
--font-family-base  /* Nunito + fallbacks */
--font-family-mono  /* Fira Code + fallbacks */
```

### Font Sizes

```css
--font-size-xs      /* 0.75rem */
--font-size-sm      /* 0.875rem */
--font-size-base    /* 1rem */
--font-size-md      /* 1.125rem */
--font-size-lg      /* 1.25rem */
--font-size-xl      /* 1.5rem */
--font-size-2xl     /* 2rem */
--font-size-3xl     /* 3rem */
```

### Font Weights

```css
--font-weight-regular   /* 400 */
--font-weight-medium    /* 500 */
--font-weight-semibold  /* 600 */
--font-weight-bold      /* 700 */
```

### Line Heights

```css
--line-height-none      /* 1 */
--line-height-tight     /* 1.25 */
--line-height-snug      /* 1.375 */
--line-height-normal    /* 1.5 */
--line-height-relaxed   /* 1.625 */
--line-height-loose     /* 2 */
```

### Letter Spacing

```css
--letter-spacing-tighter  /* -0.05em */
--letter-spacing-tight    /* -0.025em */
--letter-spacing-normal   /* 0em */
--letter-spacing-wide     /* 0.025em */
--letter-spacing-wider    /* 0.05em */
--letter-spacing-widest   /* 0.1em */
```

---

## 📏 Spacing

```css
--space-0      /* 0 */
--space-xs     /* 0.25rem / 4px */
--space-xm     /* 0.375rem / 6px */
--space-sm     /* 0.5rem / 8px */
--space-sd     /* 0.75rem / 12px */
--space-md     /* 1rem / 16px */
--space-lg     /* 1.5rem / 24px */
--space-xl     /* 2rem / 32px */
--space-2xl    /* 3rem / 48px */
--space-3xl    /* 4rem / 64px */
--space-4xl    /* 6rem / 96px */
--space-5xl    /* 8rem / 128px */
--space-6xl    /* 10rem / 160px */
--space-7xl    /* 12rem / 192px */
```

---

## 🔲 Borders

### Border Widths

```css
--border-width-0   /* 0 */
--border-width-1   /* 1px */
--border-width-2   /* 2px */
--border-width-4   /* 4px */
--border-width-8   /* 8px */
```

### Border Styles

```css
--border-default   /* 1px solid #d6d6d6 */
--border-thin      /* 1px solid #e5e5e5 */
--border-medium    /* 2px solid #d6d6d6 */
--border-thick     /* 3px solid #d6d6d6 */
--border-none      /* none */
```

### Border Radius

```css
--radius-none   /* 0 */
--radius-sm     /* 0.25rem */
--radius-md     /* 0.5rem */
--radius-lg     /* 1rem */
--radius-full   /* 9999px */
```

---

## 🌑 Shadows

```css
--shadow-none    /* none */
--shadow-sm      /* Petite ombre */
--shadow-md      /* Ombre moyenne */
--shadow-lg      /* Grande ombre */
--shadow-xl      /* Très grande ombre */
--shadow-inner   /* Ombre intérieure */
```

---

## 📚 Z-Index (Layering)

```css
--z-base              /* 0 */
--z-dropdown          /* 1000 */
--z-sticky            /* 1020 */
--z-fixed             /* 1030 */
--z-modal-backdrop    /* 1040 */
--z-modal             /* 1050 */
--z-popover           /* 1060 */
--z-tooltip           /* 1070 */
--z-notification      /* 1080 */
```

---

## 👻 Opacities

```css
--opacity-0     /* 0 */
--opacity-10    /* 0.1 */
--opacity-20    /* 0.2 */
--opacity-30    /* 0.3 */
--opacity-40    /* 0.4 */
--opacity-50    /* 0.5 */
--opacity-60    /* 0.6 */
--opacity-70    /* 0.7 */
--opacity-80    /* 0.8 */
--opacity-90    /* 0.9 */
--opacity-100   /* 1 */
```

---

## ⚡ Transitions

### Durations

```css
--duration-instant   /* 0ms */
--duration-fast      /* 150ms */
--duration-base      /* 200ms */
--duration-slow      /* 300ms */
--duration-slower    /* 500ms */
```

### Easings

```css
--easing-linear       /* linear */
--easing-ease         /* ease */
--easing-ease-in      /* ease-in */
--easing-ease-out     /* ease-out */
--easing-ease-in-out  /* ease-in-out */
--easing-bounce       /* cubic-bezier bounce */
--easing-smooth       /* cubic-bezier smooth */
```

### Transitions complètes

```css
--transition-fast   /* 150ms ease-in-out */
--transition-base   /* 200ms ease-in-out */
--transition-slow   /* 300ms ease-in-out */
```

---

## 📐 Max Widths (Containers)

```css
--max-width-xs      /* 20rem */
--max-width-sm      /* 24rem */
--max-width-md      /* 28rem */
--max-width-lg      /* 32rem */
--max-width-xl      /* 36rem */
--max-width-2xl     /* 42rem */
--max-width-3xl     /* 48rem */
--max-width-4xl     /* 56rem */
--max-width-5xl     /* 64rem */
--max-width-6xl     /* 72rem */
--max-width-7xl     /* 80rem */
--max-width-full    /* 100% */
--max-width-prose   /* 65ch (pour le texte) */
```

---

## 💡 Exemples d'utilisation

### Bouton avec tous les tokens

```scss
.button {
  /* Colors */
  background-color: var(--color-interactive);
  color: var(--color-white);

  /* Typography */
  font-family: var(--font-family-base);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);

  /* Spacing */
  padding: var(--space-sm) var(--space-md);

  /* Borders */
  border: var(--border-default);
  border-radius: var(--radius-md);

  /* Shadows */
  box-shadow: var(--shadow-sm);

  /* Transitions */
  transition: background-color var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    background-color: var(--color-interactive-hover);
    box-shadow: var(--shadow-md);
  }

  &:focus {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--color-disabled-bg);
    color: var(--color-disabled);
    opacity: var(--opacity-60);
    cursor: not-allowed;
  }
}
```

### Modal avec z-index

```scss
.modal {
  &Backdrop {
    position: fixed;
    inset: 0;
    background-color: var(--color-overlay);
    z-index: var(--z-modal-backdrop);
  }

  &Content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: var(--z-modal);
    max-width: var(--max-width-lg);
    background-color: var(--color-bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
  }
}
```

---

## 🌗 Thème sombre

Toutes ces variables sont automatiquement adaptées au thème sombre via `[data-theme="dark"]`.

Pour activer le thème sombre :

```html
<html data-theme="dark"></html>
```

Ou en JavaScript :

```javascript
document.documentElement.dataset.theme = "dark";
```

---

## ✅ Checklist des bonnes pratiques

- ✅ **Toujours utiliser les tokens** plutôt que des valeurs en dur
- ✅ **Préférer les variables sémantiques** (`--color-text-primary` plutôt que `--color-neutral-900`)
- ✅ **Utiliser les transitions** pour les animations fluides
- ✅ **Respecter le z-index** pour éviter les conflits de couches
- ✅ **Tester en mode sombre** pour garantir le contraste
- ✅ **Utiliser les line-heights** pour améliorer la lisibilité
- ✅ **Appliquer les opacités** plutôt que de créer de nouvelles couleurs

---

Generated by the Design System - Wooclap
