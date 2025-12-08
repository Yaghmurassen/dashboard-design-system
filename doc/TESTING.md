# 🧪 Guide des Tests - Wooclap Design System

## 📚 Table des matières

1. [Stack de tests](#stack)
2. [Commandes](#commandes)
3. [Structure](#structure)
4. [Exemples par type de composant](#exemples)
5. [Bonnes pratiques](#bonnes-pratiques)
6. [Patterns de test](#patterns)

---

## 🎯 Stack de tests {#stack}

### Outils installés

- **Vitest** - Framework de test (10x plus rapide que Jest)
- **React Testing Library** - Tests orientés utilisateur
- **@testing-library/user-event** - Simulations d'interactions
- **@testing-library/jest-dom** - Matchers personnalisés

### Pourquoi Vitest ?

✅ Compatible avec Vite (ton bundler actuel)
✅ 10x plus rapide que Jest
✅ Hot Module Replacement pour les tests
✅ API identique à Jest (migration facile)
✅ Support TypeScript natif

---

## ⚡ Commandes {#commandes}

```bash
# Lancer les tests en mode watch
npm test

# Lancer les tests avec interface UI
npm run test:ui

# Générer le rapport de couverture
npm run test:coverage

# Lancer un fichier de test spécifique
npm test Button.test.tsx

# Lancer tous les tests d'un dossier
npm test atoms/
```

---

## 📁 Structure des tests {#structure}

```
src/
├── tests/
│   ├── setup.ts              # Configuration globale
│   ├── utils/
│   │   └── test-utils.tsx    # Utilitaires réutilisables
│   └── vitest.d.ts           # Types TypeScript
│
├── components/
│   ├── atoms/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.test.tsx    ← Test à côté du composant
│   │   └── Icon/
│   │       ├── Icon.tsx
│   │       └── Icon.test.tsx
│   └── molecules/
│       └── Tabs/
│           ├── Tabs.tsx
│           └── Tabs.test.tsx
└── hooks/
    ├── useLocalStorage.ts
    └── useLocalStorage.test.ts
```

---

## 📝 Exemples par type {#exemples}

### 1. **Atom Component** (Button)

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/tests/utils/test-utils";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("should call onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn(); // Mock function

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### 2. **Molecule Component** (Tabs)

```tsx
describe("Tabs", () => {
  it("should switch content when clicking tabs", async () => {
    const user = userEvent.setup();

    render(
      <Tabs
        tabs={[
          { id: "1", label: "Tab 1", content: <div>Content 1</div> },
          { id: "2", label: "Tab 2", content: <div>Content 2</div> },
        ]}
      />
    );

    // Vérifie le contenu initial
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    // Clique sur le 2e onglet
    await user.click(screen.getByRole("tab", { name: /tab 2/i }));

    // Vérifie le changement
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });
});
```

### 3. **Custom Hook** (useLocalStorage)

```tsx
import { renderHook, act } from "@testing-library/react";

describe("useLocalStorage", () => {
  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(localStorage.getItem("key")).toBe('"updated"');
  });
});
```

---

## ✅ Bonnes pratiques {#bonnes-pratiques}

### 1. **Tester le comportement, pas l'implémentation**

❌ **Mauvais** :

```tsx
expect(button.className).toBe("button button--primary");
```

✅ **Bon** :

```tsx
expect(button).toHaveClass("button--primary");
```

### 2. **Utiliser les sélecteurs accessibles**

Ordre de priorité :

1. `getByRole()` - **MEILLEUR** (simule screen reader)
2. `getByLabelText()` - Pour les formulaires
3. `getByPlaceholderText()` - Placeholder
4. `getByText()` - Contenu visible
5. `getByTestId()` - En dernier recours

❌ **Éviter** :

```tsx
const button = container.querySelector(".button");
```

✅ **Préférer** :

```tsx
const button = screen.getByRole("button", { name: /submit/i });
```

### 3. **Utiliser userEvent au lieu de fireEvent**

❌ **fireEvent** (bas niveau) :

```tsx
fireEvent.click(button);
```

✅ **userEvent** (simule vraiment l'utilisateur) :

```tsx
const user = userEvent.setup();
await user.click(button);
```

### 4. **Tester l'accessibilité**

```tsx
it("should be keyboard accessible", async () => {
  const user = userEvent.setup();
  render(<Button onClick={handleClick}>Press me</Button>);

  await user.tab(); // Tab pour focus
  await user.keyboard("{Enter}"); // Appui Enter

  expect(handleClick).toHaveBeenCalled();
});
```

---

## 🎨 Patterns de test {#patterns}

### Pattern 1 : AAA (Arrange, Act, Assert)

```tsx
it("should toggle theme", async () => {
  // Arrange - Préparation
  const user = userEvent.setup();
  render(<ThemeToggle />);

  // Act - Action
  const button = screen.getByRole("button");
  await user.click(button);

  // Assert - Vérification
  expect(button).toHaveAttribute("aria-pressed", "true");
});
```

### Pattern 2 : Test de snapshot (pour les composants UI)

```tsx
it("should match snapshot", () => {
  const { container } = render(<Icon name="list-view" />);
  expect(container.firstChild).toMatchSnapshot();
});
```

### Pattern 3 : Test paramétré (it.each)

```tsx
it.each([
  ["primary", "var(--color-primary)"],
  ["secondary", "var(--color-secondary)"],
  ["tertiary", "var(--color-tertiary)"],
])("should render %s variant with correct color", (variant, color) => {
  render(<Button variant={variant}>{variant}</Button>);
  // assertions...
});
```

### Pattern 4 : Mock de modules

```tsx
vi.mock("framer-motion", () => ({
  motion: {
    div: "div",
    button: "button",
  },
  AnimatePresence: ({ children }) => children,
}));
```

---

## 🎯 Couverture de code

Objectifs recommandés :

- **Statements** : 80%+
- **Branches** : 75%+
- **Functions** : 80%+
- **Lines** : 80%+

Vérifier avec :

```bash
npm run test:coverage
```

Rapport généré dans `coverage/index.html`

---

## 📖 Matchers disponibles

### Jest-DOM matchers

```tsx
expect(element).toBeInTheDocument();
expect(element).toBeVisible();
expect(element).toBeDisabled();
expect(element).toHaveFocus();
expect(element).toHaveClass("className");
expect(element).toHaveAttribute("attr", "value");
expect(element).toHaveStyle({ color: "red" });
expect(element).toHaveTextContent("text");
```

### Vitest matchers

```tsx
expect(value).toBe(expected);
expect(value).toEqual(expected);
expect(fn).toHaveBeenCalled();
expect(fn).toHaveBeenCalledTimes(3);
expect(fn).toHaveBeenCalledWith(arg1, arg2);
expect(array).toContain(item);
expect(array).toHaveLength(3);
```

---

## 🚀 Prochaines étapes

1. Lance les tests : `npm test`
2. Ouvre l'UI : `npm run test:ui`
3. Ajoute des tests pour tes composants
4. Vise 80%+ de couverture
5. Intègre dans ta CI/CD

**Bon courage ! 🎉**
