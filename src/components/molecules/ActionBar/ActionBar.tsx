/**
 * ActionBar Component (Molecule)
 */

import React from "react";
import { Button } from "@/components";
import styles from "./ActionBar.module.scss";

export interface ActionBarProps {
  onDiscard?: () => void;
  onSave?: () => void;
  discardLabel?: string;
  saveLabel?: string;
  discardDisabled?: boolean;
  saveDisabled?: boolean;
  className?: string;
}

/**
 * Barre d'actions avec boutons Discard/Save
 */
export const ActionBar: React.FC<ActionBarProps> = ({
  onDiscard,
  onSave,
  discardLabel = "Discard",
  saveLabel = "Save",
  discardDisabled = false,
  saveDisabled = false,
  className = "",
}) => {
  return (
    <div className={`${styles.actionBar} ${className}`}>
      <div className={styles.actionBarLeft}>
        <Button
          variant="secondary"
          onClick={onDiscard}
          disabled={discardDisabled}
          aria-label={discardLabel}
        >
          {discardLabel}
        </Button>
      </div>

      <div className={styles.actionBarRight}>
        <Button
          variant="primary"
          onClick={onSave}
          disabled={saveDisabled}
          aria-label={saveLabel}
        >
          {saveLabel}
        </Button>
      </div>
    </div>
  );
};
