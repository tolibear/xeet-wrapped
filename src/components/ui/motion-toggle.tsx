"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const STORAGE_KEY = "xeet-wrapped-reduced-motion";

interface MotionToggleProps {
  onToggle?: (enabled: boolean) => void;
  className?: string;
}

export function MotionToggle({ onToggle, className }: MotionToggleProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load preference on mount
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      const enabled = stored === "true";
      setIsReducedMotion(enabled);
    }
  }, []);

  const handleToggle = () => {
    const newValue = !isReducedMotion;
    setIsReducedMotion(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));
    onToggle?.(newValue);
  };

  // Don't render on server
  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("fixed bottom-4 left-4 z-40", className)}>
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Main button */}
        <button
          onClick={handleToggle}
          className={cn(
            "group flex items-center gap-2 px-3 py-2 rounded-full",
            "bg-black/60 backdrop-blur-md border border-white/10",
            "hover:bg-black/80 hover:border-white/20",
            "transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary/50"
          )}
          aria-label={`${isReducedMotion ? "Enable" : "Disable"} animations`}
          aria-pressed={isReducedMotion}
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: isReducedMotion ? 0 : 360 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            {isReducedMotion ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/60"
              >
                <path
                  d="M8 2V8M8 8L12 12M8 8L4 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="2"
                  y1="14"
                  x2="14"
                  y2="2"
                  stroke="#FF0033"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[var(--red-primary)]"
              >
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M8 5V8L10.5 10.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </motion.div>

          {/* Label (visible on hover/expanded) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap text-xs mono-caption text-white/80"
              >
                {isReducedMotion ? "Motion Off" : "Motion On"}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Tooltip on hover */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 pointer-events-none"
            >
              <div className="px-3 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-white/20 whitespace-nowrap">
                <p className="text-xs text-white">
                  {isReducedMotion
                    ? "Click to enable animations"
                    : "Click to reduce animations"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}



