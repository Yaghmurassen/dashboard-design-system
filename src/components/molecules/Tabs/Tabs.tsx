/**
 * Tabs Component (Molecule)
 * Système d'onglets accessible
 */

import React, { useState } from "react";
import clsx from "clsx";
import styles from "./Tabs.module.scss";

export interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={clsx(styles.tabs, className)}>
      {/* Tab Headers */}
      <div className={styles.tabsHeader} role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            className={clsx(styles.tabsTab, {
              [styles["tabsTab--active"]]: activeTab === tab.id,
            })}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
        className={styles.tabsPanel}
      >
        {activeTabContent}
      </div>
    </div>
  );
};
