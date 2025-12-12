"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
  className?: string;
}

export function MuteButton({ isMuted, onToggle, className }: MuteButtonProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server
  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-40", className)}>
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Main button */}
        <button
          onClick={onToggle}
          className={cn(
            "group flex items-center gap-2 px-3 py-2 rounded-full",
            "bg-black/60 backdrop-blur-md border border-white/10",
            "hover:bg-black/80 hover:border-white/20",
            "transition-all duration-300",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary/50"
          )}
          aria-label={isMuted ? "Unmute music" : "Mute music"}
          aria-pressed={isMuted}
        >
          {/* Icon */}
          <motion.div
            animate={{ scale: isMuted ? [1, 0.8, 1] : 1 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            {isMuted ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white/60"
              >
                {/* Muted icon - speaker with slash */}
                <path
                  d="M6 4L3 7H1V9H3L6 12V4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 6L12 8L10 10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <line
                  x1="2"
                  y1="2"
                  x2="14"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
                {/* Unmuted icon - speaker */}
                <path
                  d="M6 4L3 7H1V9H3L6 12V4Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 5C10.5 5.5 11 6.5 11 8C11 9.5 10.5 10.5 10 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3C13 4 13.5 5.5 13.5 8C13.5 10.5 13 12 12 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
                {isMuted ? "Music Off" : "Music On"}
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
              className="absolute bottom-full right-0 mb-2 pointer-events-none"
            >
              <div className="px-3 py-2 rounded-lg bg-black/90 backdrop-blur-md border border-white/20 whitespace-nowrap">
                <p className="text-xs text-white">
                  {isMuted ? "Click to unmute music" : "Click to mute music"}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


