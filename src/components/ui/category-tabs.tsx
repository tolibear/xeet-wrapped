"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export type Tab = {
  id: string;
  label: string;
};

export type CategoryTabsProps = {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
};

export function CategoryTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
}: CategoryTabsProps) {
  return (
    <div 
      className={cn(
        "flex gap-2 p-1 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10",
        "overflow-x-auto scrollbar-hide",
        className
      )}
      role="tablist"
      aria-label="Content categories"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            className={cn(
              "relative px-4 md:px-6 py-3 md:py-2.5 rounded-md text-sm font-medium transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary/50",
              "whitespace-nowrap min-h-[44px] flex items-center",
              isActive
                ? "text-white"
                : "text-white/60 hover:text-white/80"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[var(--red-primary)]/20 border border-[var(--red-primary)]/50 rounded-md"
                style={{
                  boxShadow: "0 0 15px rgba(255, 0, 51, 0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10 mono-caption text-xs">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
