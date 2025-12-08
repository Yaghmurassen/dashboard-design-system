## 🐛 Corrections des tests

### Problèmes résolus

#### 1. **Icon tests - Role "img" introuvable**

**Problème** : Les SVG inline n'ont pas de role="img" par défaut.
**Solution** : Utiliser `container.querySelector("svg")` au lieu de `getByRole("img")`.

```tsx
// ❌ Avant
const icon = screen.getByRole("img", { hidden: true });

// ✅ Après
const { container } = render(<Icon name="list-view" />);
const svg = container.querySelector("svg");
expect(svg).toBeInTheDocument();
```

#### 2. **Icon test - currentColor inheritance**

**Problème** : Le test vérifie le style computé au lieu de l'attribut SVG.
**Solution** : Vérifier l'attribut `fill="currentColor"` du SVG directement.

```tsx
// ❌ Avant
expect(span).toHaveStyle({ color: "currentColor" });

// ✅ Après
const rect = svg?.querySelector("rect");
expect(rect).toHaveAttribute("fill", "currentColor");
```

#### 3. **Tabs test - Content 2 non trouvé**

**Problème** : L'animation Framer Motion fait que le contenu n'est pas immédiatement visible.
**Solution** : Utiliser `waitFor` pour attendre la fin de l'animation.

```tsx
// ❌ Avant
await user.click(tab2);
expect(screen.getByText("Content 2")).toBeInTheDocument();

// ✅ Après
await user.click(tab2);
await waitFor(() => {
  expect(screen.getByText("Content 2")).toBeInTheDocument();
});
```

#### 4. **Tabs test - AnimatePresence wrapper**

**Problème** : `data-framer-name` est un détail d'implémentation interne de Framer Motion.
**Solution** : Tester le comportement visible (présence du tabpanel).

```tsx
// ❌ Avant
expect(container.querySelector("[data-framer-name]")).toBeTruthy();

// ✅ Après
const tabsPanel = container.querySelector('[role="tabpanel"]');
expect(tabsPanel).toBeInTheDocument();
```

### ✅ Résultat

**Avant** : 5 tests échouaient  
**Après** : Tous les tests passent ! 🎉

### 📝 Leçons apprises

1. **SVG inline** : Ne pas utiliser `getByRole("img")`, préférer le querySelector
2. **Animations** : Toujours utiliser `waitFor` avec les animations
3. **Détails d'implémentation** : Ne jamais tester les internals des librairies (comme Framer Motion)
4. **Attributs vs Styles** : Vérifier les attributs SVG plutôt que les styles computés

### 🚀 Lancer les tests

```bash
npm test                 # Mode watch
npm test -- --run        # Une seule fois
npm run test:coverage    # Avec couverture
```
