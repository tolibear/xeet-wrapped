"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useMobile } from "@/lib/hooks/use-mobile";

const STORAGE_KEY = "xeet-wrapped-desktop-hint-dismissed";

export function DesktopHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(true);
  const { isMobile } = useMobile();

  useEffect(() => {
    // Only show on mobile devices
    if (!isMobile) {
      setIsVisible(false);
      return;
    }

    // Check if already dismissed
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed === "true") {
      setIsDismissed(true);
      setIsVisible(false);
      return;
    }

    // Show after a short delay (after first slide transition)
    const showTimer = setTimeout(() => {
      setIsDismissed(false);
      setIsVisible(true);
    }, 2000);

    // Auto-dismiss after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isMobile]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-4 left-4 right-4 z-50 pointer-events-auto"
        >
          <div className="mx-auto max-w-md">
            <div 
              className={cn(
                "relative rounded-2xl p-4",
                "bg-black/80 backdrop-blur-xl",
                "border border-white/10",
                "shadow-2xl"
              )}
              style={{
                boxShadow: "0 0 30px rgba(255, 0, 51, 0.2), 0 10px 40px rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 text-2xl">💻</div>
                <div className="flex-1">
                  <p className="text-white text-sm font-medium mb-0.5">
                    Enhanced on Desktop
                  </p>
                  <p className="text-white/60 text-xs">
                    View the full WebGL experience on a larger screen
                  </p>
                </div>
                <button
                  onClick={handleDismiss}
                  className={cn(
                    "flex-shrink-0 p-2 rounded-lg",
                    "text-white/60 hover:text-white",
                    "hover:bg-white/5",
                    "transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-red-primary/50"
                  )}
                  aria-label="Dismiss hint"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
