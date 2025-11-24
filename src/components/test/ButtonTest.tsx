import React from "react";
import { Button } from "@/components";

/**
 * Page de test pour vérifier les styles de boutons
 */
export const ButtonTest: React.FC = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <h1>Button Variants Test</h1>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <h2 style={{ width: "100%" }}>Primary Buttons</h2>
        <Button variant="primary" size="sm">
          Small Primary
        </Button>
        <Button variant="primary" size="md">
          Medium Primary
        </Button>
        <Button variant="primary" size="lg">
          Large Primary
        </Button>
        <Button variant="primary" disabled>
          Disabled Primary
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <h2 style={{ width: "100%" }}>Secondary Buttons</h2>
        <Button variant="secondary" size="sm">
          Small Secondary
        </Button>
        <Button variant="secondary" size="md">
          Medium Secondary
        </Button>
        <Button variant="secondary" size="lg">
          Large Secondary
        </Button>
        <Button variant="secondary" disabled>
          Disabled Secondary
        </Button>
      </div>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <h2 style={{ width: "100%" }}>Tertiary Buttons</h2>
        <Button variant="tertiary" size="sm">
          Small Tertiary
        </Button>
        <Button variant="tertiary" size="md">
          Medium Tertiary
        </Button>
        <Button variant="tertiary" size="lg">
          Large Tertiary
        </Button>
        <Button variant="tertiary" disabled>
          Disabled Tertiary
        </Button>
      </div>

      <div style={{ background: "#f0f0f0", padding: "1rem" }}>
        <h2>Full Width Button</h2>
        <Button variant="primary" fullWidth>
          Full Width Primary
        </Button>
      </div>

      <div>
        <h2>ActionBar Simulation</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            border: "1px solid #ddd",
          }}
        >
          <Button variant="secondary">Discard</Button>
          <Button variant="primary">Save</Button>
        </div>
      </div>
    </div>
  );
};
