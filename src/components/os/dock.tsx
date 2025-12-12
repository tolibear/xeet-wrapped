"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useMobile } from "@/lib/hooks/use-mobile";
import { DockIcon } from "./dock-icon";
import {
  Power,
  BadgeCheck,
  Fingerprint,
  Activity,
  Image,
  Users,
  Trophy,
  Printer,
} from "lucide-react";

export interface DockProps {
  currentChapter: number;
  totalChapters: number;
  onChapterChange: (index: number) => void;
}

// Chapter metadata
const CHAPTERS = [
  { id: 0, label: "Boot OS", icon: Power },
  { id: 1, label: "ID Passport", icon: BadgeCheck },
  { id: 2, label: "Fingerprint", icon: Fingerprint },
  { id: 3, label: "Pulse", icon: Activity },
  { id: 4, label: "Gallery", icon: Image },
  { id: 5, label: "Orbit", icon: Users },
  { id: 6, label: "Trophy Room", icon: Trophy },
  { id: 7, label: "Poster Studio", icon: Printer },
];

/**
 * Dock - Navigation dock for chapter jumping
 * Hidden by default, appears on hover (left edge on desktop, always visible on mobile)
 */
export function Dock({ currentChapter, totalChapters, onChapterChange }: DockProps) {
  const { isMobile } = useMobile();
  const [isVisible, setIsVisible] = useState(false);

  // Only show chapters that exist
  const visibleChapters = CHAPTERS.slice(0, totalChapters);

  return (
    <>
      {/* Hover trigger zone - desktop only */}
      {!isMobile && (
        <div
          className="fixed left-0 top-0 bottom-0 w-20 z-30"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          aria-hidden="true"
        />
      )}

      {/* Dock - always visible on mobile, hover-triggered on desktop */}
      <AnimatePresence>
        {(isMobile || isVisible) && (
          <motion.nav
            initial={{ opacity: 0, x: isMobile ? 0 : -100, y: isMobile ? 20 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : -100, y: isMobile ? 20 : 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "fixed z-40",
              // Desktop: left vertical dock
              !isMobile && "left-6 top-1/2 -translate-y-1/2",
              // Mobile: bottom horizontal dock
              isMobile && "bottom-6 left-1/2 -translate-x-1/2",
              // Glass container
              "backdrop-blur-lg bg-black/30 border border-white/10",
              "rounded-full",
              // Padding
              isMobile ? "px-4 py-3" : "px-3 py-4"
            )}
            onMouseEnter={() => !isMobile && setIsVisible(true)}
            onMouseLeave={() => !isMobile && setIsVisible(false)}
            aria-label="Chapter navigation"
          >
            <div
              className={cn(
                "flex",
                isMobile ? "flex-row gap-3" : "flex-col gap-3"
              )}
            >
              {visibleChapters.map((chapter, index) => (
                <div key={chapter.id} className="group relative">
                  <DockIcon
                    icon={chapter.icon}
                    label={chapter.label}
                    isActive={currentChapter === chapter.id}
                    onClick={() => onChapterChange(chapter.id)}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

